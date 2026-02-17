package com.project.backend.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.backend.entity.Meeting;
import com.project.backend.repository.MeetingRepository;
import com.project.backend.service.MeetingService;

@Service
@Transactional
public class MeetingServiceImpl implements MeetingService {

    private final MeetingRepository repo;

    public MeetingServiceImpl(MeetingRepository repo) {
        this.repo = repo;
    }

    @Override
    public Meeting save(Meeting m) {
        return repo.save(m);
    }

    @Override
    public List<Meeting> findByAdvisor(Long advisorId) {
        return repo.findByAdvisor_UserId(advisorId);
    }

    @Override
    public List<Meeting> findByInvestor(Long investorId) {
        return repo.findByInvestor_UserId(investorId);
    }

    @Override
    public Optional<Meeting> findById(Long meetingId) {
        return repo.findById(meetingId);
    }

}
