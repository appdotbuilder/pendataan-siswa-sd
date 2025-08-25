<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTeacherRequest;
use App\Http\Requests\UpdateTeacherRequest;
use App\Models\SchoolClass;
use App\Models\Teacher;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class TeacherController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $this->authorize('admin');
        
        $teachers = Teacher::with(['user', 'homeroomClass'])
            ->orderBy('name')
            ->paginate(15);

        return Inertia::render('teachers/index', [
            'teachers' => $teachers,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $this->authorize('admin');
        
        $classes = SchoolClass::whereDoesntHave('homeroomTeacher')
            ->orderBy('grade_level')
            ->orderBy('section')
            ->get(['id', 'name']);

        return Inertia::render('teachers/create', [
            'classes' => $classes,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTeacherRequest $request)
    {
        $validated = $request->validated();
        
        // Create user account for teacher
        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role' => 'teacher',
            'email_verified_at' => now(),
        ]);

        // Create teacher profile
        Teacher::create([
            'user_id' => $user->id,
            'name' => $validated['name'],
            'nip' => $validated['nip'],
            'subject' => $validated['subject'],
            'homeroom_class_id' => $validated['homeroom_class_id'],
        ]);

        return redirect()->route('teachers.index')
            ->with('success', 'Data guru berhasil ditambahkan.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Teacher $teacher)
    {
        $this->authorize('admin');
        
        $teacher->load(['user', 'homeroomClass']);

        return Inertia::render('teachers/show', [
            'teacher' => $teacher,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Teacher $teacher)
    {
        $this->authorize('admin');
        
        $teacher->load(['user']);
        
        $classes = SchoolClass::where(function ($query) use ($teacher) {
            $query->whereDoesntHave('homeroomTeacher')
                ->orWhere('id', $teacher->homeroom_class_id);
        })
        ->orderBy('grade_level')
        ->orderBy('section')
        ->get(['id', 'name']);

        return Inertia::render('teachers/edit', [
            'teacher' => $teacher,
            'classes' => $classes,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTeacherRequest $request, Teacher $teacher)
    {
        $validated = $request->validated();
        
        // Update user account
        $teacher->user->update([
            'name' => $validated['name'],
            'email' => $validated['email'],
        ]);
        
        // Update password if provided
        if (!empty($validated['password'])) {
            $teacher->user->update([
                'password' => Hash::make($validated['password']),
            ]);
        }

        // Update teacher profile
        $teacher->update([
            'name' => $validated['name'],
            'nip' => $validated['nip'],
            'subject' => $validated['subject'],
            'homeroom_class_id' => $validated['homeroom_class_id'],
        ]);

        return redirect()->route('teachers.show', $teacher)
            ->with('success', 'Data guru berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Teacher $teacher)
    {
        $this->authorize('admin');
        
        $teacher->user->delete(); // This will cascade delete the teacher

        return redirect()->route('teachers.index')
            ->with('success', 'Data guru berhasil dihapus.');
    }

    /**
     * Authorize admin access.
     */
    protected function authorize(string $role): void
    {
        if (auth()->user()->role !== $role) {
            abort(403);
        }
    }
}