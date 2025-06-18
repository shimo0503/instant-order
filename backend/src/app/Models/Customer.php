<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    protected $fillable = [
        'table_number',
        'price',
        'user_id',
    ];
    public function orders() {
        return $this->belongsTo(Order::class);
    }
}
