<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;

Route::post('/user/register', [UserController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);