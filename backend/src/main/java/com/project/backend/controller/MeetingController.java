package com.project.backend.controller;

import java.util.List;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.project.backend.entity.AdvisoryRequest;
import com.project.backend.entity.Meeting;
import com.project.backend.entity.User;
import com.project.backend.service.MeetingService;
import com.project.backend.service.AdvisoryRequestService;
import com.project.backend.service.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/meetings")
public class MeetingController {

    private final MeetingService meetingService;
    private final UserService userService;
    private final AdvisoryRequestService requestService;

    public MeetingController(MeetingService meetingService, UserService userService, AdvisoryRequestService requestService) {
        this.meetingService = meetingService;
        this.userService = userService;
        this.requestService = requestService;
    }
    @PostMapping("/request/{requestId}")
    @PreAuthorize("hasRole('ADVISOR')")
    public Meeting create(@PathVariable Long requestId,
                        @RequestBody @Valid Meeting meeting,
                        Authentication authentication) {

        String email = authentication.getName();
        User advisor = userService.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Fetch the request
        AdvisoryRequest request = requestService.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Request not found"));

        // Ensure the advisor is assigned to this request
        if (!request.getAdvisorId().getUserId().equals(advisor.getUserId())) {
            throw new RuntimeException("You are not assigned to this user.");
        }

        // Get the investor
        User investor = request.getInvestorId();

        // Set relationships
        meeting.setAdvisor(advisor);
        meeting.setInvestor(investor);
        meeting.setRequest(request);
        meeting.setStatus("PENDING");
        return meetingService.save(meeting);
    }


    @GetMapping("/advisor/{advisorId}")
    @PreAuthorize("hasRole('ADVISOR')")
    public List<Meeting> byAdvisor(@PathVariable Long advisorId) {
        return meetingService.findByAdvisor(advisorId);
    }

    @GetMapping("/investor/{investorId}")
    @PreAuthorize("hasRole('INVESTOR')")
    public List<Meeting> byInvestor(@PathVariable Long investorId) {
        return meetingService.findByInvestor(investorId);
    }

    @PutMapping("/{meetingId}/status")
    @PreAuthorize("hasAnyRole('ADVISOR','INVESTOR')")
    public Meeting updateStatus(@PathVariable Long meetingId,
                                @RequestParam String status,
                                Authentication authentication) {

        Meeting meeting = meetingService.findById(meetingId)
                .orElseThrow(() -> new RuntimeException("Meeting not found"));

        String email = authentication.getName();
        User currentUser = userService.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // USER role can CONFIRM or CANCEL
        if (currentUser.getRole().getName().equals("INVESTOR")) {
            if (status.equalsIgnoreCase("CONFIRMED") || status.equalsIgnoreCase("CANCELLED")) {
                if (!meeting.getInvestor().getUserId().equals(currentUser.getUserId())) {
                    throw new RuntimeException("You are not allowed to update this meeting");
                }
                meeting.setStatus(status.toUpperCase());
            } else {
                throw new RuntimeException("Invalid status for user");
            }
        }

        // ADVISOR role can mark COMPLETE
        else if (currentUser.getRole().getName().equals("ADVISOR")) {
            if (status.equalsIgnoreCase("COMPLETED")) {
                if (!meeting.getAdvisor().getUserId().equals(currentUser.getUserId())) {
                    throw new RuntimeException("You are not allowed to update this meeting");
                }
                meeting.setStatus("COMPLETED");
            } else {
                throw new RuntimeException("Invalid status for advisor");
            }
        } else {
            throw new RuntimeException("Role not allowed to update status");
        }

        return meetingService.save(meeting);
    }

    @PutMapping("/{meetingId}/decision")
    @PreAuthorize("hasRole('ADVISOR')")
    public Meeting updateInvestmentDecision(@PathVariable Long meetingId,
                                           @RequestParam String decision,
                                           Authentication authentication) {
        Meeting meeting = meetingService.findById(meetingId)
                .orElseThrow(() -> new RuntimeException("Meeting not found"));
        
        String email = authentication.getName();
        User advisor = userService.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        if (!meeting.getAdvisor().getUserId().equals(advisor.getUserId())) {
            throw new RuntimeException("Not authorized");
        }
        
        meeting.setInvestmentDecision(decision);
        return meetingService.save(meeting);
    }
}
