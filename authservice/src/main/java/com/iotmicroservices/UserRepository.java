package com.iotmicroservices;

import com.iotmicroservices.User;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Integer> {

  Optional<User> findByUsernameAndPassword(String username, String password);

  boolean existsByUsername(String username);

  boolean existsByUsernameAndPassword(String username, String password);

  User save(User user);

}
