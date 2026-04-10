package com.example.module_user.service;

import com.example.module_user.dto.MenuRequest;
import com.example.module_user.dto.MenuResponse;
import com.example.module_user.model.Menu;
import com.example.module_user.repository.MenuRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MenuService {

    private final MenuRepository menuRepository;

    // CREATE
    public MenuResponse create(MenuRequest request) {

        Menu parent = null;

        if (request.getParentId() != null) {
            parent = menuRepository.findById(request.getParentId())
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy menu cha"));
        }

        Menu menu = Menu.builder()
                .name(request.getName())
                .parent(parent)
                .build();

        menuRepository.save(menu);

        return mapToResponse(menu);
    }

    // GET ALL
    public List<MenuResponse> getAll() {
        return menuRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    // GET BY ID
    public MenuResponse getById(Long id) {
        Menu menu = menuRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy menu"));

        return mapToResponse(menu);
    }

    // UPDATE
    public MenuResponse update(Long id, MenuRequest request) {
        Menu menu = menuRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy menu"));

        Menu parent = null;

        if (request.getParentId() != null) {

            // ❗ không cho parent = chính nó
            if (request.getParentId().equals(id)) {
                throw new RuntimeException("Menu không thể là cha của chính nó");
            }

            parent = menuRepository.findById(request.getParentId())
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy menu cha"));
        }

        menu.setName(request.getName());
        menu.setParent(parent);

        menuRepository.save(menu);

        return mapToResponse(menu);
    }

    // DELETE
    public void delete(Long id) {
        Menu menu = menuRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy menu"));

        // ❗ không cho xóa nếu có menu con
        if (menu.getChildren() != null && !menu.getChildren().isEmpty()) {
            throw new RuntimeException("Menu đang có menu con, không thể xóa");
        }

        menuRepository.delete(menu);
    }

    // GET TREE
    public List<MenuResponse> getTree() {
        return menuRepository.findByParentIsNull()
                .stream()
                .map(this::mapToTree)
                .collect(Collectors.toList());
    }

    // ================= MAPPER =================

    private MenuResponse mapToResponse(Menu menu) {
        return MenuResponse.builder()
                .id(menu.getId())
                .name(menu.getName())
                .parentId(menu.getParent() != null ? menu.getParent().getId() : null)
                .build();
    }

    private MenuResponse mapToTree(Menu menu) {
        return MenuResponse.builder()
                .id(menu.getId())
                .name(menu.getName())
                .parentId(menu.getParent() != null ? menu.getParent().getId() : null)
                .children(
                        menu.getChildren() != null
                                ? menu.getChildren().stream()
                                .map(this::mapToTree)
                                .collect(Collectors.toList())
                                : List.of()
                )
                .build();
    }
}