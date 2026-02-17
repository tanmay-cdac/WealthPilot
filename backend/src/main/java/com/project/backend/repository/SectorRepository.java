package com.project.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.backend.entity.Sector;

public interface SectorRepository extends JpaRepository<Sector, Long> {
    Optional<Sector> findBySectorName(String name);
}
