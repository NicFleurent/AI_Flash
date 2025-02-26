<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class FlashcardRequest extends FormRequest
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

            'front_face' => 'required|string',
            'back_face' => 'required|string',
            'next_revision_date' => 'required|date',
            'forgetting_curve_stage' => 'required|int',
            'collection_id' => 'required|integer|exists:collections,id',
        ];
    }
}
