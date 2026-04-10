package com.example.module_user.service;

import com.example.module_user.dto.OrganizationRequest;
import com.example.module_user.dto.OrganizationResponse;
import com.example.module_user.model.Organization;
import com.example.module_user.repository.OrganizationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrganizationService {

    private final OrganizationRepository organizationRepository;

    // CREATE
    public OrganizationResponse create(OrganizationRequest request) {
        Organization org = new Organization();
        org.setName(request.getName());

        if (request.getParentId() != null) {
            Organization parent = organizationRepository.findById(request.getParentId())
                    .orElseThrow(() -> new RuntimeException("Parent not found"));
            org.setParent(parent);
        }

        organizationRepository.save(org);
        return mapToResponse(org);
    }

    // GET ALL
    public List<OrganizationResponse> getAll() {
        return organizationRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    // GET BY ID
    public OrganizationResponse getById(Long id) {
        Organization org = organizationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Organization not found"));
        return mapToResponse(org);
    }

    // UPDATE
    public OrganizationResponse update(Long id, OrganizationRequest request) {
        Organization org = organizationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Organization not found"));

        org.setName(request.getName());

        if (request.getParentId() != null) {
            Organization parent = organizationRepository.findById(request.getParentId())
                    .orElseThrow(() -> new RuntimeException("Parent not found"));
            org.setParent(parent);
        }
//        else {
//            org.setParent(null);
//        }

        organizationRepository.save(org);
        return mapToResponse(org);
    }

    // DELETE
    // DELETE
    public void delete(Long id) {
        Organization org = organizationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không có chi nhánh này"));

        // ❗ check có con không
        if (organizationRepository.hasChildren(id)) {
            throw new RuntimeException("Không thể xóa chi nhánh đang có chi nhánh con, vui lòng xóa hết chi nhánh con trước.");
        }

        organizationRepository.delete(org);
    }

    // MAPPER
    private OrganizationResponse mapToResponse(Organization org) {
        return OrganizationResponse.builder()
                .id(org.getId())
                .name(org.getName())
                .parentId(org.getParent() != null ? org.getParent().getId() : null)
                .build();
    }
}