package com.example.module_user.controller;

import com.example.module_user.dto.MenuRequest;
import com.example.module_user.dto.MenuResponse;
import com.example.module_user.service.MenuService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/menus")
@RequiredArgsConstructor
public class MenuController {

    private final MenuService menuService;

    @PostMapping
    public MenuResponse create(@RequestBody MenuRequest request) {
        return menuService.create(request);
    }

    @PutMapping("/{id}")
    public MenuResponse update(@PathVariable Long id,
                               @RequestBody MenuRequest request) {
        return menuService.update(id, request);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        menuService.delete(id);
    }

    @GetMapping("/{id}")
    public MenuResponse getById(@PathVariable Long id) {
        return menuService.getById(id);
    }

    @GetMapping
    public List<MenuResponse> getAll() {
        return menuService.getAll();
    }

    @GetMapping("/tree")
    public List<MenuResponse> getTree() {
        return menuService.getTree();
    }
}