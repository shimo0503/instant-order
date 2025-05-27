<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    protected $fillable = [
        'email',
        'password',
    ];

    // パスワードなど自動で隠す（シリアライズ時に除外）
    protected $hidden = [
        'password',
    ];

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
