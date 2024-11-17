const int ledPin = 5;           // Pin to which the LED is connected
String received = "";           // Variable to store received value
int timeDelay = 20;

void setup()
{
  pinMode(ledPin, OUTPUT);            // Initializing LED pin as an output
  Serial.begin(115200);               // Initializing serial connection
}

void loop() {
  // Check if data is available in the serial buffer
  if (Serial.available() > 0) {
    // Read incoming message from serial
    received = Serial.readStringUntil('\n');

    if (received == "1") {
      digitalWrite(ledPin, HIGH);           // Turn on LED by setting pin HIGH
      delay(timeDelay);                    // Apply time delay
      sendMessage("Eclairage allumé!");
    }

    if (received == "0") {
      digitalWrite(ledPin, LOW);           // Turn off LED by setting pin LOW
      delay(timeDelay);                    // Apply time delay
      sendMessage("Eclairage éteint!");
    }
  }
}

void sendMessage(String message) {
  // Send the message to the serial monitor
  Serial.println(message);
}
