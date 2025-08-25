<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreStudentTransferRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->user()->role === 'admin';
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'student_id' => 'required|exists:students,id',
            'type' => 'required|in:in,out',
            'transfer_date' => 'required|date',
            'notes' => 'nullable|string',
            'from_school' => 'required_if:type,in|nullable|string|max:255',
            'to_school' => 'required_if:type,out|nullable|string|max:255',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'student_id.required' => 'Siswa harus dipilih.',
            'student_id.exists' => 'Siswa yang dipilih tidak valid.',
            'type.required' => 'Jenis mutasi harus dipilih.',
            'type.in' => 'Jenis mutasi harus pindah masuk atau pindah keluar.',
            'transfer_date.required' => 'Tanggal mutasi harus diisi.',
            'transfer_date.date' => 'Tanggal mutasi tidak valid.',
            'from_school.required_if' => 'Asal sekolah harus diisi untuk pindah masuk.',
            'to_school.required_if' => 'Sekolah tujuan harus diisi untuk pindah keluar.',
        ];
    }
}