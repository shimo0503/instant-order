<?php

namespace App\Http\Controllers;

use App\Http\Resources\ErrorResource;
use Illuminate\Support\Facades\Log;
use App\Http\Requests\User\UserRegisterRequest;
use App\Http\Resources\CreateResource;
use Illuminate\Database\QueryException;
use App\UseCase\User\UserCreateAction;

class UserController extends Controller
{
    public function register(UserRegisterRequest $request, UserCreateAction $action)
    {
        $userdata = $request->validated();

        try {
            return new CreateResource(
                $action($userdata['email'], $userdata['password'])
            )->response()->setStatusCode('201');
        } catch(QueryException $e) {
            Log::error("ユーザ作成に失敗しました。");
            return new ErrorResource([
                'error' => 'ユーザ作成に失敗しました。',
                'message' => $e->getMessage()
            ])->response()->setStatusCode(401);
        }
    }
}
