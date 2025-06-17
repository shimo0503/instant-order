<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Model;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    // JWTSubject メソッドを実装する
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    protected $fillable = [
        'email',
        'password',
    ];

    // パスワードなど自動で隠す（シリアライズ時に除外）
    protected $hidden = [
        'password',
    ];

    public function getJWTdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }

    public function customers() {
        return $this->belongsTo(Customer::class);
    }

    public function orders() {
        return $this->belongsTo(Order::class);
    }

    public function products() {
        return $this->belongsTo(Product::class);
    }

    public function sales() {
        return $this->belongsTo(Sale::class);
    }
}
