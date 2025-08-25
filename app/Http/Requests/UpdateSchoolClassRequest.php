<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateSchoolClassRequest extends FormRequest
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
            'grade_level' => 'required|string|in:1,2,3,4,5,6',
            'section' => 'required|string|max:1',
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
            'grade_level.required' => 'Tingkat kelas harus dipilih.',
            'grade_level.in' => 'Tingkat kelas harus antara 1-6.',
            'section.required' => 'Bagian kelas harus diisi.',
            'section.max' => 'Bagian kelas maksimal 1 karakter.',
        ];
    }

    /**
     * Prepare the data for validation.
     */
    protected function prepareForValidation(): void
    {
        $this->merge([
            'name' => $this->grade_level . $this->section,
        ]);
    }
}