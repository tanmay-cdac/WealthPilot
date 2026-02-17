package com.project.backend.service;

import java.util.List;
import java.util.Optional;

import com.project.backend.entity.Report;

public interface ReportService {
    List<Report> findByRequest(Long requestId);
    Optional<Report> findById(Long reportId); 
    void delete(Long reportId);
    Report saveReport(Long requestId, String reportType, String summary, String fileUrl);               
}
