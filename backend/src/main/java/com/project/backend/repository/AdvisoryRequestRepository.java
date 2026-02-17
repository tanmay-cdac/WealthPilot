package com.project.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.backend.entity.AdvisoryRequest;
import com.project.backend.entity.User;

public interface AdvisoryRequestRepository extends JpaRepository<AdvisoryRequest, Long>{
    List<AdvisoryRequest> findByAdvisorId(User advisor);
    List<AdvisoryRequest> findByInvestorId(User investor);
}
