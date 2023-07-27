<?php

namespace App\Utility;

use App\Utility\UserIpAddressDetector;
use Symfony\Component\HttpClient\HttpClient;

class UserTimeZoneAndDateTimeDetector
{
    public static function userTimeZoneAndDateTimeDetector(): string
    {
        // Get user's IP adress
        $userIpAddress = UserIpAddressDetector::getUserIpAddress();

        $apiKey = $_ENV['TIMEZONE_API_KEY'];
        $endpoint = "https://api.ipgeolocation.io/timezone?apiKey={$apiKey}&ip={$userIpAddress}";

        $client = HttpClient::create();
        $response = $client->request('GET', $endpoint);
        $data = $response->toArray();

        // Fallback for userTimeZone
        $userTimeZone = $data['timezone'] ?? 'UTC';

        // Fallback for userDateTimezone
        $userDateTimeZone = $data['date_time'] ?? date('Y-m-d H:i:s');

        return [
            'userTimeZone' => $userTimeZone,
            'userDateTimeZone' => $userDateTimeZone,
        ];
    }
}
