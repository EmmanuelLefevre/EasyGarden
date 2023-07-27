<?php

namespace App\Utility;

use App\Utility\UserTimeZoneAndDateTimeDetector;

class DateTimeConverter
{
    public static function convertDateTimeStringToDateTimeImmutable(): \DateTimeImmutable
    {
        // Get the user TimeZone and DateTimeZone array from class UserTimeZoneAndDateTimeDetector
        $userData = self::extractUserTimeZoneAndDateTimeZone();

        // Convert the date_time string to DateTimeImmutable object using the user's time zone
        $dateTime = \DateTimeImmutable::createFromFormat('Y-m-d H:i:s', $userData['userDateTimeZone']);
        $dateTime = $dateTime->setTimezone(new \DateTimeZone($userData['userTimeZone']));

        return $dateTimeImmutable;
    }

    public static function convertDateTimeStringToDate(): \DateTime
    {
        // Get the user TimeZone and DateTimeZone array from class UserTimeZoneAndDateTimeDetector
        $userData = self::extractUserTimeZoneAndDateTimeZone();

        // Convert the date_time string to DateTime object using the user's time zone
        $dateTime = \DateTime::createFromFormat('Y-m-d H:i:s', $userData['userDateTimeZone']);
        $dateTime = $dateTime->setTimezone(new \DateTimeZone($userData['userTimeZone']));

        return $dateTime;
    }

    private static function getUserData(): array
    {
        // Get user's TimeZone and DateTimeZone data from UserTimeZoneAndDateTimeDetector class
        return UserTimeZoneAndDateTimeDetector::getUserTimeZoneAndDateTimeZone();
    }

    private static function extractUserTimeZoneAndDateTimeZone(): array
    {
        // Get user's TimeZone and DateTimeZone data from getUserData method
        $userData = self::getUserData();

        return $userData;
    }
}