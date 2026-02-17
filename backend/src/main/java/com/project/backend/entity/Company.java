package com.project.backend.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "companies")
@Getter
@Setter 
@NoArgsConstructor 
@AllArgsConstructor
public class Company {
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long companyId;

    @Column(nullable = false, length = 150)
    private String name;

    @ManyToOne(optional = false)
    @JoinColumn(name = "sector_id", nullable = false)
    private Sector sector;

    @Column(nullable = false)
    private String riskLevel;
    
    @Column(nullable = false)
    private Double marketCap;

    @Column(columnDefinition = "TEXT")
    private String description;

    @ManyToOne(optional = false)
    @JoinColumn(name = "created_by", nullable = false)
    private User createdBy;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }
}
