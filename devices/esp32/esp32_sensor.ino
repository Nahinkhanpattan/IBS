#include <WiFi.h>
#include <HTTPClient.h>

const char* ssid = "Wokwi-GUEST";
const char* password = "";

const char* serverUrl = "http://localhost:4000/api/access/request"; // Note: localhost won't work on real ESP32, needs IP. For Wokwi via Gateway it might vary.
const char* deviceAddress = "0x1234567890123456789012345678901234567890"; // Hardcoded for demo
const char* resource = "temperature_data";

void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }
  Serial.println("Connected to WiFi");
}

void loop() {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    http.begin(serverUrl);
    http.addHeader("Content-Type", "application/json");

    String requestBody = "{\"deviceAddress\":\"" + String(deviceAddress) + "\", \"resource\":\"" + String(resource) + "\"}";
    
    int httpResponseCode = http.POST(requestBody);

    if (httpResponseCode > 0) {
      String response = http.getString();
      Serial.println(httpResponseCode);
      Serial.println(response);
    } else {
      Serial.print("Error on sending POST: ");
      Serial.println(httpResponseCode);
    }

    http.end();
  } else {
    Serial.println("WiFi Disconnected");
  }
  delay(5000);
}
