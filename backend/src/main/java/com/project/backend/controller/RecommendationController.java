package com.project.backend.controller;

import java.util.List;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.project.backend.entity.*;
import com.project.backend.service.*;

import jakarta.validation.Valid;    

@RestController
@RequestMapping("/api/recommendations")
public class RecommendationController {
    private final RecommendationService service;
    private final AdvisoryRequestService requestService;
    private final CompanyService companyService;
    private final UserService userService;
    private final UploadIoService uploadIoService;

    public RecommendationController(RecommendationService service, AdvisoryRequestService requestService, 
            CompanyService companyService, UserService userService, UploadIoService uploadIoService) {
        this.service = service; 
        this.requestService = requestService; 
        this.companyService = companyService;
        this.userService = userService;
        this.uploadIoService = uploadIoService;
    }

    @PreAuthorize("hasRole('ADVISOR')")
    @PostMapping
    public Recommendation create(
            @RequestParam("requestId") Long requestId,
            @RequestParam("companyId") Long companyId,
            @RequestParam("notes") String notes,
            @RequestParam("expectedReturn") String expectedReturn,
            @RequestParam(value = "file", required = false) MultipartFile file,
            Authentication auth) throws Exception {
        
        User advisor = userService.findByEmail(auth.getName())
                .orElseThrow(() -> new RuntimeException("Advisor not found"));
        
        AdvisoryRequest request = requestService.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Request not found"));
        
        Company company = companyService.findById(companyId)
                .orElseThrow(() -> new RuntimeException("Company not found"));
        
        Recommendation rec = new Recommendation();
        rec.setRequest(request);
        rec.setAdvisor(advisor);
        rec.setCompany(company);
        rec.setNotes(notes);
        rec.setExpectedReturn(expectedReturn);
        
        if (file != null && !file.isEmpty()) {
            String fileUrl = uploadIoService.uploadFile(file);
            rec.setReportUrl(fileUrl);
        }
        
        return service.save(rec);
    }

    // Both USER (investor) and ADVISOR can view recommendations
    @PreAuthorize("hasAnyRole('INVESTOR','ADVISOR')")
    @GetMapping("/request/{requestId}")
    public List<Recommendation> byRequest(@PathVariable Long requestId) {
        return service.findByRequestId(requestId);
    }
}
