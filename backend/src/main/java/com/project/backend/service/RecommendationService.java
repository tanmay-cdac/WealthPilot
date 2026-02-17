package com.project.backend.service;

import java.util.List;

import com.project.backend.entity.Recommendation;

public interface RecommendationService {
    Recommendation save(Recommendation r);
    List<Recommendation> findByRequestId(Long requestId);
}
