package com.example.module_user.model;

import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RoleMenuPermissionId implements Serializable {

    private Long roleId;
    private Long menuId;
}