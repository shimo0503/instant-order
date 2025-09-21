<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\QueryException;
use App\Http\Requests\Sale\SaleCreateRequest;
use App\UseCase\Sale\SaleCreateAction;
use App\Http\Resources\SaleResource;
use App\UseCase\Sale\Exceptions\CustomerDoesNotExistException;

class SaleController extends Controller
{
    public function index(Request $request)
    {
        return SaleResource::collection($request->user()->sales);
    }

    public function create(SaleCreateRequest $request, SaleCreateAction $action)
    {
        $credentials = $request->validated();
        try {
            return new SaleResource($action($credentials['customer_id'], Auth::user()));
        } catch (CustomerDoesNotExistException $e) {
            return $this->error($e->getMessage(), 404);
        } catch (QueryException $e) {
            return $this->error($e->getMessage(), 500);
        }
    }
}
