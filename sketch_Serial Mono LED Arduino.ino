const int ledPin = 5;       // Pin to which the LED is connected
const int lightId = 6;      // ID associated with this Arduino's light
String received = "";       // Variable to store received value
int timeDelay = 20;

void setup()
{
  pinMode(ledPin, OUTPUT);      // Initializing LED pin as an output
  Serial.begin(115200);         // Initializing serial connection
}

void loop() {
  // Check if data is available in the serial buffer
  if (Serial.available() > 0) {
    // Read incoming message from serial
    received = Serial.readStringUntil('\n');
    processCommand(received);
  }
}

void processCommand(String message) {
  // Parse the received message (Format: id-status, "6-1" or "6-0")
  // Find the position of the delimiter '-'
  int delimiterIndex = message.indexOf('-');

  // Check command format
  if (delimiterIndex == -1) {
    sendMessage("Invalid command format! Expected format: id-status");
    return;
  }

  String idString = message.substring(0, delimiterIndex);           // Extract ID
  String statusString = message.substring(delimiterIndex + 1);      // Extract status (1 or 0)

  int id = idString.toInt();                // Convert ID to integer
  int status = statusString.toInt();        // Convert status to integer

  // Validate if the ID and status are correctly parsed
  if (id == 0) {
    sendMessage("Invalid id received! Id should be a positive integer.");
    return;
  }
  if (status != 0 && status != 1) {
    sendMessage("Invalid status received! Status should be 0 or 1.");
    return;
  }

  // Check if the ID matches this Arduino's light
  if (id == lightId) {
    if (status == 1) {
      digitalWrite(ledPin, HIGH);      // Turn ON light by setting pin HIGH
      delay(timeDelay);                // Apply time delay

      sendMessage("Eclairage " + String(idString) + " allumé!");
    }
    else if (status == 0) {
      digitalWrite(ledPin, LOW);       // Turn OFF light by setting pin LOW
      delay(timeDelay);                // Apply time delay

      sendMessage("Eclairage " + String(idString) + " éteint!");
    }
  }
  else {
    sendMessage("Light id mismatch. Command ignored!");
  }
}

void sendMessage(String message) {
  // Send the message to the serial monitor
  Serial.println(message);
}
