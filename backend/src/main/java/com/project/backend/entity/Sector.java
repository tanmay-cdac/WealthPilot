package com.project.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "sectors")
@Getter 
@Setter 
@NoArgsConstructor 
@AllArgsConstructor
public class Sector {
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long sectorId;

    @Column(unique = true, nullable = false, length = 100)
    private String sectorName;
}
