<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\JwtCookieMiddleware;
use App\Http\Controllers\ProductController;

Route::post('/user/register', [UserController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout']);
Route::middleware(JwtCookieMiddleware::class)->group(function () {
    Route::get('/product', [ProductController::class, 'read']);
    Route::post('/product', [ProductController::class, 'create']);
    Route::put('/product', [ProductController::class, 'update']);
    Route::delete('/product/{id}', [ProductController::class, 'delete']);
});