package com.project.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter 
@Setter 
@NoArgsConstructor 
@AllArgsConstructor
public class AdvisoryRequestDto {
    private Double investmentAmount;
    private String riskPreference;
    private String sectorPreference;
    private String description;
}

