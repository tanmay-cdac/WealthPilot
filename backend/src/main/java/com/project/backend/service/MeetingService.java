package com.project.backend.service;

import java.util.List;
import java.util.Optional;

import com.project.backend.entity.Meeting;

public interface MeetingService {
    Meeting save(Meeting m);
    // In MeetingService.java
    Optional<Meeting> findById(Long meetingId);

    List<Meeting> findByAdvisor(Long advisorId);
    List<Meeting> findByInvestor(Long investorId);
}
