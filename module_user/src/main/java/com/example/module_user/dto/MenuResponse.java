package com.example.module_user.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class MenuResponse {
    private Long id;
    private String name;
    private Long parentId;
    private List<MenuResponse> children;
}