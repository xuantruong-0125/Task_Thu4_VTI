package com.example.module_user.dto;

import lombok.Data;

@Data
public class MenuRequest {
    private String name;
    private Long parentId; // có thể null
}