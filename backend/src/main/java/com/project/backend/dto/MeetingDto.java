package com.project.backend.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MeetingDto {
    private Long meetingId;
    private Long requestId;
    private Long investorId;
    private Long advisorId;
    private LocalDateTime scheduledDate;
    private String meetingLink;
    private String status;
    private String notes;
}
