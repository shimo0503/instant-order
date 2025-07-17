<?php

namespace App\Http\Requests\Product;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Validation\ValidationException;

class ProductDeleteRequest extends FormRequest
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
            'id' => ['required', 'integer', 'min:0'],
        ];
    }

    public function message(): array
    {
        return [
            'id.required' => 'idフィールドは必須です。',
            'id.min' => 'idは:min以上にしてください。',
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

    /**
     * 入力データを調整
     */
    protected function prepareForValidation()
    {
        // パスパラメータ 'user' を input にマージ
        $this->merge([
            'id' => $this->route('id'),
        ]);
    }
}
