package com.project.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.project.backend.entity.ContactDetails;

public interface ContactDetailsRepository extends JpaRepository<ContactDetails, Long> {
}
