package com.project.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.backend.dto.AdvisoryRequestDto;
import com.project.backend.entity.AdvisoryRequest;
import com.project.backend.entity.User;
import com.project.backend.repository.UserRepository;
import com.project.backend.service.AdvisoryRequestService;
import com.project.backend.service.UserService;

@RestController
@RequestMapping("/api/advisory-requests")
public class AdvisoryRequestController {

    private final AdvisoryRequestService service;
    private final UserService userService;
    private final UserRepository userRepository;

    public AdvisoryRequestController(AdvisoryRequestService service, UserService userService, UserRepository userRepository) {
        this.service = service;
        this.userService = userService;
        this.userRepository = userRepository;
    }

    @PostMapping
    @PreAuthorize("hasRole('INVESTOR')")
    public AdvisoryRequest create(@AuthenticationPrincipal UserDetails currentUser,
                              @RequestBody AdvisoryRequestDto dto) {

    String email = currentUser.getUsername();

    User investor = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found"));

    return service.create(dto, investor.getUserId());
    }

    @GetMapping("/assigned")
    @PreAuthorize("hasRole('ADVISOR')")
    public ResponseEntity<List<AdvisoryRequest>> assignedRequests(Authentication auth) {
        String email = auth.getName();
        User advisor = userService.findByEmail(email).orElseThrow(() -> new RuntimeException("Advisor not found"));
        System.out.println("Fetching requests for advisor: " + advisor.getFullName() + " (ID: " + advisor.getUserId() + ")");
        
        List<AdvisoryRequest> list = service.findByAdvisor(advisor);
        System.out.println("Found " + list.size() + " requests");
        list.forEach(r -> System.out.println("Request ID: " + r.getRequestId() + ", Status: " + r.getStatus() + ", Advisor: " + (r.getAdvisorId() != null ? r.getAdvisorId().getFullName() : "null")));
        
        return ResponseEntity.ok(list);
    }

    @GetMapping("/my")
    @PreAuthorize("hasRole('INVESTOR')")
    public ResponseEntity<List<AdvisoryRequest>> myRequests(Authentication authentication) {

    String email = authentication.getName();
    User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("Investor not found"));

    List<AdvisoryRequest> list = service.findByInvestor(user);

    return ResponseEntity.ok(list);
    }


    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<AdvisoryRequest> all() {
        return service.findAll();
    }

    @PostMapping("/{id}/assign/{advisorId}")
    @PreAuthorize("hasRole('ADMIN')")
    public AdvisoryRequest assignAdvisor(@PathVariable Long id, @PathVariable Long advisorId) {
        AdvisoryRequest r = service.findById(id).orElseThrow();
        User adv = userService.findById(advisorId).orElseThrow();
        r.setAdvisorId(adv);
        r.setStatus("PENDING"); 
        return service.create(r);
    }

    @PostMapping("/{id}/approve")
    @PreAuthorize("hasRole('ADVISOR')")
    public AdvisoryRequest approveRequest(@PathVariable Long id, Authentication auth) {
        String email = auth.getName();
        User advisor = userService.findByEmail(email).orElseThrow();
        AdvisoryRequest r = service.findById(id).orElseThrow();
        if (!r.getAdvisorId().getUserId().equals(advisor.getUserId())) {
            throw new RuntimeException("Not authorized");
        }
        r.setStatus("ASSIGNED");
        return service.create(r);
    }

    @PostMapping("/{id}/decline")
    @PreAuthorize("hasRole('ADVISOR')")
    public AdvisoryRequest declineRequest(@PathVariable Long id, Authentication auth) {
        String email = auth.getName();
        User advisor = userService.findByEmail(email).orElseThrow();
        AdvisoryRequest r = service.findById(id).orElseThrow();
        if (!r.getAdvisorId().getUserId().equals(advisor.getUserId())) {
            throw new RuntimeException("Not authorized");
        }
        r.setAdvisorId(null);
        r.setStatus("OPEN");
        return service.create(r);
    }
}
