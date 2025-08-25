<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreTeacherRequest extends FormRequest
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
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email|max:255',
            'password' => 'required|string|min:8|confirmed',
            'nip' => 'required|string|unique:teachers,nip|max:20',
            'subject' => 'required|string|max:255',
            'homeroom_class_id' => 'nullable|exists:classes,id|unique:teachers,homeroom_class_id',
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
            'name.required' => 'Nama guru harus diisi.',
            'email.required' => 'Email harus diisi.',
            'email.unique' => 'Email sudah digunakan.',
            'password.required' => 'Password harus diisi.',
            'password.min' => 'Password minimal 8 karakter.',
            'password.confirmed' => 'Konfirmasi password tidak cocok.',
            'nip.required' => 'NIP guru harus diisi.',
            'nip.unique' => 'NIP guru sudah digunakan.',
            'subject.required' => 'Mata pelajaran harus diisi.',
            'homeroom_class_id.unique' => 'Kelas sudah memiliki wali kelas.',
        ];
    }
}