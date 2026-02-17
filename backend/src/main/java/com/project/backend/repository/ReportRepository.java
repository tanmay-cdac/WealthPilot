package com.project.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.backend.entity.Report;

public interface ReportRepository extends JpaRepository<Report, Long>{
    List<Report> findByRequest_RequestId(Long requestId);
}
