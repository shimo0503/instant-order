<?php

namespace App\Http\Controllers;

// ファサード
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

// リクエストバリデーション
use App\Http\Requests\Product\ProductCreateRequest;
use App\Http\Requests\Product\ProductUpdateRequest;
use App\Http\Requests\Product\ProductDeleteRequest;

// ビジネスロジック
use App\UseCase\Product\ProductCreateAction;
use App\UseCase\Product\ProductGetAction;
use App\UseCase\Product\ProductUpdateAction;
use App\UseCase\Product\ProductDeleteAction;

// レスポンス整形
use App\Http\Resources\ProductResource;

// 例外
use App\Exceptions\EmptyCollectionException;
use App\Exceptions\ResourceAccessDenyException;
use Illuminate\Database\QueryException;

class ProductController extends Controller
{
    public function create(ProductCreateRequest $request, ProductCreateAction $action)
    {
        $product_data = $request->validated();
        
        $user = Auth::user();
        
        try {
            return new ProductResource(
                $action($product_data['name'], $product_data['price'], $product_data['rest'], $user)
            );
        } catch(QueryException $e) {
            Log::error("エラー内容" . $e);
            return $this->error('商品作成に失敗しました。');
        }
    }
    
    public function read(ProductGetAction $action)
    {
        $user = Auth::user();
        return ProductResource::collection($action($user));
    }

    public function update(ProductUpdateRequest $request, ProductUpdateAction $action)
    {
        $product_data = $request->validated();
        $user = Auth::user();

        try {
            return new ProductResource($action($product_data, $user));
        } catch (EmptyCollectionException $e) {
            Log::error("エラー" . $e->getMessage());
            return $this->error($e->getMessage(), 400);
        } catch (QueryException $e) {
            Log::error("エラー", $e->getMessage());
            return $this->error($e->getMessage(), 400);
        }
    }
    public function delete(ProductDeleteRequest $request, ProductDeleteAction $action, $id)
    {
        $user = Auth::user();

        try {
            $action($id, $user);
            return $this->success("データの削除に成功しました。", 200);
        } catch (EmptyCollectionException $e) {
            Log::error("エラー" . $e->getMessage());
            return $this->error($e->getMessage(), 400);
        } catch (ResourceAccessDenyException $e) {
            Log::error("エラー" . $e->getMessage());
            return $this->error($e->getMessage(), 400);
        }
    }
}
