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
@Table(name = "recommendations")
@Getter 
@Setter 
@NoArgsConstructor 
@AllArgsConstructor
public class Recommendation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long recommendationId;

    @ManyToOne(optional = false)
    @JoinColumn(name = "request_id", nullable = false)
    private AdvisoryRequest request;

    @ManyToOne(optional = false)
    @JoinColumn(name = "advisor_id", nullable = false)
    private User advisor;

    @ManyToOne(optional = false)
    @JoinColumn(name = "company_id", nullable = false)
    private Company company;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String notes;

    @Column(nullable = false)
    private String expectedReturn;

    @Column(length = 500)
    private String reportUrl;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void created() {
        this.createdAt = LocalDateTime.now();
    }

}
