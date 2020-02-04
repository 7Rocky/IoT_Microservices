#include <SPI.h>
#include <WiFiNINA.h>

#include "main.h" // Add data to main-template.h and change its name to main.h

int status = WL_IDLE_STATUS;

WiFiServer server(PORT);

void setup() {
  int ip_address[4];

  getIpNumbers(IP_ADDRESS, ip_address);
  IPAddress ip(ip_address[0], ip_address[1], ip_address[2], ip_address[3]);

  Serial.begin(9600);
  while (!Serial);

  if (WiFi.status() == WL_NO_MODULE) {
    Serial.println("Communication with WiFi module failed!");
    while (true);
  }

  String fv = WiFi.firmwareVersion();

  if (fv < "1.0.0") {
    Serial.println("Please upgrade the firmware");
  }

  WiFi.config(ip);

  while (status != WL_CONNECTED) {
    Serial.print("Attempting to connect to SSID: ");
    Serial.println(WIFI_SSID);

    status = WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

    delay(10000);
  }

  server.begin();

  printWifiStatus();
}

void loop() {
  WiFiClient client = server.available();

  if (client) {
    Serial.println("New client");

    boolean currentLineIsBlank = true;

    while (client.connected()) {
      if (client.available()) {
        char c = client.read();
        Serial.write(c);

        if (c == '\n' && currentLineIsBlank) {
          client.println("HTTP/1.1 200 OK");
          client.println("Content-Type: application/json");
          client.println("Connection: close");
          client.println("Access-Control-Allow-Origin: *\n");

          client.print("{\"analogInputs\":[");

          for (int analogChannel = 0; analogChannel < 6; analogChannel++) {
            int sensorReading = analogRead(analogChannel);

            if (analogChannel != 0) {
              client.print(",");
            }
            
            client.print(sensorReading);
          }

          client.println("]}");
          break;
        }

        currentLineIsBlank = c == '\n' ? true : c != '\r' ? false : currentLineIsBlank;
      }
    }

    delay(1);

    client.stop();
    Serial.println("client disonnected");
  }
}

void getIpNumbers(char* ip, int* numbers) {
  char* octet = strtok(ip, ".");

  while (octet != NULL) {
    *numbers = atoi(octet);
    octet = strtok(NULL, ".");
    numbers++;
  }
}

void printWifiStatus() {
  Serial.print("SSID: ");
  Serial.println(WiFi.SSID());

  Serial.print("IP Address: ");
  Serial.println(WiFi.localIP());

  Serial.print("Signal strength (RSSI): ");
  Serial.print(WiFi.RSSI());
  Serial.println(" dBm");
}
