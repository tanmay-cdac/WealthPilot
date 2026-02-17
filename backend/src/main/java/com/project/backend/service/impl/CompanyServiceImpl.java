package com.project.backend.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.backend.entity.Company;
import com.project.backend.repository.CompanyRepository;
import com.project.backend.repository.SectorRepository;
import com.project.backend.service.CompanyService;

@Service
@Transactional
public class CompanyServiceImpl implements CompanyService {
    private final CompanyRepository companyRepo;
    private final SectorRepository sectorRepo;

    public CompanyServiceImpl(CompanyRepository companyRepo, SectorRepository sectorRepo) {
        this.companyRepo = companyRepo;
        this.sectorRepo = sectorRepo;
    }

    @Override
    public Company save(Company c) {
        if (c.getSector() != null) {
            if (c.getSector().getSectorId() != null) {
            } else {
                c.setSector(
                    sectorRepo.findBySectorName(c.getSector().getSectorName())
                            .orElseGet(() -> sectorRepo.save(c.getSector()))
                );
            }
        }
        return companyRepo.save(c);
    }


    @Override
    public Optional<Company> findById(Long id) {
        return companyRepo.findById(id);
    }

    @Override
    public List<Company> findAll() {
        return companyRepo.findAll();
    }

    @Override
    public List<Company> findBySectorName(String sector) {
        return companyRepo.findBySector_SectorName(sector);
    }

    @Override
    public void delete(Long id) {
        companyRepo.deleteById(id);
    }
}
