package com.project.backend.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.backend.entity.Recommendation;
import com.project.backend.service.RecommendationService;
import com.project.backend.repository.RecommendationRepository;

@Service
@Transactional
public class RecommendationServiceImpl implements RecommendationService {
    private final RecommendationRepository repo;

    public RecommendationServiceImpl(RecommendationRepository repo) {
        this.repo = repo;
    }

    @Override
    public Recommendation save(Recommendation r) {
        return repo.save(r);
    }

    @Override
    public List<Recommendation> findByRequestId(Long requestId) {
        return repo.findByRequest_RequestId(requestId);
    }
}
