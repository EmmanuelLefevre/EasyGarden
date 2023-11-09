<?php

namespace App\Utility\Date;

use App\Utility\User\UserTimeZoneAndDateTimeDetector;


/**
 * The DateTimeConverter class is responsible for converting date-time strings to DateTime and DateTimeImmutable objects
 * using the user's time zone and date time zone information.
 * @package App\Utility\Date
 */
class DateTimeConverter
{
    /**
     * Convert a date-time string to a DateTimeImmutable object using the user's time zone.
     * @return \DateTimeImmutable The converted DateTimeImmutable object.
     */
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

    /**
     * Convert a date-time string to a DateTime object using the user's time zone.
     * @return \DateTime The converted DateTime object.
     */
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

    /**
     * Get the user's time zone and date time zone data.
     * @return array An array containing the detected user time zone and date time zone.
     */
    private static function getUserData(): array
    {
        // Get user's TimeZone and DateTimeZone data from UserTimeZoneAndDateTimeDetector class
        return UserTimeZoneAndDateTimeDetector::userTimeZoneAndDateTimeDetector();
    }

    /**
     * Extract the user's time zone and date time zone data from the getUserData method.
     * @return array An array containing the detected user time zone and date time zone.
     */
    private static function extractUserData(): array
    {
        // Get user's TimeZone and DateTimeZone data from getUserData method
        $userData = self::getUserData();

        return $userData;
    }

    /**
     * Set the default time zone to the user's time zone.
     * @param string $timeZone The user's time zone (e.g., 'America/New_York').
     * @return void
     */
    private static function setDefaultTimeZone(string $timeZone): void
    {
        date_default_timezone_set($timeZone);
    }
}