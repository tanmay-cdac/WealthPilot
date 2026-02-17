package com.project.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter 
@Setter 
@NoArgsConstructor 
@AllArgsConstructor
public class ReportDto {
    private Long reportId;
    private Long requestId;
    private Long advisorId;
    private String reportType;
    private String fileUrl;
    private String summary;
}
