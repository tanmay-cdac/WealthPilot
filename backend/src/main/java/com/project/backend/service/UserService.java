package com.project.backend.service;

import java.util.List;
import java.util.Optional;

import com.project.backend.dto.ChangePasswordDto;
import com.project.backend.dto.LoginRequest;
import com.project.backend.dto.RegisterRequest;
import com.project.backend.dto.UserDto;
import com.project.backend.entity.User;

public interface UserService {
    User register(RegisterRequest request);
    User login(LoginRequest request);
    String generateToken(User user);
    User createUser(User u, String role);
    Optional<User> findById(Long id);
    List<User> getAllUsers();

    UserDto getUserById(Long id);
    UserDto updateUser(Long id, UserDto dto);
    Optional<User> findByEmail(String name);

    void changePassword(Long id, ChangePasswordDto dto);
    void canAccessUserProfile(Long id, String loggedEmail); 
}
