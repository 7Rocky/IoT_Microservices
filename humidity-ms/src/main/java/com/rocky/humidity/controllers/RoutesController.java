package com.rocky.humidity.controllers;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.web.bind.annotation.RequestMapping;

import com.rocky.humidity.services.RestService;

@RestController
public class RoutesController {
  private final RestService restService;

  public RoutesController(RestTemplateBuilder restTemplateBuilder) {
    this.restService = new RestService(restTemplateBuilder);
  }

  @RequestMapping("/")
  public String index() {
    return restService.getAnalogInputs();
  }
}
