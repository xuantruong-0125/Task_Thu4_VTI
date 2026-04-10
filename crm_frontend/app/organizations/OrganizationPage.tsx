"use client";

import { useEffect, useState } from "react";
import {
  getOrganizations,
  createOrganization,
  deleteOrganization,
  updateOrganization,
} from "@/services/organizationService";

import OrganizationTree from "@/components/organization/OrganizationTree";
import Sidebar from "@/components/sidebar/Sidebar";
import ConfirmModal from "@/components/common/ConfirmModal";

import { toast } from "react-toastify";

import "./organization.css";

export default function OrganizationPage() {
  const [data, setData] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [parentId, setParentId] = useState<number | "">("");

  // 🔥 modal delete
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const fetchData = async () => {
    const res = await getOrganizations();
    setData(res);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ===== CREATE =====
  const handleCreate = async () => {
    if (!name) {
      toast.error("Tên chi nhánh không được để trống", {
        className: "my-toast-error",
      });
      return;
    }

    if (name.length > 20) {
      toast.error("Tên chi nhánh tối đa 50 ký tự", {
        className: "my-toast-error",
      });
      return;
    }

    try {
      await createOrganization({
        name,
        parentId: parentId || null,
      });

      toast.success("Thêm chi nhánh thành công", {
        className: "my-toast-success",
      });

      setName("");
      setParentId("");
      fetchData();
    } catch (err: any) {
      toast.error(
        err.response?.data?.message || "Thêm thất bại",
        { className: "my-toast-error" }
      );
    }
  };

  // ===== DELETE (mở modal) =====
  const handleDelete = (id: number) => {
    setDeleteId(id);
  };

  // ===== CONFIRM DELETE =====
  const handleConfirmDelete = async () => {
    if (!deleteId) return;

    try {
      await deleteOrganization(deleteId);

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
  };

  // ===== UPDATE =====
  const handleUpdate = async (id: number, name: string) => {
    const org = data.find((item) => item.id === id);

    try {
      await updateOrganization(id, {
        name,
        parentId: org?.parentId || null, // 🔥 giữ parent
      });

      toast.success("Cập nhật thành công", {
        className: "my-toast-success",
      });

      fetchData();
    } catch (err: any) {
      toast.error(
        err.response?.data?.message || "Cập nhật thất bại",
        { className: "my-toast-error" }
      );
    }
  };

  // 🔥 lấy name để hiển thị trong modal
  const currentOrg = data.find((item) => item.id === deleteId);

  return (
    <div className="page-wrapper">
      <Sidebar />

      <main className="main-content">
        <div className="container">
          <div className="title">Quản lý chi nhánh</div>

          {/* FORM */}
          <div className="form">
            {/* NAME */}
            <div className="form-group">
              <label className="label">Tên chi nhánh</label>
              <input
                className="input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nhập tên chi nhánh"
              />
            </div>

            {/* PARENT */}
            <div className="form-group">
              <label className="label">Đơn vị trực thuộc</label>
              <select
                className="select"
                value={parentId}
                onChange={(e) =>
                  setParentId(e.target.value ? Number(e.target.value) : "")
                }
              >
                <option value="">-- Không có (cấp cao nhất) --</option>
                {data.map((org) => (
                  <option key={org.id} value={org.id}>
                    {org.name}
                  </option>
                ))}
              </select>
            </div>
            <button className="button" onClick={handleCreate}>
              Thêm chi nhánh mới
            </button>
          </div>


          {/* TREE */}
          <div className="treeContainer">
            <OrganizationTree
              data={data}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
            />
          </div>
        </div>
      </main>

      {/* 🔥 CONFIRM MODAL */}
      <ConfirmModal
        open={deleteId !== null}
        title="Xác nhận xóa"
        message={`Bạn có chắc muốn xóa "${currentOrg?.name}" không?`}
        onCancel={() => setDeleteId(null)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}