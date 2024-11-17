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
    // Find the position of the delimiter '-'
    int delimiterIndex = received.indexOf('-');

    // Check command format
    if (delimiterIndex == -1) {
      sendMessage("Invalid command format! Expected format: id-status");
      return;
    }

    String idString = received.substring(0, delimiterIndex);           // Extract ID
    String statusString = received.substring(delimiterIndex + 1);      // Extract status (1 or 0)

    int id = idString.toInt();               // Convert ID to integer
    int status = statusString.toInt();       // Convert status to integer

    // Validate if the ID and status are correctly parsed
    if (id == 0) {
      sendMessage("Invalid id received! Id should be a positive integer.");
      return;
    }
    if (status != 0 && status != 1) {
      sendMessage("Invalid status received! Status should be 0 or 1.");
      return;
    }

    // Handle the light equipement based on the ID and status
    handleLight(id, status);
  }
}

void handleLight(int id, int status)
{
  // Initialize ledPin to -1 => indicate that no LED is selected yet
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
      sendMessage("Light id mismatch. Command ignored!");
      return;
  }

  // Set the light status (ON or OFF)
  if (status == 1) {
    digitalWrite(ledPin, HIGH);      // Turn ON light by setting pin HIGH
    delay(timeDelay);                // Apply time delay

    sendMessage("Eclairage " + String(id) + " allumé!");
  }
  else if (status == 0) {
    digitalWrite(ledPin, LOW);       // Turn OFF light by setting pin LOW
    delay(timeDelay);                // Apply time delay

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
