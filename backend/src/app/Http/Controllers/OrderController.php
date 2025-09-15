<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Http\Requests\Order\OrderCreateRequest;
use App\UseCase\Order\OrderCreateAction;
use App\UseCase\Order\OrderAddAction;
use App\UseCase\Order\Exceptions\CustomerExistException;
use App\UseCase\Order\Exceptions\CustomerDoesNotExistException;
use App\Http\Resources\OrderResource;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        return OrderResource::collection(Auth::user()->orders);
    }

    public function create(OrderCreateRequest $request, OrderCreateAction $action)
    {
        $credentials = $request->validated();
        try {
            $action($credentials['table_number'], $credentials['products'], Auth::user());
            return $this->success('注文に成功しました。', 201);
        } catch (CustomerExistException $e) {
            return $this->error($e->getMessage(), 422);
        }
    }
    public function add(OrderCreateRequest $request, OrderAddAction $action)
    {
        $credentials = $request->validated();
        try {
            $action($credentials['table_number'], $credentials['products'], Auth::user());
            return $this->success('注文に成功しました。', 201);
        } catch (CustomerDoesNotExistException $e) {
            return $this->error($e->getMessage(), 422);
        }
    }
}
