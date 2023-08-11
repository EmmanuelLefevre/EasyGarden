<?php

namespace App\DataFixtures;


/**
 * Class FunctionsFixture
 * This class provides utility functions to create random data.
 * @package App\DataFixtures
 */
class FunctionsFixture {

    /**
     * Extracts and returns a string surrounded by parentheses from the input string.
     * @param string $str The input string containing parentheses.
     * @return string The extracted string without parentheses.
     */
    public static function stringWithoutParenthesis($str): string {
        return substr($str, ($p = strpos($str, '(')+1), strrpos($str, ')')-$p);
    }
    
    /**
     * Extracts a string surrounded by parentheses from the input string and adds parentheses around it.
     * @param string $str The input string containing parentheses.
     * @return string The extracted string with added parentheses.
     */
    public static function stringWithParenthesis($str): string {
        $pseudo = substr($str, ($p = strpos($str, '(')+1), strrpos($str, ')')-$p);
        return (' ('.$pseudo.')');
    }
    
    /**
     * Generates a random floating-point number within a specified range and appends "bars".
     * @param float $min The minimum value of the range.
     * @param float $max The maximum value of the range.
     * @return string The formatted random float value with "bars".
     */
    public static function random_float ($min,$max): string {
        $value = ($min+lcg_value()*(abs($max-$min)));
        return (sprintf("%01.2f",$value)."bars");
    }
    
    /**
     * Generates a random email domain from a predefined list.
     * @return string A randomly selected email domain.
     */
    public static function emailData(): string {
        $data = ['gmail.com','outlook.fr','yahoo.fr','protonmail.com','orange.fr','live.fr','laposte.net','icloud.com','sfr.fr','free.fr','mailo.com'];
        $value = array_rand(array_flip($data), 1);
        return $value;
    }
    
    /**
     * Generates a random lightning equipment from a predefined list.
     * @return string A randomly selected lightning equipment.
     */
    public static function lightningsData(): string {
        $data = ['Terrasse','Abris Jardin','Abris Bois','Terrain Pétanque','Pignon','Massif Brasero','Allée','Portail',
        'Porte Entrée','Carport','Piscine','Bassin','Douche Piscine','Sapin','Chêne','Enrochement','Spa',
        'Cuisine Extérieure','Jacuzi','Pas Japonais','Massif','Haie Bambous','Ruche','Saule Pleureur','Guinguette',
        'Lagune','Balustrade','Globes','Bande LED','Serpentin','Palmiers','Jeux d\'Eau','Nénuphars','Escalier',
        'Lanternes','Pont','Ponton','Balancelle','Tonnelle','Guirlande','Photophores','Pergola','Massif Minéral',
        'Candélabre','Parasol Chauffant','Buddha','Potager','Spot Île'
        ];
        $value = array_rand(array_flip($data), 1);
        return $value;
    }
    
    /**
     * Generates a random pool equipment from a predefined list.
     * @return string A randomly selected pool equipment.
     */
    public static function poolsData(): string {
        $data = ['Jet Enrochement','Jet Tonneau','Cracheur','Roue','Cascade','Trop-Plein','Pompe Remplissage',
        'Aspirateur','Filtre','Boule Lumineuse','Cygne','Grenouille','Héron Cendré','Canard'
        ];
        $value = array_rand(array_flip($data), 1);
        return $value;
    }
    
    /**
     * Generates a random watering equipment from a predefined list.
     * @return string A randomly selected watering equipment.
     */
    public static function wateringsData(): string {
        $data = ['Chemin Accès','Allée','Bassin','Enrochement','Massif Brasero','Bassin','Arrière Maison','Haie Bambous',
        'Piscine','Massif','Terrasse','Massif Minéral','Pergola','Potager','Tomates','Salade','Courges','Secteur Devant',
        'Secteur Arrière','Haie','Potiches','Goutte à Goutte','Jardinière'
        ];
        $value = array_rand(array_flip($data), 1);
        return $value;
    }
    
    /**
     * Generates a hexadecimal token with a prefix.
     * @return string A generated token with a prefix.
     */
    public static function generateToken(): string {
        $salt = '$FTK$';
        $token = bin2hex(random_bytes(32));
        return $salt . $token;
    }
    
    /**
     * Generates an activation key with 20 random digits.
     * @return string A randomly generated activation key.
     */
    public static function generateActivationKey(): string {
        // Add first number
        $random_number = '1' . mt_rand(0, 9);
    
        // Add the following 19 numbers
        for ($i = 0; $i < 19; $i++) {
            $random_number .= mt_rand(0, 9);
        }
    
        return $random_number;
    }

}