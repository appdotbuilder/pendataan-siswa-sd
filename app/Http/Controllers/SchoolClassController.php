<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSchoolClassRequest;
use App\Http\Requests\UpdateSchoolClassRequest;
use App\Models\SchoolClass;
use Inertia\Inertia;

class SchoolClassController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $classes = SchoolClass::with(['homeroomTeacher'])
            ->withCount('students')
            ->orderBy('grade_level')
            ->orderBy('section')
            ->paginate(15);

        return Inertia::render('classes/index', [
            'classes' => $classes,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $this->authorize('admin');

        return Inertia::render('classes/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSchoolClassRequest $request)
    {
        $validated = $request->validated();
        
        SchoolClass::create([
            'name' => $validated['grade_level'] . $validated['section'],
            'grade_level' => $validated['grade_level'],
            'section' => $validated['section'],
        ]);

        return redirect()->route('classes.index')
            ->with('success', 'Kelas berhasil ditambahkan.');
    }

    /**
     * Display the specified resource.
     */
    public function show(SchoolClass $class)
    {
        $class->load(['homeroomTeacher', 'students' => function ($query) {
            $query->where('status', 'active')->orderBy('name');
        }]);

        return Inertia::render('classes/show', [
            'class' => $class,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(SchoolClass $class)
    {
        $this->authorize('admin');

        return Inertia::render('classes/edit', [
            'class' => $class,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSchoolClassRequest $request, SchoolClass $class)
    {
        $validated = $request->validated();
        
        $class->update([
            'name' => $validated['grade_level'] . $validated['section'],
            'grade_level' => $validated['grade_level'],
            'section' => $validated['section'],
        ]);

        return redirect()->route('classes.show', $class)
            ->with('success', 'Kelas berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(SchoolClass $class)
    {
        $this->authorize('admin');
        
        if ($class->students()->count() > 0) {
            return back()->withErrors([
                'message' => 'Kelas tidak dapat dihapus karena masih memiliki siswa.'
            ]);
        }
        
        $class->delete();

        return redirect()->route('classes.index')
            ->with('success', 'Kelas berhasil dihapus.');
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