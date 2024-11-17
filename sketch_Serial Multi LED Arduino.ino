const int ledPin1 = 5;
const int ledPin2 = 6;
const int ledPin3 = 7;
String received = "";
int timeDelay = 20;

void setup()
{
  // Initialize LED pins as outputs
  pinMode(ledPin1, OUTPUT);
  pinMode(ledPin2, OUTPUT);
  pinMode(ledPin3, OUTPUT);

  // Initializing serial connection
  Serial.begin(115200);
}

void loop() {
  // Check if data is available in the serial buffer
  if (Serial.available() > 0) {
    // Read incoming message from serial
    received = Serial.readStringUntil('\n');

    // Parse the received message (Format: id-status, "6-1" or "5-0")
    int separatorIndex = received.indexOf('-');
    if (separatorIndex != -1) {
      String idString = received.substring(0, separatorIndex);
      String statusString = received.substring(separatorIndex + 1);

      int id = idString.toInt();               // Extract ID
      int status = statusString.toInt();       // Extract status (1 or 0)

      // Handle the light equipement based on the ID and status
      handleLight(id, status);
    }
    else {
      sendMessage("Invalid command format!");
    }
  }
}

void handleLight(int id, int status)
{
  int ledPin = -1;

  // Map the ID to the corresponding light pin
  switch (id) {
    case 6:
      ledPin = ledPin1;
      break;
    case 13:
      ledPin = ledPin2;
      break;
    case 28:
      ledPin = ledPin3;
      break;
    default:
      sendMessage("Invalid light id, no equipement found!");
      return;
  }

  // Set the light status (ON or OFF)
  if (status == 1) {
    digitalWrite(ledPin, HIGH);
    delay(timeDelay);
    sendMessage("Eclairage " + String(id) + " allumé!");
  }
  else if (status == 0) {
    digitalWrite(ledPin, LOW);
    delay(timeDelay);
    sendMessage("Eclairage " + String(id) + " éteint!");
  }
  else {
    sendMessage("Invalid status!");
  }
}

void sendMessage(String message) {
  // Send the message to the serial monitor
  Serial.println(message);
}
