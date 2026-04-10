package com.example.module_user.dto;

import lombok.Data;

@Data
public class OrganizationRequest {
    private String name;
    private Long parentId;
}