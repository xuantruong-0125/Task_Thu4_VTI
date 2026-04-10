"use client";

import { useEffect, useState } from "react";
import "./menu.css";
import Sidebar from "@/components/sidebar/Sidebar";

interface Menu {
    id: number;
    name: string;
    parentId?: number;
}

export default function MenuPage() {
    const [menus, setMenus] = useState<Menu[]>([]);
    const [name, setName] = useState("");
    const [parentId, setParentId] = useState<number | null>(null);

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
        await fetch("http://localhost:8080/api/menus", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                parentId: parentId || null,
            }),
        });

        setName("");
        setParentId(null);
        fetchMenus();
    };

    // ================= DELETE =================
    const handleDelete = async (id: number) => {
        await fetch(`http://localhost:8080/api/menus/${id}`, {
            method: "DELETE",
        });

        fetchMenus();
    };

    return (
        <div className="page-wrapper">
            <Sidebar />
            <div className="menu-container">

                <h2>Create Menu</h2>

                <div className="form">
                    <input
                        type="text"
                        placeholder="Menu name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <select
                        value={parentId ?? ""}
                        onChange={(e) =>
                            setParentId(e.target.value ? Number(e.target.value) : null)
                        }
                    >
                        <option value="">No Parent</option>
                        {menus.map((m) => (
                            <option key={m.id} value={m.id}>
                                {m.name}
                            </option>
                        ))}
                    </select>

                    <button onClick={handleCreate}>Create</button>
                </div>

                <h2>Menu List</h2>

                <table className="menu-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Parent</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {menus.map((m) => (
                            <tr key={m.id}>
                                <td>{m.id}</td>
                                <td>{m.name}</td>
                                <td>
                                    {menus.find((p) => p.id === m.parentId)?.name || "-"}
                                </td>
                                <td>
                                    <button onClick={() => handleDelete(m.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );


}