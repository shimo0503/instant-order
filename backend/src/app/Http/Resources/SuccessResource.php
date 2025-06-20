<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SuccessResource extends JsonResource
{
    protected string $message = 'リクエストに成功しました。';

    public function withMessage(string $message): static
    {
        $this->message = $message;
        return $this;
    }
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'code' => 200,
            'message' => $this->message,
            'data' => $this->resource
        ];
    }
}
