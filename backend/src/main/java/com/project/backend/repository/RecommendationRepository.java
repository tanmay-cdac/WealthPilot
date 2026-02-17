package com.project.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.backend.entity.Recommendation;

public interface RecommendationRepository extends JpaRepository<Recommendation, Long> {
    List<Recommendation> findByRequest_RequestId(Long requestId);
}
