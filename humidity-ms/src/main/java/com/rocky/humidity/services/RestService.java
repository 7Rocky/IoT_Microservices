package com.rocky.humidity.services;

import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class RestService {
  private final RestTemplate restTemplate;

  public RestService(RestTemplateBuilder restTemplateBuilder) {
    this.restTemplate = restTemplateBuilder.build();
  }

  public String getAnalogInputs() {
    String arduinoIp = System.getenv("ARDUINO") != null ? System.getenv("ARDUINO") : "192.168.1.50";
    return this.restTemplate.getForObject("http://" + arduinoIp, String.class);
  }
}
