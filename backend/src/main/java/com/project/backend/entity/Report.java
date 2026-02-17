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
@Table(name = "reports")
@Getter 
@Setter 
@NoArgsConstructor 
@AllArgsConstructor
public class Report {
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reportId;

    @ManyToOne(optional = false)
    @JoinColumn(name = "request_id", nullable = false)
    private AdvisoryRequest request;

    @ManyToOne(optional = false)
    @JoinColumn(name = "advisor_id", nullable = false)
    private User advisor;

    @Column(nullable = false)
    private String reportType;

    @Column(nullable = false)
    private String fileUrl;

    @Column(columnDefinition = "TEXT")
    private String summary;

    @Column(nullable = false)
    private LocalDateTime uploadedAt;

    @PrePersist
    protected void onCreate() {
        this.uploadedAt = LocalDateTime.now();
    }
}
