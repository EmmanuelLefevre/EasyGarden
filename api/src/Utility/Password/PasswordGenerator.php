<?php

namespace App\Utility\Password;


/**
 * The PasswordGenerator class is responsible for generating new random passwords.
 * @package App\Utility\Password
 */
class PasswordGenerator
{
    /**
     * Generate a random passwor with specific criteria.
     * @return string The generated password.
     */
    public static function generatePassword(): string {

        $uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
        $numberChars = '0123456789';
        $specialChars = '^!@#$%&*£µ@();?":{}<>\/';
        
        $password = '';
        
        // Add one uppercase character
        $password .= $uppercaseChars[random_int(0, strlen($uppercaseChars) - 1)];
        
        // Add five lowercase characters
        for ($i = 0; $i < 5; $i++) {
            $password .= $lowercaseChars[random_int(0, strlen($lowercaseChars) - 1)];
        }
        
        // Add one digit
        $password .= $numberChars[random_int(0, strlen($numberChars) - 1)];
        
        // Add one special character
        $password .= $specialChars[random_int(0, strlen($specialChars) - 1)];
        
        // Shuffle the characters to randomize the order
        $password = str_shuffle($password);
        
        return $password;
    } 

}