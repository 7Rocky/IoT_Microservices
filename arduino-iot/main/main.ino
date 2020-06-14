#include <SPI.h>
#include <WiFiNINA.h>

#include "main-template.h" // Add data to main-template.h and change its name to main.h

const int NUM_ENDPOINTS = 3;
const String MEASURES[] = { "temperature", "humidity", "light" };
const int PINS[] = { 0, 1, LED_BUILTIN };
const String LIGHT_STATUS[] = { "on", "off" };
const int LED_STATUS[] = { HIGH, LOW };

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
    int measureIndex = -1;
    String currentLine = "";

    while (client.connected()) {
      if (client.available()) {
        char c = client.read();

        if (c == '\n') {
          if (currentLine.length() == 0) {
            sendResponse(client, measureIndex);
            break;
          } else {
            boolean matched = handleGetRequest(currentLine, &measureIndex);
            if (!matched) handlePostRequest(currentLine, &measureIndex);
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

void handlePostRequest(String line, int* pindex) {
  for (int i = 0; i < 2; i++) {
    if (line.equals("POST /light/" + LIGHT_STATUS[i] + " HTTP/1.1")) {
      digitalWrite(PINS[2], LED_STATUS[i]);
      *pindex = 2;
      break;
    }
  }
}

boolean handleGetRequest(String line, int* pindex) {
  for (int i = 0; i < NUM_ENDPOINTS; i++) {
    if (line.equals("GET /" + MEASURES[i] + " HTTP/1.1")) {
      *pindex = i;
      break;
    }
  }

  return *pindex != -1;
}

void sendResponse(WiFiClient client, int index) {
  if (index == -1) printHttpError(client);
  else if (index == 2) printHttpResponse(client, digitalRead(PINS[index]), MEASURES[index]);
  else printHttpResponse(client, analogRead(PINS[index]), MEASURES[index]);
}

void printHttpHeaders(WiFiClient client, int httpStatus) {
  if (httpStatus == 200) client.println("HTTP/1.1 200 OK");
  if (httpStatus == 404) client.println("HTTP/1.1 404 Not Found");

  client.println("Access-Control-Allow-Origin: *");
  client.println("Connection: keep-alive");
  client.println("Content-Type: application/json\n");
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
