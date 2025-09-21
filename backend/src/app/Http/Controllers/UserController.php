<?php

namespace App\Http\Controllers;

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
            $action($userdata['email'], $userdata['password']);
            return $this->success("ユーザ作成に成功しました。", 201);
        } catch(QueryException $e) {
            Log::error("ユーザ作成に失敗しました。");
            return $this->error('ユーザ作成に失敗しました。', 500);
        }
    }
}
