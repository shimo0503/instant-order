<?php

namespace App\Http\Controllers;

abstract class Controller
{
    public function success(string $message, int $status_code) {
        return reponse()->json([
            'message' => $message
        ], status_code);
    }

    public function error(string $message, int $status_code) {
        return reponse()->json([
            'error' => $message
        ], status_code);
    }
}
