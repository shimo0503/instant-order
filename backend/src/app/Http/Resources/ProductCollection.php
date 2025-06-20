<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class ProductCollection extends ResourceCollection
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return $this->collection->toArray();
    }
    
    public function with($request)
    {
        return [
            'code' => 200,
            'message' => 'データの取得に成功しました。'
        ];
    }
}