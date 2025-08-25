<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateStudentRequest extends FormRequest
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
            'nis' => 'required|string|unique:students,nis,' . $this->route('student')->id . '|max:20',
            'nisn' => 'required|string|unique:students,nisn,' . $this->route('student')->id . '|max:20',
            'name' => 'required|string|max:255',
            'gender' => 'required|in:male,female',
            'birth_place' => 'required|string|max:255',
            'birth_date' => 'required|date|before:today',
            'address' => 'required|string',
            'parent_name' => 'required|string|max:255',
            'class_id' => 'required|exists:classes,id',
            'status' => 'sometimes|in:active,transferred_in,transferred_out',
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
            'nis.required' => 'NIS siswa harus diisi.',
            'nis.unique' => 'NIS siswa sudah digunakan.',
            'nisn.required' => 'NISN siswa harus diisi.',
            'nisn.unique' => 'NISN siswa sudah digunakan.',
            'name.required' => 'Nama siswa harus diisi.',
            'gender.required' => 'Jenis kelamin harus dipilih.',
            'birth_place.required' => 'Tempat lahir harus diisi.',
            'birth_date.required' => 'Tanggal lahir harus diisi.',
            'birth_date.before' => 'Tanggal lahir harus sebelum hari ini.',
            'address.required' => 'Alamat harus diisi.',
            'parent_name.required' => 'Nama orang tua/wali harus diisi.',
            'class_id.required' => 'Kelas harus dipilih.',
            'class_id.exists' => 'Kelas yang dipilih tidak valid.',
        ];
    }
}