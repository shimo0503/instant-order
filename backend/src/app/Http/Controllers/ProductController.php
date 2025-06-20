<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Log;
use App\Http\Requests\Product\ProductCreateRequest;
use App\Http\Requests\Product\ProductUpdateRequest;
use App\UseCase\Product\ProductCreateAction;
use App\UseCase\Product\ProductGetAction;
use App\UseCase\Product\ProductUpdateAction;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\CreateResource;
use App\Http\Resources\ErrorResource;
use App\Http\Resources\ProductResource;
use App\Http\Resources\SuccessResource;
use Illuminate\Database\QueryException;
use App\Exceptions\EmptyCollectionException;

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
    
    public function read(ProductGetAction $action)
    {
        $user = Auth::user();
        return new SuccessResource(
            ProductResource::collection(
                $action($user)
            )
        )
        ->withMessage('商品の取得に成功しました。')
        ->response()->setStatusCode(200);
    }

    public function update(ProductUpdateRequest $request, ProductUpdateAction $action)
    {
        $product_data = $request->validated();
        $user = Auth::user();

        try {
            return new SuccessResource(
                new ProductResource($action($product_data, $user))
            )
            ->withMessage('商品の更新に成功しました。')
            ->response()->setStatusCode(200);
        } catch (EmptyCollectionException $e) {
            Log::error("商品の更新に失敗しました。");
            return new ErrorResource([
                'error' => '商品の更新に失敗しました。',
                'message' => $e->getMessage()
            ])->response()->setStatusCode(400);
        } catch (QueryException $e) {
            Log::error("名前が重複しています。");
            return new ErrorResource([
                'error' => '名前が重複しています。',
                'message' => $e->getMessage()
            ])->response()->setStatusCode(400);
        }
    }
}
