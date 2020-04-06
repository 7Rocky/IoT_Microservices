package com.rocky.authservice.controllers;

import com.rocky.authservice.models.User;
import com.rocky.authservice.repositories.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(path="/")
public class UserController {

  @Autowired
  private UserRepository userRepository;

  @PostMapping(path="/login")
  public @ResponseBody boolean getUser(
    @RequestParam String username,
    @RequestParam String password
  ) {

    return userRepository.existsByUsernameAndPassword(username, password);
  }

  @PostMapping(path="/register")
  public @ResponseBody User addNewUser(
    @RequestParam String username,
    @RequestParam String password
  ) {

    if (userRepository.existsByUsername(username)) {
      return null;
    }

    return userRepository.save(new User(username, password));
  }

}
