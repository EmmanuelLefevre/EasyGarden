<?php

namespace App\Service\Arduino;

use lib\PHPSerial\PhpSerial;

class ArduinoConnectionService
{
    private PhpSerial $serial;

    public function __construct()
    {
        $this->serial = new PhpSerial();
        $this->serial->deviceSet("COM4");
    }

    public function openSerialConnection(): void
    {
        try {
            $this->serial->confBaudRate(9600);
            $this->serial->confParity("none");
            $this->serial->confCharacterLength(8);
            $this->serial->confStopBits(1);
            $this->serial->confFlowControl("none");

            $this->serial->deviceOpen();

            // Open connection and manage serial connection errors
            if (!$this->serial->deviceOpen()) {
                throw new \Exception('Impossible d\'ouvrir la connexion serial avec l\'Arduino!');
            }
        }
        finally {
            // Ensures that the serial port is closed even in the event of an exception
            $this->closeSerialConnection();
        }
    }

    public function closeSerialConnection(): void
    {
        // Close serial port if connection is open
        if ($this->serial->deviceIsOpen()) {
            $this->serial->deviceClose();
        }
    }
}
