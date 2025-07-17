<?php

namespace App\Exceptions;

use Exception;

class ResourceAccessDenyException extends Exception
{
    public function __construct(string $message = 'そのリソースへの操作は許可されていません。') 
    {
        parent::construct($message);
    }
}
