package com.example.module_user.service;

import com.example.module_user.dto.RoleRequest;
import com.example.module_user.dto.RoleResponse;
import com.example.module_user.model.Role;
import com.example.module_user.repository.RoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RoleService {

    private final RoleRepository roleRepository;

    // CREATE
    public RoleResponse create(RoleRequest request) {

        if (roleRepository.existsByName(request.getName())) {
            throw new RuntimeException("Role đã tồn tại");
        }

        Role role = Role.builder()
                .name(request.getName())
                .description(request.getDescription())
                .build();

        roleRepository.save(role);

        return mapToResponse(role);
    }

    // GET ALL
    public List<RoleResponse> getAll() {
        return roleRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    // GET BY ID
    public RoleResponse getById(Long id) {
        Role role = roleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy role"));

        return mapToResponse(role);
    }

    // UPDATE
    public RoleResponse update(Long id, RoleRequest request) {
        Role role = roleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy role"));

        // check trùng name (trừ chính nó)
        if (!role.getName().equals(request.getName())
                && roleRepository.existsByName(request.getName())) {
            throw new RuntimeException("Tên role đã tồn tại");
        }

        role.setName(request.getName());
        role.setDescription(request.getDescription());

        roleRepository.save(role);

        return mapToResponse(role);
    }

    // DELETE
    public void delete(Long id) {
        Role role = roleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy role"));

        // ❗ nếu role đang được user dùng thì không cho xóa
        if (role.getUsers() != null && !role.getUsers().isEmpty()) {
            throw new RuntimeException("Role đang được sử dụng, không thể xóa");
        }

        roleRepository.delete(role);
    }

    // MAPPER
    private RoleResponse mapToResponse(Role role) {
        return RoleResponse.builder()
                .id(role.getId())
                .name(role.getName())
                .description(role.getDescription())
                .build();
    }
}