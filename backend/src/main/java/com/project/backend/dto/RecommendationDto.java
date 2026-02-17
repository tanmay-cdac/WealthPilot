package com.project.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter 
@Setter 
@NoArgsConstructor 
@AllArgsConstructor
public class RecommendationDto {
    private Long recommendationId;
    private Long requestId;
    private Long advisorId;
    private Long companyId;
    private String notes;
    private String expectedReturn;
}
