package com.project.backend.entity;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

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
@Table(name = "users")
@Getter 
@Setter 
@NoArgsConstructor 
@AllArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class User {
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @Column(length = 100, nullable = false)
    private String fullName;

    @Column(length = 100, nullable = false, unique = true)
    private String email;

    @Column(length = 255, nullable = false)
    private String password;

    @ManyToOne(optional = false)
    @JoinColumn(name = "role_id",  nullable = false)
    private Role role;

    @Column(length = 20, nullable = false)
    private String status = "ACTIVE";

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }
}
