package com.example.module_user.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class OrganizationResponse {
    private Long id;
    private String name;
    private Long parentId;
}