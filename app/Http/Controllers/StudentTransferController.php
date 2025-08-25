<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreStudentTransferRequest;
use App\Models\Student;
use App\Models\StudentTransfer;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StudentTransferController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $this->authorize('admin');
        
        $transfers = StudentTransfer::with(['student'])
            ->orderBy('transfer_date', 'desc')
            ->paginate(15);

        return Inertia::render('transfers/index', [
            'transfers' => $transfers,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $this->authorize('admin');
        
        $students = Student::active()
            ->orderBy('name')
            ->get(['id', 'name', 'nis']);

        return Inertia::render('transfers/create', [
            'students' => $students,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreStudentTransferRequest $request)
    {
        $validated = $request->validated();
        
        StudentTransfer::create($validated);
        
        // Update student status
        $student = Student::find($validated['student_id']);
        $student->update([
            'status' => $validated['type'] === 'in' ? 'transferred_in' : 'transferred_out'
        ]);

        return redirect()->route('transfers.index')
            ->with('success', 'Data mutasi siswa berhasil ditambahkan.');
    }

    /**
     * Display the specified resource.
     */
    public function show(StudentTransfer $transfer)
    {
        $this->authorize('admin');
        
        $transfer->load(['student.class']);

        return Inertia::render('transfers/show', [
            'transfer' => $transfer,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(StudentTransfer $transfer)
    {
        $this->authorize('admin');
        
        // Revert student status to active
        $transfer->student->update(['status' => 'active']);
        
        $transfer->delete();

        return redirect()->route('transfers.index')
            ->with('success', 'Data mutasi siswa berhasil dihapus.');
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