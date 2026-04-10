// components/Sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Building2, ShieldCheck, Menu } from "lucide-react";
import styles from "./Sidebar.module.css";

export default function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    {
      name: "Quản lý chi nhánh",
      path: "/organizations", // Thay bằng route thực tế của bạn
      icon: <Building2 size={20} />,
    },
    {
      name: "Quản lý chức vụ",
      path: "/roles", // Thay bằng route thực tế của bạn
      icon: <ShieldCheck size={20} />,
    },
    {
      name: "Quản lý menu",
      path: "/menus", // Thay bằng route thực tế của bạn
      icon: <Menu size={20} />,
    },
  ];

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>Hệ thống Quản Trị</div>

      <nav>
        <ul className={styles.menu}>
          {menuItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={`${styles.menuItem} ${isActive ? styles.active : ""}`}
                >
                  <span className={styles.icon}>{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}