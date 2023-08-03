<?php

namespace App\Utility\Token;


/**
 * The TokenGenerator class is responsible for generating random tokens.
 */
class TokenGenerator
{
    /**
     * Generate a random token.
     * @return string The generated token.
     */
    public static function generateToken(): string {
        $salt = '$ATK$';
        $token = bin2hex(random_bytes(32));
        return $salt . $token;
    }
    
}