#include <SPI.h>
#include <WiFiNINA.h>

#include "main-template.h" // Add data to main-template.h and change its name to main.h

const int NUM_ENDPOINTS = 2;
const String MEASURES[] = { "temperature", "humidity" };
const int MEASURE_PINS[] = { 0, 1 };

WiFiServer server(PORT);

void setup() {
  int wifiStatus = WL_IDLE_STATUS, ip_address[4];

  setIp(IP_ADDRESS, ip_address);
  IPAddress ip(ip_address[0], ip_address[1], ip_address[2], ip_address[3]);

  Serial.begin(9600);
  while (!Serial);

  if (WiFi.status() == WL_NO_MODULE) {
    Serial.println("Communication with WiFi module failed!");
    while (true);
  }

  String firmware = WiFi.firmwareVersion();
  if (firmware < "1.0.0") Serial.println("Please upgrade the firmware");

  WiFi.config(ip);

  while (wifiStatus != WL_CONNECTED) {
    wifiStatus = WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
    delay(5000);
  }

  server.begin();
}

void loop() {
  WiFiClient client = server.available();

  if (client) {
    int analogInputPin = -1, measureIndex;
    String currentLine = "";

    while (client.connected()) {
      if (client.available()) {
        char c = client.read();

        if (c == '\n') {
          if (currentLine.length() == 0) {
            sendResponse(client, analogInputPin, MEASURES[measureIndex]);
            break;
          } else {
            handleRequest(currentLine, &analogInputPin, &measureIndex);
            currentLine = "";
          }
        } else if (c != '\r') {
          currentLine += c;
        }
      }
    }

    delay(1);
    client.stop();
  }
}

void handleRequest(String line, int* ppin, int* pindex) {
  for (int i = 0; i < NUM_ENDPOINTS; i++) {
    if (line.equals("GET /" + MEASURES[i] + " HTTP/1.1")) {
      *ppin = MEASURE_PINS[i];
      *pindex = i;
      break;
    }
  }
}

void sendResponse(WiFiClient client, int pin, String measure) {
  if (pin == -1) printHttpError(client);
  else printHttpResponse(client, analogRead(pin), measure);
}

void printHttpHeaders(WiFiClient client, int httpStatus) {
  if (httpStatus == 200) client.println("HTTP/1.1 200 OK");
  if (httpStatus == 404) client.println("HTTP/1.1 404 Not Found");

  client.println("Content-Type: application/json");
  client.println("Connection: keep-alive");
  client.println("Access-Control-Allow-Origin: *\n");
}

void printHttpError(WiFiClient client) {
  printHttpHeaders(client, 404);
  client.println("{\"error\":404,\"message\":\"Not Found\"}");
}

void printHttpResponse(WiFiClient client, int value, String measure) {
  printHttpHeaders(client, 200);
  client.print("{\"" + measure + "\":" + value + "}");
}

void setIp(char* ip, int* numbers) {
  char* octet = strtok(ip, ".");

  while (octet != NULL) {
    *numbers = atoi(octet);
    octet = strtok(NULL, ".");
    numbers++;
  }
}
