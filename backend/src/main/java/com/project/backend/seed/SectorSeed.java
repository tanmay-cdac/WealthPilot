package com.project.backend.seed;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import com.project.backend.entity.Sector;
import com.project.backend.repository.SectorRepository;

@Component
public class SectorSeed implements CommandLineRunner {
    private final SectorRepository sectorRepository;

    public SectorSeed(SectorRepository sectorRepository) {
        this.sectorRepository = sectorRepository;
    }

    @Override
    public void run(String... args) {
        if (sectorRepository.count() == 0) {
            sectorRepository.save(new Sector(null, "Technology"));
            sectorRepository.save(new Sector(null, "Healthcare"));
            sectorRepository.save(new Sector(null, "Finance"));
            sectorRepository.save(new Sector(null, "Energy"));
            sectorRepository.save(new Sector(null, "Real Estate"));
            sectorRepository.save(new Sector(null, "Consumer Goods"));
            System.out.println("Sectors seeded successfully");
        }
    }
}
