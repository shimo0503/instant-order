<?php

namespace App\UseCase\Order;

use Illuminate\Support\Facades\DB;
use App\UseCase\CustomerExistException;
use App\Models\Order;
use App\Models\User;
use App\Models\Customer;
use App\Models\Product;

class OrderCreateAction
{
    public function __invoke(int $table_num, array $products, User $user)
    {
        // 既に存在するかチェック
        if (Customer::where('table_number', $table_num)->exists()) {
            throw new CustomerExistException('そのお客様は既に存在しています。');
        }

        DB::transaction(function () use ($table_num, $products, $user) {
            // まず Customer を保存して ID を確定させる
            $customer = new Customer();
            $customer->table_number = $table_num;
            $customer->user_id = $user->id;
            $customer->price = 0; // 一旦 0 にして後で更新してもよい
            $customer->save();

            $data = [];
            $sum_price = 0;
            $now = now();

            foreach ($products as $product) {
                $prod = Product::findOrFail($product->id);
                $sum_price += $prod->price * $product->quantity;

                $data[] = [
                    'quantity'    => $product->quantity,
                    'customer_id' => $customer->id,
                    'product_id'  => $product->id,
                    'user_id'     => $user->id,
                    'created_at'  => $now,
                    'updated_at'  => $now,
                ];
            }

            Order::insert($data);

            $customer->price = $sum_price;
            $customer->save();
        });

        return true;
    }
}