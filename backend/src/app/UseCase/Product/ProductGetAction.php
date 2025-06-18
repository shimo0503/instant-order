<?php

namespace App\UseCase\Product;

use App\Models\Product;

class ProductGetAction
{
    public function __invoke($user)
    {
        $product = Product::where('user_id', $user->id)->get();
        return $product;
    }
}