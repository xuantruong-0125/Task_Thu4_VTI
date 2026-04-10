package com.example.module_user.controller;

import com.example.module_user.dto.OrganizationRequest;
import com.example.module_user.dto.OrganizationResponse;
import com.example.module_user.service.OrganizationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/organizations")
//@Controller
//@RequestMapping("/organizations")
@RequiredArgsConstructor
public class OrganizationController {

    private final OrganizationService organizationService;

    // CREATE
    @PostMapping
    public OrganizationResponse create(@RequestBody OrganizationRequest request) {
        return organizationService.create(request);
    }

    // GET ALL
    @GetMapping
    public List<OrganizationResponse> getAll() {
        return organizationService.getAll();
    }

    // GET BY ID
    @GetMapping("/{id}")
    public OrganizationResponse getById(@PathVariable Long id) {
        return organizationService.getById(id);
    }

    // UPDATE
    @PutMapping("/{id}")
    public OrganizationResponse update(
            @PathVariable Long id,
            @RequestBody OrganizationRequest request
    ) {
        return organizationService.update(id, request);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id) {
        organizationService.delete(id);
        return "Delete successfully";
    }
}