package com.iotmicroservices;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(path="/demo")
public class MainController {

  @Autowired
  private UserRepository userRepository;

  @PostMapping(path="/add")
  public @ResponseBody User addNewUser(
    @RequestParam String username,
    @RequestParam String password
  ) {

    if (userRepository.existsByUsername(username)) {
      return null;
    }

    return userRepository.save(new User(username, password));
  }

  @GetMapping(path="/get")
  public @ResponseBody boolean getUser(
    @RequestParam String username,
    @RequestParam String password
  ) {

    return userRepository.existsByUsernameAndPassword(username, password);
  }

}
