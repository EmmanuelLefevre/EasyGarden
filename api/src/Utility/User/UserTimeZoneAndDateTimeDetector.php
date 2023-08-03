<?php

namespace App\Utility\User;

use App\Utility\User\UserIpAddressDetector;
use Symfony\Component\HttpClient\HttpClient;


/**
 * The UserTimeZoneAndDateTimeDetector class is responsible for detecting the user's time zone and date time zone based on their IP address.
 * This class uses an external API to determine the user's geographical location and time zone information.
 */
class UserTimeZoneAndDateTimeDetector
{
    /**
     * Detect the user's time zone and date time zone based on their IP address.
     * @return array An array containing the detected user time zone and date time zone.
     */
    public static function userTimeZoneAndDateTimeDetector(): array
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
