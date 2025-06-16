<?php

namespace App\UseCase\Auth;

use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Auth\AuthenticationException;

class AuthAction
{
    public function login($credentials)
    {
        if(!$token = JWTAuth::attempt($credentials)) {
            throw new AuthenticationException('認証に失敗しました。');
        }
        return $token;
    }
}
