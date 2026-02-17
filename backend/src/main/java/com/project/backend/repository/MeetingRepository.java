package com.project.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.project.backend.entity.Meeting;

public interface MeetingRepository extends JpaRepository<Meeting, Long>{
    List<Meeting> findByAdvisor_UserId(Long advisorId);
    List<Meeting> findByInvestor_UserId(Long investorId);
}
