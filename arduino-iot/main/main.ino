#include <SPI.h>
#include <WiFiNINA.h>

#include "main-template.h" // Add data to main-template.h and change its name to main.h

#define TEMPERATURE_PIN 0
#define HUMIDITY_PIN 1

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
    int analogInputPin = -1;
    String analogInputName = "";
    String currentLine = "";

    while (client.connected()) {
      if (client.available()) {
        char c = client.read();

        if (c == '\n') {
          if (currentLine.length() == 0) {
            if (analogInputPin == -1) {
              printHttpError(client, 404);
            } else {
              printHttpHeaders(client, 200);
              printHttpResponse(client, analogInputPin, analogInputName);
            }

            break;
          } else {
            if (currentLine.equals("GET /temperature HTTP/1.1")) {
              analogInputPin = TEMPERATURE_PIN;
              analogInputName = "temperature";
              Serial.println("Temperature endpoint requested");
            } else if (currentLine.equals("GET /humidity HTTP/1.1")) {
              analogInputPin = HUMIDITY_PIN;
              analogInputName = "humidity";
              Serial.println("Humidity endpoint requested");
            }

            Serial.println(currentLine);
            currentLine = "";
          }
        } else if (c != '\r') {
          currentLine += c;
        }
      }
    }

    delay(1);
    client.stop();
    Serial.println("client disonnected");
  }
}

void printHttpHeaders(WiFiClient client, int status) {
  switch (status) {
    case 200:
      client.println("HTTP/1.1 200 OK");
      break;
    default:
      client.println("HTTP/1.1 404 Not Found");
      break;
  }

  client.println("Content-Tupe: application/json");
  client.println("Connection: keep-alive");
  client.println("Access-Control-Allow-Origin: *\n");
}

void printHttpError(WiFiClient client, int status) {
  printHttpHeaders(client, 404);
  client.println("{\"error\":404,\"message\":\"Not Found\"}");
}

void printHttpResponse(WiFiClient client, int pin, String name) {
  client.print("{\"");
  client.print(name);
  client.print("\":");
  client.print(analogRead(pin));
  client.println("}\n");
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
