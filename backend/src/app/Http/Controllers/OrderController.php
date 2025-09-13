<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Http\Requests\Order\OrderCreateRequest;
use App\UseCase\Order\OrderCreateAction;
use App\UseCase\Order\OrderAddAction;
use App\UseCase\Order\Exceptions\CustomerExistExceptions;
use App\UseCase\Order\Exceptions\CustomerDoesNotExistExceptions;
use App\Resources\OrderResource;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        return OrderResource::collection(Auth::user()->orders());
    }

    public function create(OrderCreateRequest $request, OrderCreateAction $action)
    {
        $credentials = $request->validated();
        try {
            return OrderResource::collection($action($credentials['table_number'], $credentials['products'], Auth::user()));
        } catch (CustomerExistExceptions $e) {
            return $this->error($e->message(), 400);
        }
    }
    public function add(OrderCreateRequest $request, OrderAddAction $action)
    {
        $credentials = $request->validated();
        try {
            return OrderResource::collection($action($credentials['table_number'], $credentials['products'], Auth::user()));
        } catch (CustomerExistExceptions $e) {
            return $this->error($e->message(), 400);
        }
    }
}
