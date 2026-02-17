package com.project.backend.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.backend.entity.Sector;
import com.project.backend.repository.SectorRepository;
import com.project.backend.service.SectorService;

@Service
@Transactional
public class SectorServiceImpl implements SectorService {

    private final SectorRepository repo;

    public SectorServiceImpl(SectorRepository repo) {
        this.repo = repo;
    }

    @Override
    public Sector save(Sector sector) {
        // Optional: Check if sector with same name exists
        return repo.save(sector);
    }

    @Override
    public Optional<Sector> findById(Long id) {
        return repo.findById(id);
    }

    @Override
    public Optional<Sector> findByName(String name) {
        return repo.findBySectorName(name);
    }

    @Override
    public List<Sector> findAll() {
        return repo.findAll();
    }

    @Override
    public void delete(Long id) {
        repo.deleteById(id);
    }
}
