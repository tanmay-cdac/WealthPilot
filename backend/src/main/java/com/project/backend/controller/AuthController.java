package com.project.backend.controller;

import java.util.List;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.project.backend.dto.AuthResponse;
import com.project.backend.dto.LoginRequest;
import com.project.backend.dto.RegisterRequest;
import com.project.backend.entity.User;
import com.project.backend.service.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    // REGISTER
    @PostMapping("/register")
    public AuthResponse register(@RequestBody @Valid RegisterRequest request) {
        if (request.getRole().equalsIgnoreCase("ADMIN")) {
            throw new RuntimeException("Admin registration is not allowed. Contact an existing admin.");
        }   
        User user = userService.register(request);
        String token = userService.generateToken(user);
        return new AuthResponse(token, "User registered successfully", user);
    }

    // LOGIN
    @PostMapping("/login")
    public AuthResponse login(@RequestBody @Valid LoginRequest request) {
        User user = userService.login(request);
        String token = userService.generateToken(user);
        return new AuthResponse(token, "Login successful", user);
    }

    // GET USER
    @GetMapping("/users")
    @PreAuthorize("hasRole('ADMIN')")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

}
