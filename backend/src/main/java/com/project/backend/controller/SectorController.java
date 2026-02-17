package com.project.backend.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.project.backend.dto.SectorDto;
import com.project.backend.entity.Sector;
import com.project.backend.service.SectorService;

@RestController
@RequestMapping("/api/sectors")
public class SectorController {

    private final SectorService sectorService;

    public SectorController(SectorService sectorService) {
        this.sectorService = sectorService;
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<SectorDto> create(@RequestBody SectorDto dto) {
        Sector sector = new Sector();
        sector.setSectorName(dto.getSectorName());

        Sector saved = sectorService.save(sector);
        return ResponseEntity.ok(new SectorDto(saved.getSectorId(), saved.getSectorName()));
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN','INVESTOR','ADVISOR')")
    public ResponseEntity<List<SectorDto>> list() {
        List<SectorDto> sectors = sectorService.findAll()
                .stream()
                .map(s -> new SectorDto(s.getSectorId(), s.getSectorName()))
                .collect(Collectors.toList());
        return ResponseEntity.ok(sectors);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SectorDto> get(@PathVariable Long id) {
        Sector sector = sectorService.findById(id)
                .orElseThrow(() -> new RuntimeException("Sector not found"));
        return ResponseEntity.ok(new SectorDto(sector.getSectorId(), sector.getSectorName()));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<SectorDto> update(@PathVariable Long id, @RequestBody SectorDto dto) {
        Sector sector = sectorService.findById(id)
                .orElseThrow(() -> new RuntimeException("Sector not found"));

        sector.setSectorName(dto.getSectorName());
        Sector updated = sectorService.save(sector);

        return ResponseEntity.ok(new SectorDto(updated.getSectorId(), updated.getSectorName()));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        sectorService.delete(id);
        return ResponseEntity.ok("Sector deleted successfully");
    }

}
