const int ledPin = 5; // Pin to which the LED is connected
String incomingMessage = ""; // Variable to store incoming message
int timeDelay = 20;

void setup()
{
  pinMode(ledPin, OUTPUT);  // Initializing LED pin as an output
  Serial.begin(19200);   // Initializing serial connection on  9600 port
}

void loop() {
  // Check if data is available in the serial buffer
  if (Serial.available() > 0) {
    // Read incoming message from serial
    incomingMessage = Serial.readString();

    // If the message is "1", turn on the LED
    if (incomingMessage == "1") {
      digitalWrite(ledPin, HIGH); // Turn on LED by setting pin HIGH
      delay(timeDelay); // Apply time delay
      sendMessage("Eclairage allumé!");
    }

    // If the message is "0", turn off the LED
    if (incomingMessage == "0") {
      digitalWrite(ledPin, LOW); // Turn off LED by setting pin LOW
      delay(timeDelay); // Apply time delay
      sendMessage("Eclairage éteint!");
    }
  }
}

void sendMessage(String message) {
  Serial.println(message); // Send the message to the serial monitor
}
