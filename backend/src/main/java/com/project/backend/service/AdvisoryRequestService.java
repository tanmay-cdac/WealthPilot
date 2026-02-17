package com.project.backend.service;

import java.util.List;
import java.util.Optional;

import com.project.backend.dto.AdvisoryRequestDto;
import com.project.backend.entity.AdvisoryRequest;
import com.project.backend.entity.User;

public interface AdvisoryRequestService {
    AdvisoryRequest create(AdvisoryRequest entity);
    AdvisoryRequest create(AdvisoryRequestDto dto, Long investorId);
    Optional<AdvisoryRequest> findById(Long id);
    List<AdvisoryRequest> findByAdvisor(User advisor);
    List<AdvisoryRequest> findByInvestor(User investor);
    List<AdvisoryRequest> findAll();
}
