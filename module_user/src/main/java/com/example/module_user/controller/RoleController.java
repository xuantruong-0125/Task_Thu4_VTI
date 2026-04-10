package com.example.module_user.controller;

import com.example.module_user.dto.RoleRequest;
import com.example.module_user.dto.RoleResponse;
import com.example.module_user.service.RoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/roles")
@RequiredArgsConstructor
public class RoleController {

    private final RoleService roleService;

    // CREATE
    @PostMapping
    public RoleResponse create(@RequestBody RoleRequest request) {
        return roleService.create(request);
    }

    // GET ALL
    @GetMapping
    public List<RoleResponse> getAll() {
        return roleService.getAll();
    }

    // GET BY ID
    @GetMapping("/{id}")
    public RoleResponse getById(@PathVariable Long id) {
        return roleService.getById(id);
    }

    // UPDATE
    @PutMapping("/{id}")
    public RoleResponse update(
            @PathVariable Long id,
            @RequestBody RoleRequest request
    ) {
        return roleService.update(id, request);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        roleService.delete(id);
    }
}