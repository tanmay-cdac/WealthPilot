package com.project.backend.service;

import java.util.List;
import java.util.Optional;

import com.project.backend.entity.Company;

public interface CompanyService {
    Company save(Company c);
    Optional<Company> findById(Long id);
    List<Company> findAll();
    List<Company> findBySectorName(String sector);
    void delete(Long id);
}
