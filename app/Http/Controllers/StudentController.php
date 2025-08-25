<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreStudentRequest;
use App\Http\Requests\UpdateStudentRequest;
use App\Models\SchoolClass;
use App\Models\Student;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StudentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Student::with(['class'])
            ->when($request->search, function ($query, $search) {
                $query->where('name', 'like', '%' . $search . '%')
                    ->orWhere('nis', 'like', '%' . $search . '%');
            })
            ->when($request->class_filter, function ($query, $classFilter) {
                $query->where('class_id', $classFilter);
            })
            ->when($request->gender_filter, function ($query, $genderFilter) {
                $query->where('gender', $genderFilter);
            })
            ->orderBy('name');

        $students = $query->paginate(15)->withQueryString();
        
        $classes = SchoolClass::orderBy('grade_level')
            ->orderBy('section')
            ->get(['id', 'name']);

        return Inertia::render('students/index', [
            'students' => $students,
            'classes' => $classes,
            'filters' => $request->only(['search', 'class_filter', 'gender_filter']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $this->authorize('admin');
        
        $classes = SchoolClass::orderBy('grade_level')
            ->orderBy('section')
            ->get(['id', 'name']);

        return Inertia::render('students/create', [
            'classes' => $classes,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreStudentRequest $request)
    {
        Student::create($request->validated());

        return redirect()->route('students.index')
            ->with('success', 'Data siswa berhasil ditambahkan.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Student $student)
    {
        $student->load(['class', 'transfers']);

        return Inertia::render('students/show', [
            'student' => $student,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Student $student)
    {
        $this->authorize('admin');
        
        $classes = SchoolClass::orderBy('grade_level')
            ->orderBy('section')
            ->get(['id', 'name']);

        return Inertia::render('students/edit', [
            'student' => $student,
            'classes' => $classes,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateStudentRequest $request, Student $student)
    {
        $student->update($request->validated());

        return redirect()->route('students.show', $student)
            ->with('success', 'Data siswa berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Student $student)
    {
        $this->authorize('admin');
        
        $student->delete();

        return redirect()->route('students.index')
            ->with('success', 'Data siswa berhasil dihapus.');
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