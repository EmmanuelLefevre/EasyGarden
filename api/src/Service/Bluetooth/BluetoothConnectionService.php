<?php

namespace App\Service;

use PhpSerial\Serial;
use phpseclib\Net\Bluetooth;
use phpseclib\Net\BluetoothException;


class BluetoothConnectionService
{
    private $bluetoothDevice;

    public function __construct(string $bluetoothDevice)
    {
        $this->bluetoothDevice = $bluetoothDevice;
    }

    public function openBluetoothConnection(bool $data): void
    {
        $serial = new PhpSerial();
        $serial->deviceSet($this->bluetoothDevice);
        $serial->confBaudRate(9600);
        
        // Open connection and manage bluetoth connection errors
        if (!$serial->deviceOpen()) {
            throw new \Exception('Impossible d\'ouvrir la connexion!');
        }

        // Send boolean to Arduino
        $success = $serial->sendMessage($data ? '1' : '0');
        // $success = $bluetooth->send($connection, $data ? 'true' : 'false');

        // Manage sending data errors
        if (!$success) {
            throw new \Exception('Échec de l\'envoi des données!');
        }

        // Close connection
        $serial->deviceClose();
    }

    // public function openBluetoothConnection(bool $data): void
    // {
    //     try {
    //         $bluetooth = new Bluetooth();
    //         $connection = $bluetooth->connect($this->bluetoothDevice);

    //         if (!$connection) {
    //             throw new \Exception('Impossible de se connecter à l\'Arduino!');
    //         }

    //         // Send boolean to Arduino
    //         $success = $bluetooth->send($connection, $data ? '1' : '0');
    //         // $success = $bluetooth->send($connection, $data ? 'true' : 'false');
    //         // Manage sending data errors
    //         if (!$success) {
    //             throw new \Exception('Échec de l\'envoi des données!');
    //         }

    //         // Close connection
    //         $bluetooth->disconnect($connection);

    //     } catch (BluetoothException $e) {
    //         // Handle bluetooth library errors
    //         throw new \Exception('Erreur Bluetooth : ' . $e->getMessage());
    //     } catch (\Exception $e) {
    //         // Handle other possible errors
    //         throw $e;
    //     }
    // }

}
