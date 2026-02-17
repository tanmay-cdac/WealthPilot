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
@Table(name = "advisory_requests")
@Getter 
@Setter 
@NoArgsConstructor 
@AllArgsConstructor
public class AdvisoryRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long requestId;

    @ManyToOne(optional = false)
    @JoinColumn(name = "investor_id", nullable = false)
    private User investorId;

    @ManyToOne
    @JoinColumn(name = "advisor_id")
    private User advisorId;

    @Column(nullable = false)
    private Double investmentAmount;

    @Column(nullable = false)
    private String riskPreference;

    @Column(nullable = false)
    private String sectorPreference;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String description;

    @Column(nullable = false, length = 20)
    private String status = "OPEN";

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }
}
