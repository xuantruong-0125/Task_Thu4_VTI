# CRM Module Quản lý hệ thống - Role, Menu, Organization CRUD

## Giới thiệu

Đây là module quản lý hệ thống, phân quyền người dùng cho hệ thống CRM, **hiện tại đã thực hiện được 3 chức năng**:

* Quản lý Organization (cơ cấu tổ chức dạng cây)
* Quản lý Menu (chức năng hệ thống dạng cây)
* Quản lý Role (vai trò người dùng)

Project gồm:

* Backend: Spring Boot (REST API)
* Frontend: NextJS (UI)

---

## Chức năng chính

### 1. Organization 

* Tạo mới organization (có thể chọn organization cha)
* Cập nhật tên
* Xóa (có confirm, kiểm tra ràng buộc)
* Hiển thị dạng cây (parent - child)
* Có thông báo cho người dùng kết quả khi thao tác (cả 3 form đều có)
<img width="1919" height="912" alt="image" src="https://github.com/user-attachments/assets/9b3f13c3-9bdf-4eaf-9c08-aeecd8230422" />
<img width="516" height="275" alt="image" src="https://github.com/user-attachments/assets/cd4e32af-6c4b-4db5-af98-95c3e3ffcb29" />


---

### 2. Menu 

* Tạo menu (có thể chọn menu cha)
* Cập nhật menu 
* Xóa menu (có confirm, kiểm tra ràng buộc)
* Hiển thị dạng tree UI
<img width="1919" height="835" alt="image" src="https://github.com/user-attachments/assets/f8740234-16ac-4fa2-9ec5-8f84d613c8b8" />



---

### 3. Role 

* CRUD role
* Dùng để gán quyền sau này
<img width="1918" height="647" alt="image" src="https://github.com/user-attachments/assets/56e49cc0-2e62-4e91-91a4-02b14aaa6fc3" />

---

## Cách clone và chạy project

### 1. Clone project

```bash
git clone <link-repo>
cd <ten-project>
```

---

### 2. Chạy Backend (Spring Boot) 

Di chuyển vào thư mục backend:

```bash
cd module_user
```

Chạy project:

```bash
./mvnw spring-boot:run
```

Hoặc nếu dùng IDE IntelliJ:

* Mở project
* Run file `ModuleUserApplication.java`

---

### 3. Chạy Frontend (NextJS)

```bash
cd crm_frontend
npm install
npm run dev
```


Mặc định:

* Frontend: http://localhost:3000
* Backend: http://localhost:8080
* Truy cập bằng trình duyệt: http://localhost:3000/roles

---

## Cấu hình kết nối Database ở Spring Boot

File cấu hình:

```bash
module_user/src/main/resources/application.properties
```

### Ví dụ:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/crm_db
spring.datasource.username=root
spring.datasource.password=123456

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

Bạn cần sửa:

* database name
* username
* password

---

## Cách tạo Database

### 1. Tạo database ở phpMyAdmin (nếu bạn đã cài Wamp Server)

```sql
CREATE DATABASE crm_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

---

### 2. Tạo các bảng

#### Bảng organizations

```sql
CREATE TABLE IF NOT EXISTS `organizations` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `parent_id` bigint DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_org_parent` (`parent_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

---

#### Bảng menus

```sql
CREATE TABLE IF NOT EXISTS `menus` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `parent_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_menu_parent` (`parent_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

---

#### Bảng roles

```sql
CREATE TABLE IF NOT EXISTS `roles` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

## Hướng phát triển tiếp theo
* Tạo user
* Phân quyền role - menu (role_menu_permissions)
* Ẩn/hiện menu theo quyền


## Tác giả

* Nguyễn Xuân Trường - Trường Đại học Công nghệ Sài Gòn

---
