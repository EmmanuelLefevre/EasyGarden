<?php

namespace App\Service\Arduino;

use lib\PHPSerial\PhpSerial;

class ArduinoConnectionService
{
    private PhpSerial $serial;
    private string $device;

    public function __construct()
    {
        $this->serial = new PhpSerial();
        $this->device = "COM3";
        $this->serial->deviceSet($this->device);
    }

    public function openSerialConnection(): void
    {
        try {
            $this->serial->confBaudRate(9600);
            $this->serial->confParity("none");
            $this->serial->confCharacterLength(8);
            $this->serial->confStopBits(1);
            $this->serial->confFlowControl("none");

            // Open connection and manage serial connection errors
            if (!$this->serial->deviceOpen()) {
                throw new \Exception('Impossible d\'ouvrir la connexion serial avec l\'Arduino!');
            }

            echo "Connexion série sur `$this->device` ouverte avec succès!";
        }
        catch (\Exception $e) {
            echo "Erreur : " . $e->getMessage();
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
