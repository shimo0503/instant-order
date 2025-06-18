<?php

namespace App\UseCase\Product;

use App\Models\Product;

class ProductCreateAction
{
    public function __invoke($name, $price, $rest, $user)
    {
        $product = Product::create([
            'name' => $name,
            'price' => $price,
            'rest' => $rest,
            'user_id' => $user->id
        ]);

        return $product;
    }
}