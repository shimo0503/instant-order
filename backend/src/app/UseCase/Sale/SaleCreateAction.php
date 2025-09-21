<?php

namespace App\UseCase\Sale;

use App\Models\Sale;
use App\Models\User;
use App\Models\Customer;
use App\UseCase\Sale\Exceptions\CustomerDoesNotExistException;
use Illuminate\Support\Facades\DB;

class SaleCreateAction
{
    public function __invoke(int $customer_id, User $user)
    {
        return DB::transaction(function () use ($customer_id, $user) {
            $customer = Customer::find($customer_id);
            if ($customer === null) {
                throw new CustomerDoesNotExistException('その客は存在しません。');
            }
            $sale = Sale::create([
                'user_id' => $user->id,
                'price' => $customer->price
            ]);
            $customer->delete();
            return $sale;
        });
    }
}  