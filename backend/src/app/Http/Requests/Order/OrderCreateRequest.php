<?php

namespace App\Http\Requests\Order;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Validation\ValidationException;

class OrderCreateRequest extends FormRequest
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
            'table_number' => ['required', 'integer', 'min:0'],
            'products' => ['required', 'array'],
            'products.*id' => ['required', 'integer', 'min:0'],
            'products.*quantity' => ['required', 'integer', 'min:0']
        ];
    }

    //validation失敗時のレスポンス
    protected function failedValidation(Validator $validator)
    {
        $response = [
            'message' => 'リクエストが不正です。',
            'error' => $validator->errors()
        ];

        throw new ValidationException($validator, response()->json($response, 400));
    }
}
