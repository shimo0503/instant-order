<?php

namespace App\Http\Controllers;

use Illuminate\Auth\AuthenticationException;
use Illuminate\Http\Request;
use App\Http\Requests\Auth\LoginRequest;
use App\UseCase\Auth\AuthAction;
use Tymon\JWTAuth\Facades\JWTAuth;

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

            return $this->success('ログインに成功しました。', 200)
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
            return $this->error('ログインに失敗しました。', 401);
        }
    }

    public function logout(Request $request)
    {
        try {
            $token = $request->cookie('token');

            if ($token) {
                JWTAuth::setToken($token)->invalidate();
            }

            return $this->success('ログアウトに成功しました。', 200)
            ->cookie(
                'token',
                '', // 空にする
                -1, // 有効期限を過去にして削除
                null,
                null,
                false,
                true
            );
        } catch (\Exception $e) {
            return $this->error('ログアウト中にエラーが発生しました。', 400);
        }
    }
}
