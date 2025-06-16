<?php

namespace App\Http\Controllers;

use Illuminate\Auth\AuthenticationException;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Resources\SuccessResource;
use App\Http\Resources\ErrorResource;
use App\UseCase\Auth\AuthAction;

class AuthController extends Controller
{
    /**
     * ログイン認証用API
     * ログインが成功したときのみ、トークンをクッキーで返す。
     * クッキーはバックエンド側でしか読み書きできない
     */
    public function login(LoginRequest $request, AuthAction $auth_action)
    {
        $credentials = $request->validated();

        try{
            $token = $auth_action->login($credentials);

            return new SuccessResource([
                'message' => 'ログインに成功しました。'
            ])
            ->response()
            ->setStatusCode(200)
            ->cookie(
                'token',       // クッキー名
                $token,               // 値
                60,                   // 分単位の有効期限
                null,                 // パス
                null,                 // ドメイン
                false,                 // Secure（HTTPSのみ）
                true,                 // HttpOnly ← これが重要！
                false,                // Raw
                'Strict'              // SameSite
            );
        } catch (AuthenticationException $e) {
            return new ErrorResource([
                'error' => 'Unauthorized',
                'message' => $e->getMessage()
            ])->response()->setStatusCode(401);
        }
    }
}
