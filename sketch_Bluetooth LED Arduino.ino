// Setting relay
const int relay = 1;
// Variable to keeps track of the bluetooth connection status
bool bluetoothActif = true;
// Variable used to store incoming message
String incomingMessage;
// Time delay
const int timeDelay = 500;

// Initializing Arduino
void setup() {
  // Initializing relay as an output
  pinMode(relay, OUTPUT);
  // Initializing serial connection
  Serial.begin(9600);
}

void loop() {
  // Check if bluetooth connection is active
  if (bluetoothActif) {
    // Presence of an incoming message
    if (Serial.available() > 0 ) {
      // Read incoming message
      incomingMessage=Serial.readString();
      if(incomingMessage=="1"){
        // Turn on LED by turning on relay
        digitalWrite(relay, HIGH);
        // Apply time delay
        delay(timeDelay);
        // Send message
        sendMessage("L'éclairage a été allumé.");
        // Close bluetooth connection
        closeBluetoothConnection();
      }
      if(incomingMessage=="0"){
        // Turn off LED by turning off relay
        digitalWrite(relay, LOW);
        // Apply time delay
        delay(timeDelay);
        // Send message
        sendMessage("L'éclairage a été éteint.");
        // Close bluetooth connection
        closeBluetoothConnection();
      }
    }
  }
}

// Function to close bluetooth connection
void closeBluetoothConnection() {
  // Close bluetooth connection
  Serial.end();
  // After closing bluetooth connection, set this variable to "false".
  bluetoothActif = false;
}

// Function to send message via bluetooth
void sendMessage(String messageToSend) {
  Serial.println(messageToSend);
}
