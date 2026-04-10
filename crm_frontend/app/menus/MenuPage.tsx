"use client";

import { useEffect, useState } from "react";
import "./menu.css";
import Sidebar from "@/components/sidebar/Sidebar";
import MenuTree from "@/components/menu/MenuTree";
import ConfirmModal from "@/components/common/ConfirmModal";
import { toast } from "react-toastify";

interface Menu {
    id: number;
    name: string;
    parentId?: number;
}

export default function MenuPage() {
    const [menus, setMenus] = useState<Menu[]>([]);
    const [name, setName] = useState("");
    const [parentId, setParentId] = useState<number | null>(null);
    const [deleteId, setDeleteId] = useState<number | null>(null);

    // ================= FETCH =================
    const fetchMenus = async () => {
        const res = await fetch("http://localhost:8080/api/menus");
        const data = await res.json();
        setMenus(data);
    };

    useEffect(() => {
        fetchMenus();
    }, []);

    // ================= CREATE =================
    const handleCreate = async () => {
        // 🔒 validate
        if (!name.trim()) {
            toast.error("Tên menu không được để trống");
            return;
        }

        if (name.length > 100) {
            toast.error("Tên menu không được vượt quá 100 ký tự");
            return;
        }

        try {
            const res = await fetch("http://localhost:8080/api/menus", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    parentId: parentId || null,
                }),
            });

            if (!res.ok) {
                throw new Error("Tạo menu thất bại");
            }

            toast.success("Thêm menu thành công", {
                className: "my-toast-success",
            });

            setName("");
            setParentId(null);
            fetchMenus();

        } catch (err: any) {
            toast.error(err.message || "Có lỗi xảy ra", {
                className: "my-toast-error",
            });
        }
    };

    // ================= DELETE =================
    const handleDelete = async (id: number) => {
        try {
            const res = await fetch(`http://localhost:8080/api/menus/${id}`, {
                method: "DELETE",
            });

            if (!res.ok) {
                throw new Error("Menu này đang có menu con, không thể xóa");
            }

            toast.success("Xóa thành công", {
                className: "my-toast-success",
            });

            fetchMenus();

        } catch (err: any) {
            toast.error(err.message || "Không thể xóa", {
                className: "my-toast-error",
            });
        }
    };

    // ================= UPDATE =================
    const handleUpdate = async (id: number, name: string) => {
        if (!name.trim()) {
            toast.error("Tên menu không được để trống");
            return;
        }

        if (name.length > 100) {
            toast.error("Tên menu không được vượt quá 100 ký tự");
            return;
        }

        try {
            const currentMenu = menus.find(m => m.id === id);

            const res = await fetch(`http://localhost:8080/api/menus/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    parentId: currentMenu?.parentId ?? null,
                }),
            });

            if (!res.ok) {
                throw new Error("Cập nhật thất bại");
            }

            toast.success("Cập nhật thành công", {
                className: "my-toast-success",
            });

            fetchMenus();

        } catch (err: any) {
            toast.error(err.message || "Có lỗi xảy ra", {
                className: "my-toast-error",
            });
        }
    };

    return (
        <div className="page-wrapper">
            <Sidebar />
            <div className="menu-container">


                <div className="page-title">Quản lý menu</div>


                <div className="form">
                    <div className="form-group">
                        <label className="form-label">Tên menu</label>
                        <input
                            type="text"
                            placeholder="Nhập tên menu"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Menu cha</label>
                        <select
                            value={parentId ?? ""}
                            onChange={(e) =>
                                setParentId(e.target.value ? Number(e.target.value) : null)
                            }
                        >
                            <option value="">- Không có (Cấp cao nhất) -</option>
                            {menus.map((m) => (
                                <option key={m.id} value={m.id}>
                                    {m.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label className="form-label invisible">Action</label>
                        <button onClick={handleCreate}>Thêm mới menu</button>
                    </div>
                </div>

                <div className="treeContainer">
                    <MenuTree
                        data={menus}
                        onDelete={(id) => setDeleteId(id)}
                        onUpdate={handleUpdate}
                    />
                </div>
            </div>
            <ConfirmModal
                open={deleteId !== null}
                title="Xác nhận xóa"
                message="Bạn có chắc chắn muốn xóa menu này không?"
                onCancel={() => setDeleteId(null)}
                onConfirm={async () => {
                    if (!deleteId) return;

                    try {
                        await handleDelete(deleteId);
                        setDeleteId(null);
                    } catch (err: any) {
                        toast.error("Không thể xóa", {
                            className: "my-toast-error",
                        });
                    }
                }}
            />
        </div>


    );


}