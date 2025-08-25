<?php

namespace App\Http\Controllers;

use App\Models\SchoolClass;
use App\Models\Student;
use App\Models\Teacher;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display the application dashboard.
     */
    public function index()
    {
        $totalStudents = Student::active()->count();
        $totalTeachers = Teacher::count();
        $totalClasses = SchoolClass::count();
        
        // Students by gender
        $maleStudents = Student::active()->where('gender', 'male')->count();
        $femaleStudents = Student::active()->where('gender', 'female')->count();
        
        // Students by class
        $studentsByClass = SchoolClass::withCount(['students' => function ($query) {
            $query->where('status', 'active');
        }])
        ->orderBy('grade_level')
        ->orderBy('section')
        ->get()
        ->map(function ($class) {
            return [
                'class' => $class->name,
                'count' => $class->students_count,
            ];
        });
        
        return Inertia::render('dashboard', [
            'stats' => [
                'total_students' => $totalStudents,
                'total_teachers' => $totalTeachers,
                'total_classes' => $totalClasses,
                'male_students' => $maleStudents,
                'female_students' => $femaleStudents,
            ],
            'students_by_class' => $studentsByClass,
        ]);
    }
}