package com.example.module_user.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "role_menu_permissions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RoleMenuPermission {

    @EmbeddedId
    private RoleMenuPermissionId id;

    @ManyToOne
    @MapsId("roleId")
    @JoinColumn(name = "role_id")
    private Role role;

    @ManyToOne
    @MapsId("menuId")
    @JoinColumn(name = "menu_id")
    private Menu menu;

    private Boolean canView;
    private Boolean canCreate;
    private Boolean canUpdate;
    private Boolean canDelete;
}