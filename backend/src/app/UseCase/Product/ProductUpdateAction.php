<?php

namespace App\UseCase\Product;

use App\Models\Product;
use App\Exceptions\EmptyCollectionException;
use Illuminate\Database\QueryException;

class ProductUpdateAction
{
    public function __invoke($product_data, $user)
    {
        $product = Product::where([
            ['user_id', '=', $user['id']],
            ['id', '=' , $product_data['id']]
        ])->first();
        if (!$product) {
            throw new EmptyCollectionException();
        }

        $product->name = $product_data['name'];
        $product->price = $product_data['price'];
        $product->rest = $product_data['rest'];
        try {
            $product->save();
            return $product;
        } catch (QueryException $e) {
            throw $e;
        }
    }
}