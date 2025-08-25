<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\SchoolClassController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\StudentTransferController;
use App\Http\Controllers\TeacherController;

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
});

Route::middleware(['auth', 'verified'])->group(function () {
    // Dashboard
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    
    // Student Management
    Route::resource('students', StudentController::class);
    
    // Teacher Management (Admin only)
    Route::resource('teachers', TeacherController::class);
    
    // Class Management  
    Route::resource('classes', SchoolClassController::class);
    
    // Student Transfers (Admin only)
    Route::resource('transfers', StudentTransferController::class)->except(['edit', 'update']);
    

});

require __DIR__.'/auth.php';