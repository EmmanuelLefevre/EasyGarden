<?php

namespace App\Service\Arduino;

class ArduinoConnectionService
{
    private int $baud; // Transmission speed
    private string $port; // Serial port

    public function __construct()
    {
        $this->baud = 9600;
        $this->port = "COM3";
    }

    /**
     * Opens a serial connection and sends a command to the Arduino.
     *
     * @param string $status The status to send ("1" or "0").
     * @return string Message indicating the result of the operation.
     * @throws \Exception
     */
    public function openSerialConnection($status)
    {
        // Check if status is correct
        if ($status !== '1' && $status !== '0') {
            throw new \Exception('Invalid status format!');
        }

        // Configure serial port
        $command = "mode {$this->port}: baud={$this->baud} parity=N data=8 stop=1";
        exec($command, $output, $statusCode);

        if ($statusCode !== 0) {
            throw new \Exception("Unable to configure serial port on `$this->port`!");
        }

        // Open serial connection
        $serial = fopen($this->port, "w+");

        if (!$serial) {
            throw new \Exception("Unable to open serial port on `$this->port`!");
        }

        fwrite($serial, $status);

        // Close serial connection
        fclose($serial);

        return "Serial connection has been successfully established on `$this->port` (command has been sent).";
    }
}
