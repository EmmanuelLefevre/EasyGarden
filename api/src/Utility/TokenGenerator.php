<?php

namespace App\Utility;


class TokenGenerator

{
    public static function generateToken(): string {
        $salt = '$ATK$';
        $token = bin2hex(random_bytes(32));
        return $salt . $token;
    }
    
}