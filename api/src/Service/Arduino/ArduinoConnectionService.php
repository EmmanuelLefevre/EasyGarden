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
     * @return string Message  Message from the Arduino.
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

        try {
            // Send command to Arduino
            fwrite($serial, $status);

            // Waiting for the response from the Arduino with a controlled loop
            $attempt = 0;
            $maxAttempts = 10;
            $arduinoResponse = "";

            while ($attempt < $maxAttempts) {
                $arduinoResponse = fgets($serial);

                // If a response is received, we exit the loop
                if ($arduinoResponse !== false) {
                    $arduinoResponse = str_replace(["\r", "\n"], '', $arduinoResponse);
                    break;
                }

                $attempt++;
            }

            // Verify if response was actually received
            if (empty($arduinoResponse || $arduinoResponse === false)) {
                throw new \Exception("No response (or empty one) received from Arduino!");
            }

            $connectionMessage = "Serial connection has been successfully established on `$this->port`.";
            return $connectionMessage . "Arduino response: " . $arduinoResponse;
        }
        // Finally block => ensures that fclose($serial) is always called, even in the event of an exception.
        finally {
            // Close serial connection
            fclose($serial);
        }
    }
}
