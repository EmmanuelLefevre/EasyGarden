<?php

namespace App\Utility;

use App\Utility\UserIpAddressDetector;
use Symfony\Component\HttpClient\HttpClient;

class UserTimeZoneAndDateTimeDetector
{
    public static function userTimeZoneAndDateTimeDetector(): string
    {
        // Récupérer l'adresse IP de l'utilisateur
        $userIpAddress = UserIpAddressDetector::getUserIpAddress();

        $apiKey = $_ENV['TIMEZONE_API_KEY'];
        $endpoint = "https://api.ipgeolocation.io/timezone?apiKey={$apiKey}&ip={$userIpAddress}";

        $client = HttpClient::create();
        $response = $client->request('GET', $endpoint);
        $data = $response->toArray();
        $userTimezone = $data['timezone'];
        $userDateTimezone = $data['date_time'];

        return [
            'userTimezone' => $userTimezone,
            'userDateTimezone' => $userDateTimezone,
        ];
    }
}
