package com.project.backend.controller;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.backend.entity.Company;
import com.project.backend.entity.User;
import com.project.backend.service.CompanyService;
import com.project.backend.service.UserService;

@RestController
@RequestMapping("/api/companies")
public class CompanyController {
    private final CompanyService service;
    private final UserService userService;
    
    public CompanyController(CompanyService service, UserService userService) { 
        this.service = service;
        this.userService = userService;
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public Company create(@RequestBody Company company, Principal principal) {
        User currentUser = userService.findByEmail(principal.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));
        company.setCreatedBy(currentUser);
        company.setCreatedAt(LocalDateTime.now());
        return service.save(company);
    }
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public Company update(@PathVariable Long id, @RequestBody Company updatedCompany) {
        return service.findById(id).map(company -> {
            company.setName(updatedCompany.getName());
            company.setDescription(updatedCompany.getDescription());
            company.setRiskLevel(updatedCompany.getRiskLevel());
            company.setMarketCap(updatedCompany.getMarketCap());
            company.setSector(updatedCompany.getSector());
            return service.save(company);
        }).orElseThrow(() -> new RuntimeException("Company not found"));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN','INVESTOR','ADVISOR')")
    public List<Company> list(@RequestParam(required = false) String sector) {
        if (sector != null) {
            return service.findBySectorName(sector);
        }
        return service.findAll();
    }

    @GetMapping("/{id}")
    public Company get(@PathVariable Long id) { 
        return service.findById(id).orElse(null); 
    }
}
