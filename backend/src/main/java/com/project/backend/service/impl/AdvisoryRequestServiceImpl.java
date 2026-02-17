package com.project.backend.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.backend.dto.AdvisoryRequestDto;
import com.project.backend.entity.AdvisoryRequest;
import com.project.backend.entity.User;
import com.project.backend.repository.AdvisoryRequestRepository;
import com.project.backend.repository.UserRepository;
import com.project.backend.service.AdvisoryRequestService;

@Service
@Transactional
public class AdvisoryRequestServiceImpl implements AdvisoryRequestService {

    private final AdvisoryRequestRepository repo;
    private final UserRepository userRepo;

    public AdvisoryRequestServiceImpl(AdvisoryRequestRepository repo, UserRepository userRepo) {
        this.repo = repo;
        this.userRepo = userRepo;
    }

    @Override
    public AdvisoryRequest create(AdvisoryRequest r) {
        System.out.println("Saving request with advisor: " + (r.getAdvisorId() != null ? r.getAdvisorId().getFullName() : "null"));
        System.out.println("Status: " + r.getStatus());
        return repo.save(r);
    }

    @Override
    public AdvisoryRequest create(AdvisoryRequestDto dto, Long investorId) {

        User investor = userRepo.findById(investorId)
                .orElseThrow(() -> new RuntimeException("Investor not found"));

        AdvisoryRequest req = new AdvisoryRequest();
        req.setInvestorId(investor);
        req.setAdvisorId(null);
        req.setInvestmentAmount(dto.getInvestmentAmount());
        req.setRiskPreference(dto.getRiskPreference());
        req.setSectorPreference(dto.getSectorPreference());
        req.setDescription(dto.getDescription());
        req.setStatus("OPEN");

        return repo.save(req);
    }

    @Override
    public Optional<AdvisoryRequest> findById(Long id) {
        return repo.findById(id);
    }

    @Override
    public List<AdvisoryRequest> findByAdvisor(User advisor) {
        return repo.findByAdvisorId(advisor);
    }

    @Override
    public List<AdvisoryRequest> findByInvestor(User investor) {
        return repo.findByInvestorId(investor);
    }

    @Override
    public List<AdvisoryRequest> findAll() {
        return repo.findAll();
    }

}
