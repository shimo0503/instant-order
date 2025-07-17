<?php

namespace App\Exceptions;

use Exception;

class EmptyCollectionException extends Exception
{
    public function __construct(string $message = 'データが見つかりませんでした。') 
    {
        parent::__construct($message);
    }
}
