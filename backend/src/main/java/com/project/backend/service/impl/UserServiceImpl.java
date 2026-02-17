package com.project.backend.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.project.backend.dto.UserDto;
import com.project.backend.dto.ChangePasswordDto;
import com.project.backend.dto.LoginRequest;
import com.project.backend.dto.RegisterRequest;
import com.project.backend.entity.Role;
import com.project.backend.entity.User;
import com.project.backend.repository.RoleRepository;
import com.project.backend.repository.UserRepository;
import com.project.backend.security.JwtService;
import com.project.backend.service.UserService;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepo;
    private final RoleRepository roleRepo;
    private final JwtService jwtService;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public UserServiceImpl(UserRepository userRepo, RoleRepository roleRepo, JwtService jwtService) {
        this.userRepo = userRepo;
        this.roleRepo = roleRepo;
        this.jwtService = jwtService;
    }

    @Override
    public User register(RegisterRequest req) {

        if (userRepo.findByEmail(req.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        Role role = roleRepo.findByName(req.getRole().toUpperCase())
                .orElseThrow(() -> new RuntimeException("Invalid role"));

        User user = new User();
        user.setFullName(req.getFullName());
        user.setEmail(req.getEmail());
        user.setPassword(passwordEncoder.encode(req.getPassword()));
        user.setRole(role);

        return userRepo.save(user);
    }

    @Override
    public User login(LoginRequest req) {

        User user = userRepo.findByEmail(req.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        if (!passwordEncoder.matches(req.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        return user;
    }

    @Override
    public String generateToken(User user) {
        return jwtService.generateToken(user.getEmail(), user.getRole().getName());
    }
    @Override
    public List<User> getAllUsers() {
        return userRepo.findAll();
    }


    @Override
    public User createUser(User user, String roleName) {

        Role role = roleRepo.findByName(roleName)
                .orElseThrow(() -> new RuntimeException("Role not found"));

        user.setRole(role);
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        return userRepo.save(user);
    }

    @Override
    public Optional<User> findById(Long id) {
        return userRepo.findById(id);
    }

    // Convert User to DTO
    private UserDto toDto(User user) {
        return new UserDto(
                user.getUserId(),
                user.getFullName(),
                user.getEmail()
        );
    }

    @Override
    public UserDto getUserById(Long id) {
        User user = userRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return toDto(user);
    }

    @Override
    public UserDto updateUser(Long id, UserDto dto) {
        User user = userRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setFullName(dto.getFullName());

        return toDto(userRepo.save(user));
    }

    @Override
    public Optional<User> findByEmail(String name) {
        return userRepo.findByEmail(name);
    }

    @Override
    public void changePassword(Long id, ChangePasswordDto dto) {
        User user = userRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setPassword(passwordEncoder.encode(dto.getNewPassword()));
        userRepo.save(user);
    }

    public void canAccessUserProfile(Long id, String loggedEmail) {
        User user = userRepo.findById(id).orElseThrow(() -> new RuntimeException("User not found"));

        if (!user.getEmail().equals(loggedEmail) &&
            !SecurityContextHolder.getContext().getAuthentication().getAuthorities()
                .stream().anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"))) {
            throw new AccessDeniedException("You cannot access this profile!");
        }
   }

}
