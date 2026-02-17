package com.project.backend.controller;

import com.project.backend.dto.ChangePasswordDto;
import com.project.backend.dto.UserDto;
import com.project.backend.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }
    
    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('INVESTOR', 'ADVISOR', 'ADMIN')")
    public ResponseEntity<UserDto> getUser(@PathVariable Long id, Authentication authentication) {
        userService.canAccessUserProfile(id, authentication.getName());
        return ResponseEntity.ok(userService.getUserById(id));
    }
    
    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('INVESTOR', 'ADVISOR', 'ADMIN')")
    public ResponseEntity<UserDto> updateUser(@PathVariable Long id, @RequestBody UserDto userDto, Authentication authentication) {
        userService.canAccessUserProfile(id, authentication.getName());

        UserDto updatedUser = userService.updateUser(id, userDto);
        return ResponseEntity.ok(updatedUser);
    }

    @PutMapping("/{id}/password")
    @PreAuthorize("hasAnyRole('INVESTOR', 'ADVISOR', 'ADMIN')")
    public ResponseEntity<String> changePassword(@PathVariable Long id, @RequestBody ChangePasswordDto dto, Authentication authentication) {
        userService.canAccessUserProfile(id, authentication.getName());

        userService.changePassword(id, dto);
        return ResponseEntity.ok("Password updated successfully");
    }

}
