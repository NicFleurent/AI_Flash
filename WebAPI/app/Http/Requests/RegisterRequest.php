<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
          'email' => ['required','email','unique:users'],
          'firstname' => ['required'],
          'lastname' => ['required'],
          'password' => ['required', 'confirmed']
        ];
    }

    public function messages()
    {
        return [
            'email.unique' => 'auth.register_error_email_taken',
        ];
    }

}
