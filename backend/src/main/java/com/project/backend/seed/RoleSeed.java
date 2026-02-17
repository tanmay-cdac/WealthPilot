package com.project.backend.seed;

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import com.project.backend.entity.Role;
import com.project.backend.entity.User;
import com.project.backend.repository.RoleRepository;
import com.project.backend.repository.UserRepository;

@Component
public class RoleSeed implements CommandLineRunner {

    private final RoleRepository roleRepo;
    private final UserRepository userRepo;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public RoleSeed(RoleRepository roleRepo, UserRepository userRepo) {
        this.roleRepo = roleRepo;
        this.userRepo = userRepo;
    }

    @Override
    public void run(String... args) throws Exception {

        // Seed roles
        Role adminRole = roleRepo.findByName("ADMIN").orElseGet(() -> roleRepo.save(new Role(null, "ADMIN")));

        if (roleRepo.findByName("INVESTOR").isEmpty()) roleRepo.save(new Role(null, "INVESTOR"));
        if (roleRepo.findByName("ADVISOR").isEmpty()) roleRepo.save(new Role(null, "ADVISOR"));

        // Seed admin users
        if (userRepo.findByEmail("admin1@advisory.com").isEmpty()) {
            User admin1 = new User();
            admin1.setFullName("Admin One");
            admin1.setEmail("admin1@advisory.com");
            admin1.setPassword(passwordEncoder.encode("Admin@123")); // Default password
            admin1.setRole(adminRole);
            userRepo.save(admin1);
        }

        if (userRepo.findByEmail("admin2@advisory.com").isEmpty()) {
            User admin2 = new User();
            admin2.setFullName("Admin Two");
            admin2.setEmail("admin2@advisory.com");
            admin2.setPassword(passwordEncoder.encode("Admin@123")); // Default password
            admin2.setRole(adminRole);
            userRepo.save(admin2);
        }

        System.out.println("Roles and Admin users seeded successfully!");
    }
}

