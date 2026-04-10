package com.example.module_user.repository;

import com.example.module_user.model.Organization;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface OrganizationRepository extends JpaRepository<Organization, Long> {
    @Query("SELECT COUNT(o) > 0 FROM Organization o WHERE o.parent.id = :parentId")
    boolean hasChildren(@Param("parentId") Long parentId);
}