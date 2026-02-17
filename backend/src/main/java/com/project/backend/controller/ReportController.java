package com.project.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.project.backend.entity.AdvisoryRequest;
import com.project.backend.entity.Report;
import com.project.backend.entity.User;
import org.springframework.http.HttpStatus;

import com.project.backend.service.ReportService;
import com.project.backend.service.UploadIoService;
import com.project.backend.service.UserService;
import com.project.backend.service.AdvisoryRequestService;

@RestController
@RequestMapping("/reports")
public class ReportController {

    private final ReportService reportService;
    private final UploadIoService uploadIoService;
    private final UserService userService;
    private final AdvisoryRequestService requestService;

    public ReportController(
            ReportService reportService, 
            UploadIoService uploadIoService,
            UserService userService,
            AdvisoryRequestService requestService) {
        this.reportService = reportService;
        this.uploadIoService = uploadIoService;
        this.userService = userService;
        this.requestService = requestService;
    }

    @PreAuthorize("hasRole('ADVISOR')")
    @PostMapping("/upload")
    public ResponseEntity<?> uploadReport(
            @RequestParam("file") MultipartFile file,
            @RequestParam("requestId") Long requestId,
            @RequestParam("reportType") String reportType,
            @RequestParam("summary") String summary
    ) {
        try {

            // Upload file to Upload.io
            String fileUrl = uploadIoService.uploadFile(file);

            // Save report in DB
            Report saved = reportService.saveReport(requestId, reportType, summary, fileUrl);

            return ResponseEntity.ok(saved);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error: " + e.getMessage());
        }
    }

    @PreAuthorize("hasAnyRole('INVESTOR','ADVISOR')")
    @GetMapping("/request/{requestId}")
    public List<Report> byRequest(@PathVariable Long requestId, Authentication auth) {
        User currentUser = userService.findByEmail(auth.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<Report> reports = reportService.findByRequest(requestId);

        if (!reports.isEmpty()) {
            // Only the investor of the request or the advisor can view
            boolean allowed = reports.get(0).getRequest().getInvestorId().getUserId().equals(currentUser.getUserId())
                    || reports.get(0).getAdvisor().getUserId().equals(currentUser.getUserId());

            if (!allowed) {
                throw new RuntimeException("You are not allowed to view these reports");
            }
        }

        return reports;
    }

    @PreAuthorize("hasRole('ADVISOR')")
    @DeleteMapping("/{reportId}")
    public void deleteReport(@PathVariable Long reportId, Authentication auth) {
        User currentUser = userService.findByEmail(auth.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Report report = reportService.findById(reportId)
                .orElseThrow(() -> new RuntimeException("Report not found"));

        if (!report.getAdvisor().getUserId().equals(currentUser.getUserId())) {
            throw new RuntimeException("You are not allowed to delete this report");
        }

        reportService.delete(reportId);
    }
}
