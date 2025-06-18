<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Log;
use App\Http\Requests\Product\ProductCreateRequest;
use App\UseCase\Product\ProductCreateAction;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\CreateResource;
use App\Http\Resources\ErrorResource;
use Illuminate\Database\QueryException;

class ProductController extends Controller
{
    public function create(ProductCreateRequest $request, ProductCreateAction $action)
    {
        $product_data = $request->validated();
        
        $user = Auth::user();
        
        try {
            return new CreateResource(
                $action($product_data['name'], $product_data['price'], $product_data['rest'], $user)
            )->response()->setStatusCode('201');
        } catch(QueryException $e) {
            Log::error("商品作成に失敗しました。");
            return new ErrorResource([
                'error' => '商品作成に失敗しました。',
                'message' => $e->getMessage()
            ])->response()->setStatusCode(401);
        }
    }
    
    public function read()
    {

    }
}
