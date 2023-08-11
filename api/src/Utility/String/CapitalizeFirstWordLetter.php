<?php

namespace App\Utility\String;

use function preg_split;


/**
 * Class for capitalizing the first letter of each word in a composite name.
 * @package App\Utility\String
 */
class CapitalizeFirstWordLetter
{
    /**
     * Capitalize the first letter of each word in a composite name.
     * @param string $name The composite name to process.
     * @return string The composite name with the first letter of each word capitalized.
     */

  public static function capitalizeCompositeName(string $name): string
    {
        $parts = preg_split('/(?<=[ -])/', $name);
        $capitalizedParts = array_map(function ($part) {
            return ucfirst($part);
        }, $parts);

        return implode('', $capitalizedParts);
    }
}