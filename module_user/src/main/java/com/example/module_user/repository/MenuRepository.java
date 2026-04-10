package com.example.module_user.repository;

import com.example.module_user.model.Menu;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MenuRepository extends JpaRepository<Menu, Long> {

    List<Menu> findByParentIsNull(); // lấy menu gốc
}