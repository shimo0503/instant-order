<?php

namespace App\UseCase\Order;

use Illuminate\Support\Facades\DB;
use App\UseCase\Order\Exceptions\CustomerDoesNotExistException;
use App\Models\Order;
use App\Models\User;
use App\Models\Customer;
use App\Models\Product;

class OrderAddAction
{
    public function __invoke(int $table_num, array $products, User $user)
    {
        $customer = Customer::where('table_number', $table_num)->first();
        if (!$customer) {
            throw new CustomerDoesNotExistException('そのテーブルはまだ使われていません。');
        }

        DB::transaction(function () use ($table_num, $products, $user, $customer) {
            $data = [];
            $sum_price = 0;
            $now = now();

            foreach ($products as $product) {
                $prod = Product::findOrFail($product['id']);
                $sum_price += $prod->price * $product['quantity'];

                $data[] = [
                    'quantity'    => $product['quantity'],
                    'customer_id' => $customer->id,
                    'product_id'  => $product['id'],
                    'user_id'     => $user->id,
                    'created_at'  => $now,
                    'updated_at'  => $now,
                ];
            }

            Order::insert($data);

            $customer->price += $sum_price;
            $customer->save();
        });

        return true;
    }
}