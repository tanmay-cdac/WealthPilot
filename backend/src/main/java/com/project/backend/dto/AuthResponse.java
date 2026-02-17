package com.project.backend.dto;

import com.project.backend.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter 
@Setter
@AllArgsConstructor
public class AuthResponse {
    private String token;
    private String message;
    private User user;
}
