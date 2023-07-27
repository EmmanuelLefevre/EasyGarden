<?php

namespace App\Utility;

use App\Utility\UserIpAddressDetector;
use Symfony\Component\HttpClient\HttpClient;

class UserTimezoneDetector
{
    public static function detectUserTimezone(): string
    {
        // Récupérer l'adresse IP de l'utilisateur
        $userIpAddress = UserIpAddressDetector::getUserIpAddress();

        $apiKey = $_ENV['GEOIP_API_KEY'];
        $endpoint = "http://api.ipstack.com/{$userIpAddress}?access_key={$apiKey}";

        try {
            $client = HttpClient::create();
            $response = $client->request('GET', $endpoint);
            $data = $response->toArray();
            $userTimezone = $data['time_zone']['id'] ?? 'UTC'; // Fallback to UTC if timezone is not found
        } catch (\Exception $e) {
            // If there's an error with the API request, fallback to UTC timezone
            $userTimezone = 'UTC';
        }

        return $userTimezone;
    }
}