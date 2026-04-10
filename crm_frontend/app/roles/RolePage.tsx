"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/sidebar/Sidebar";
import { toast } from "react-toastify";
import { Pencil, Trash2, Check, X } from "lucide-react";
import ConfirmModal from "@/components/common/ConfirmModal";
import "./role.css";

import {
    getRoles,
    createRole,
    deleteRole,
    updateRole,
} from "@/services/roleService";


export default function RolePage() {
    const [data, setData] = useState<any[]>([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const [editingId, setEditingId] = useState<number | null>(null);
    const [editName, setEditName] = useState("");
    const [editDescription, setEditDescription] = useState("");
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const fetchData = async () => {
        const res = await getRoles();
        setData(res);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleCreate = async () => {
        try {
            if (!name) {
                toast.error("Tên chức vụ không được để trống", {
                    className: "my-toast-error",
                });
                return;
            }

            if (name.length > 20) {
                toast.error("Tên chức vụ tối đa 20 ký tự", {
                    className: "my-toast-error",
                });
                return;
            }

            await createRole({ name, description });

            toast.success("Thêm chức vụ thành công", {
                className: "my-toast-success",
            });

            setName("");
            setDescription("");
            fetchData();
        } catch (err: any) {
            toast.error(err.message || "Lỗi khi tạo role", {
                className: "my-toast-error",
            });
        }
    };

    // ===== DELETE =====
    const handleDelete = async (id: number) => {
        if (!confirm("Xóa role này?")) return;

        try {
            await deleteRole(id);

            toast.success("Xóa thành công", {
                className: "my-toast-success",
            });

            fetchData();
        } catch (err: any) {
            toast.error(err.message || "Không thể xóa", {
                className: "my-toast-error",
            });
        }
    };

    // ===== START EDIT =====
    const handleStartEdit = (role: any) => {
        setEditingId(role.id);
        setEditName(role.name);
        setEditDescription(role.description || "");
    };

    // ===== UPDATE =====
    const handleUpdate = async (id: number) => {
        try {
            await updateRole(id, {
                name: editName,
                description: editDescription,
            });

            toast.success("Cập nhật thành công", {
                className: "my-toast-success",
            });

            setEditingId(null);
            fetchData();
        } catch (err: any) {
            toast.error(err.message || "Cập nhật thất bại", {
                className: "my-toast-error",
            });
        }
    };

    return (
        <div className="layout">
            <Sidebar />

            <div className="container">
                <div className="title">Quản lý chức vụ</div>

                {/* CREATE FORM */}
                <div className="form">
                    <div className="form-group">
                        <label className="label">Tên chức vụ</label>
                        <input
                            className="input"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Nhập tên chức vụ"
                        />
                    </div>

                    <div className="form-group">
                        <label className="label">Mô tả</label>
                        <input
                            className="input"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Nhập mô tả"
                        />
                    </div>

                    <button className="button2" onClick={handleCreate}>
                        Thêm chức vụ mới
                    </button>
                </div>

                {/* TABLE */}
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {data.map((role) => (
                            <tr key={role.id}>
                                <td>{role.id}</td>

                                <td>
                                    {editingId === role.id ? (
                                        <input
                                            value={editName}
                                            onChange={(e) => setEditName(e.target.value)}
                                        />
                                    ) : (
                                        role.name
                                    )}
                                </td>

                                <td>
                                    {editingId === role.id ? (
                                        <input
                                            value={editDescription}
                                            onChange={(e) =>
                                                setEditDescription(e.target.value)
                                            }
                                        />
                                    ) : (
                                        role.description
                                    )}
                                </td>

                                {/* <td>
                                    {editingId === role.id ? (
                                        <>
                                            <span
                                                className="saveBtn"
                                                onClick={() => handleUpdate(role.id)}
                                            >
                                                Save
                                            </span>

                                            <span
                                                className="cancelBtn"
                                                onClick={() => setEditingId(null)}
                                            >
                                                Cancel
                                            </span>
                                        </>
                                    ) : (
                                        <>
                                            <span
                                                className="editBtn"
                                                onClick={() => handleStartEdit(role)}
                                            >
                                                Edit
                                            </span>

                                            <span
                                                className="deleteBtn"
                                                onClick={() => handleDelete(role.id)}
                                            >
                                                Delete
                                            </span>
                                        </>
                                    )}
                                </td> */}

                                <td>
                                    <div className="table-actions">
                                        {editingId === role.id ? (
                                            <>
                                                {/* SAVE */}
                                                <button
                                                    className="action-btn btn-save"
                                                    onClick={() => handleUpdate(role.id)}
                                                    title="Lưu"
                                                >
                                                    <Check size={18} />
                                                </button>

                                                {/* CANCEL */}
                                                <button
                                                    className="action-btn btn-cancelll"
                                                    onClick={() => setEditingId(null)}
                                                    title="Hủy"
                                                >
                                                    <X size={18} />
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                {/* EDIT */}
                                                <button
                                                    className="action-btn btn-edit"
                                                    onClick={() => handleStartEdit(role)}
                                                    title="Sửa"
                                                >
                                                    <Pencil size={16} />
                                                </button>

                                                {/* DELETE */}
                                                {/* <button
                                                    className="action-btn btn-delete"
                                                    onClick={() => handleDelete(role.id)}
                                                    title="Xóa"
                                                >
                                                    <Trash2 size={16} />
                                                </button> */}
                                                <button
                                                    className="action-btn btn-deleted"
                                                    onClick={() => setDeleteId(role.id)}
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <ConfirmModal
                open={deleteId !== null}
                title="Xác nhận xóa"
                message="Bạn có chắc chắn muốn xóa role này không?"
                onCancel={() => setDeleteId(null)}
                onConfirm={async () => {
                    if (!deleteId) return;

                    try {
                        await deleteRole(deleteId);

                        toast.success("Xóa thành công", {
                            className: "my-toast-success",
                        });

                        setDeleteId(null);
                        fetchData();
                    } catch (err: any) {
                        toast.error(
                            err.response?.data?.message || "Không thể xóa",
                            { className: "my-toast-error" }
                        );
                    }
                }}
            />
        </div>



    );
}