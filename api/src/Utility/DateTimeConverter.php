<?php

namespace App\Utility;

use App\Utility\UserTimeZoneAndDateTimeDetector;

class DateTimeConverter
{
    public static function convertDateTimeStringToDateTimeImmutable(): \DateTimeImmutable
    {
        // Get the user TimeZone and DateTimeZone array from extractUserTimeZoneAndDateTimeZone method
        $userData = self::extractUserData();

        // Set the default timezone to the user's timezone
        self::setDefaultTimeZone($userData['userTimeZone']);
        // Convert the date_time string to DateTimeImmutable object using the user's time zone
        $dateTimeImmutable = \DateTimeImmutable::createFromFormat('Y-m-d H:i:s', $userData['userDateTimeZone']);

        return $dateTimeImmutable;
    }

    public static function convertDateTimeStringToDate(): \DateTime
    {
        // Get the user TimeZone and DateTimeZone array from extractUserData method
        $userData = self::extractUserData();

        // Set the default timezone to the user's timezone
        self::setDefaultTimeZone($userData['userTimeZone']);
        // Convert the date_time string to DateTime object using the user's time zone
        $dateTime = \DateTime::createFromFormat('Y-m-d H:i:s', $userData['userDateTimeZone']);

        return $dateTime;
    }

    private static function getUserData(): array
    {
        // Get user's TimeZone and DateTimeZone data from UserTimeZoneAndDateTimeDetector class
        return UserTimeZoneAndDateTimeDetector::userTimeZoneAndDateTimeDetector();
    }

    private static function extractUserData(): array
    {
        // Get user's TimeZone and DateTimeZone data from getUserData method
        $userData = self::getUserData();

        return $userData;
    }

    private static function setDefaultTimeZone(string $timeZone): void
    {
        date_default_timezone_set($timeZone);
    }
}