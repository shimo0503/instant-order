<?php

namespace App\UseCase\User;

use Illuminate\Support\Facades\Hash;
use App\Models\User;

class CreateAction
{
    public function __invoke($email, $password)
    {
        $user = User::create([
            'email' => $email,
            'password' => Hash::make($password)
        ]);
        return $user;
    }
}