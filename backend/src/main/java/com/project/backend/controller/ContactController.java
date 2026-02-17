package com.project.backend.controller;

import java.util.List;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.project.backend.entity.ContactDetails;
import com.project.backend.repository.ContactDetailsRepository;

@RestController
@RequestMapping("/api/contact")
public class ContactController {
    
    private final ContactDetailsRepository repository;
    
    public ContactController(ContactDetailsRepository repository) {
        this.repository = repository;
    }
    
    @PostMapping
    public ContactDetails submit(@RequestBody ContactDetails contact) {
        return repository.save(contact);
    }
    
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<ContactDetails> getAll() {
        return repository.findAll();
    }
}
