<?php

namespace App\UseCase\Product;

use App\Models\Product;
use App\Exceptions\EmptyCollectionException;
use App\Exceptions\ResourceAccessDenyException;

class ProductDeleteAction
{
    public function __invoke($id, $user)
    {
        $product = Product::find($id);

        if (!$product) {
            throw new EmptyCollectionException();
        }

        if ($product->user_id !== $user->id) {
            throw new ResourceAccessDenyException();
        }

        $product->delete();

        return ['id' => $id];
    }
}