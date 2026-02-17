package com.project.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor 
@AllArgsConstructor
public class CompanyDto {
    private Long id;
    private String name;
    private Long sectorId;
    private String riskLevel;
    private Double marketCap;
    private String description;
    private Long createdBy;
}
