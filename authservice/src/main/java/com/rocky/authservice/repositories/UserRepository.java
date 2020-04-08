package com.rocky.authservice.repositories;

import com.rocky.authservice.models.User;

import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Integer> {

  boolean existsByUsername(String username);

  boolean existsByUsernameAndPassword(String username, String password);

  <S extends User> S save(S user);

}
