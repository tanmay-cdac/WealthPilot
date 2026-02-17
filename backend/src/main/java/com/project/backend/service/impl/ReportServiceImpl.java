package com.project.backend.service.impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.backend.entity.AdvisoryRequest;
import com.project.backend.entity.Report;
import com.project.backend.repository.AdvisoryRequestRepository;
import com.project.backend.repository.ReportRepository;
import com.project.backend.service.ReportService;

@Service
@Transactional
public class ReportServiceImpl implements ReportService {
    private final ReportRepository repo;
    private final AdvisoryRequestRepository requestRepo;

    public ReportServiceImpl(ReportRepository repo, AdvisoryRequestRepository requestRepo) {
        this.repo = repo;
        this.requestRepo = requestRepo;
    }

    @Override
    public Report saveReport(Long requestId, String reportType, String summary, String fileUrl) {

        AdvisoryRequest request = requestRepo.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Request not found"));

        Report report = new Report();
        report.setRequest(request);
        report.setAdvisor(request.getAdvisorId());
        report.setReportType(reportType);
        report.setSummary(summary);
        report.setFileUrl(fileUrl);
        report.setUploadedAt(LocalDateTime.now());

        return repo.save(report);
    }

    @Override
    public List<Report> findByRequest(Long requestId) {
        return repo.findByRequest_RequestId(requestId);
    }

    @Override
    public Optional<Report> findById(Long reportId) {
        return repo.findById(reportId);
    }

    @Override
    public void delete(Long reportId) {
        repo.deleteById(reportId); 
    }
}
