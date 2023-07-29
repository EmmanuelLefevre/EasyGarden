<?php

namespace App\Utility;

use Symfony\Component\HttpClient\HttpClient;


/**
 * The UserIpAddressDetector class is responsible for detecting the user's IP address using an external API.
 */
class UserIpAddressDetector
{
    /**
     * Get the user's IP address.
     * @return string The user's IP address as a string.
     */
    public static function getUserIpAddress(): string
    {
        $apiKey = $_ENV['IP_API_KEY'];
        $endpoint = "https://api.ipify.org?format=json";

        try {
            $client = HttpClient::create();
            $response = $client->request('GET', $endpoint);
            $data = $response->toArray();
            $userIpAddress = $data['ip'] ?? '127.0.0.1'; // Fallback to localhost IP if IP is not found
        } catch (\Exception $e) {
            // If there's an error with the API request, fallback to localhost IP
            $userIpAddress = '127.0.0.1';
        }

        return $userIpAddress;
    }
}