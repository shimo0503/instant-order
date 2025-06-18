<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Log;

class JwtCookieMiddleware
{
    /**
     * cookieで送信されたjwtを、ヘッダーのAuthorizationにセットして検証。
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if ($request->cookie('token')) {
            $token = $request->cookie('token');
            $request->headers->set('Authorization', 'Bearer ' . $token);

            try {
                $user = \Tymon\JWTAuth\Facades\JWTAuth::setToken($token)->authenticate();

                // 後続で $request->user() で使えるようにする
                $request->setUserResolver(function () use ($user) {
                    return $user;
                });
            } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
                return response()->json(['error' => 'トークンが無効です。'], 401);
            } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
                return response()->json(['error' => 'トークンが不正です。'], 401);
            } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {
                return response()->json(['error' => 'トークンがありません。'], 401);
            }
        } else {
            return response()->json(['error' => 'トークンがありません。'], 401);
        }
        return $next($request);
    }
}

