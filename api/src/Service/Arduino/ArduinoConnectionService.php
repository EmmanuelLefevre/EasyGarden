<?php

namespace App\Service\Arduino;

// // Serial
// use PhpSerial\Serial;


class ArduinoConnectionService
{
    // private $serialPort = "/dev/ttyUSB0";
    // private $serialPort = "COM4";
    // private $serialPort;

    // public function __construct(Serial $serialPort)
    // {
    //     $this->serialPort = $serialPort;
    // }

    public function openSerialConnection(bool $status): void
    {
        // Configure and open the serial port
        // Remplacez par votre port USB spécifique
        // $this->serialPort->deviceSet("COM4");
        // // $this->serialPort->deviceSet($this->serialPort);

        // $this->serialPort->confBaudRate(9600);
        // $this->serialPort->confParity("none");
        // $this->serialPort->confCharacterLength(8);
        // $this->serialPort->confStopBits(1);
        // $this->serialPort->confFlowControl("none");

        // $this->serialPort->deviceOpen();

        // // Fermez le port série lorsque vous avez terminé
        // $this->serialPort->deviceClose();



//         // $serial = new PhpSerial();
//         // $serial->deviceSet($this->serialPort);
//         // $serial->confBaudRate(9600);

//         // // Open connection and manage serial connection errors
//         // if (!$serial->deviceOpen()) {
//         //     throw new \Exception('Impossible d\'ouvrir la connexion!');
//         // }

//         // // Send boolean to Arduino
//         // $success = $serial->sendMessage($status ? '1' : '0');
//         // // $success = $serial->sendMessage($connection, $status ? 'true' : 'false');

//         // // Manage sending status errors
//         // if (!$success) {
//         //     throw new \Exception('Échec de l\'envoi des données!');
//         // }

//         // // Close connection
//         // $serial->deviceClose();
    }

}






// namespace App\Service\Arduino;

// // Serial
// use PhpSerial\Serial;
// // Bluetooth
// use phpseclib\Net\Bluetooth;
// use phpseclib\Net\BluetoothException;


// class ArduinoConnectionService
// {
//     private $bluetoothDevice;
//     private $serialDevice;

//     public function __construct(string $bluetoothDevice,
//                                 string $serialDevice)
//     {
//         $this->bluetoothDevice = $bluetoothDevice;
//         $this->serialDevice = $serialDevice;
//     }

//     public function openSerialConnection(bool $status): void
//     {
//         $serial = new PhpSerial();
//         $serial->deviceSet($this->serialDevice);
//         $serial->confBaudRate(9600);

//         // Open connection and manage serial connection errors
//         if (!$serial->deviceOpen()) {
//             throw new \Exception('Impossible d\'ouvrir la connexion!');
//         }

//         // Send boolean to Arduino
//         $success = $serial->sendMessage($status ? '1' : '0');
//         // $success = $serial->sendMessage($connection, $status ? 'true' : 'false');

//         // Manage sending status errors
//         if (!$success) {
//             throw new \Exception('Échec de l\'envoi des données!');
//         }

//         // Close connection
//         $serial->deviceClose();
//     }

//     public function openBluetoothConnection(bool $status): void
//     {
//         try {
//             $bluetooth = new Bluetooth();
//             $connection = $bluetooth->connect($this->bluetoothDevice);

//             if (!$connection) {
//                 throw new \Exception('Impossible de se connecter à l\'Arduino!');
//             }

//             // Send boolean to Arduino
//             $success = $bluetooth->send($connection, $status ? '1' : '0');
//             // $success = $bluetooth->send($connection, $status ? 'true' : 'false');
//             // Manage sending status errors
//             if (!$success) {
//                 throw new \Exception('Échec de l\'envoi des données!');
//             }

//             // Close connection
//             $bluetooth->disconnect($connection);

//         } catch (BluetoothException $e) {
//             // Handle bluetooth library errors
//             throw new \Exception('Erreur Bluetooth : ' . $e->getMessage());
//         } catch (\Exception $e) {
//             // Handle other possible errors
//             throw $e;
//         }
//     }

// }