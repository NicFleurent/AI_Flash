<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

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
          'password' => [
            'required', 
            Password::min(7)->letters()->mixedCase()->numbers()->symbols(),
            'confirmed']
        ];
    }

    public function messages()
    {
        return [
            'password.min' => 'auth.register_error_password_min',
            'password.letters' => 'auth.register_error_password_letters',
            'password.mixed' => 'auth.register_error_password_mixed',
            'password.numbers' => 'auth.register_error_password_numbers',
            'password.symbols' => 'auth.register_error_password_symbols',
        ];
    }

    public function messages()
    {
        return [
            'email.unique' => 'auth.register_error_email_taken',
        ];
    }

}
