const int ledPin = 5; // Pin to which the LED is connected
int timeDelay = 20;

void setup()
{
  pinMode(ledPin, OUTPUT);  // Initializing LED pin as an output
  Serial.begin(115200);   // Initializing serial connection
}

void loop() {
  // Check if data is available in the serial buffer
  if (Serial.available() > 0) {
    // Read incoming message from serial
    char received = Serial.readStringUntil('\n');

    // If message is '1', turn on the LED
    if (received == '1') {
      digitalWrite(ledPin, HIGH); // Turn on LED by setting pin HIGH
      delay(timeDelay); // Apply time delay
      Serial.println("Eclairage allumé!");
    }

    // If message is '0', turn off the LED
    if (received == '0') {
      digitalWrite(ledPin, LOW); // Turn off LED by setting pin LOW
      delay(timeDelay); // Apply time delay
      Serial.println("Eclairage éteint!");
    }
  }
}
