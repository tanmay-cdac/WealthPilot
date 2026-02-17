package com.project.backend.service;

import java.util.List;
import java.util.Optional;

import com.project.backend.entity.Sector;

public interface SectorService {
    Sector save(Sector sector);              // Create or update
    Optional<Sector> findById(Long id);      // Find by ID
    Optional<Sector> findByName(String name);// Find by name
    List<Sector> findAll();
    void delete(Long id);
}
