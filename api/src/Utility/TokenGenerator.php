<?php

namespace App\Utility;

class TokenGenerator

{
    public static function generateToken(): string
    {
        return bin2hex(random_bytes(32));
    }
    
}