// // // import { useState } from "react";

// // // export default function TreeNode({
// // //   node,
// // //   level = 0,
// // //   onDelete, // 🔥 nhận prop
// // // }: any) {
// // //   const [open, setOpen] = useState(true);

// // //   const handleDelete = () => {
// // //     const confirmDelete = window.confirm(
// // //       `Xóa "${node.name}" ?`
// // //     );

// // //     if (!confirmDelete) return;

// // //     onDelete(node.id);
// // //   };

// // //   return (
// // //     <>
// // //       <div
// // //         className="tree-node"
// // //         style={{ "--level": level } as React.CSSProperties}
// // //       >
// // //         {/* LEFT */}
// // //         <div className="tree-left">
// // //           {node.children?.length > 0 && (
// // //             <span
// // //               className="tree-toggle"
// // //               onClick={() => setOpen(!open)}
// // //             >
// // //               {open ? "▼" : "▶"}
// // //             </span>
// // //           )}

// // //           <span className="tree-label">{node.name}</span>
// // //         </div>

// // //         {/* RIGHT (DELETE BUTTON) */}
// // //         <button className="tree-delete" onClick={handleDelete}>
// // //           ✕
// // //         </button>
// // //       </div>

// // //       {open &&
// // //         node.children?.map((child: any) => (
// // //           <TreeNode
// // //             key={child.id}
// // //             node={child}
// // //             level={level + 1}
// // //             onDelete={onDelete} // 🔥 truyền tiếp
// // //           />
// // //         ))}
// // //     </>
// // //   );
// // // }

// // import { useState } from "react";
// // import toast from "react-hot-toast";

// // export default function TreeNode({
// //   node,
// //   level = 0,
// //   onDelete,
// //   onUpdate, // 🔥 thêm
// // }: any) {
// //   const [open, setOpen] = useState(true);
// //   const [editing, setEditing] = useState(false);
// //   const [name, setName] = useState(node.name);

// //   const handleDelete = () => {
// //     const confirmDelete = window.confirm(`Xóa "${node.name}" ?`);
// //     if (!confirmDelete) return;

// //     onDelete(node.id);
// //   };

// //   const handleUpdate = async () => {
// //     try {
// //       await onUpdate(node.id, name);
// //       toast.success("Cập nhật thành công");
// //       setEditing(false);
// //     } catch (err: any) {
// //       toast.error(err.message);
// //     }
// //   };

// //   return (
// //     <>
// //       <div
// //         className="tree-node"
// //         style={{ "--level": level } as React.CSSProperties}
// //       >
// //         {/* LEFT */}
// //         <div className="tree-left">
// //           {node.children?.length > 0 && (
// //             <span
// //               className="tree-toggle"
// //               onClick={() => setOpen(!open)}
// //             >
// //               {open ? "▼" : "▶"}
// //             </span>
// //           )}

// //           {editing ? (
// //             <input
// //               className="tree-input"
// //               value={name}
// //               onChange={(e) => setName(e.target.value)}
// //             />
// //           ) : (
// //             <span className="tree-label">{node.name}</span>
// //           )}
// //         </div>

// //         {/* RIGHT */}
// //         <div className="tree-actions">
// //           {editing ? (
// //             <>
// //               <button className="tree-save" onClick={handleUpdate}>
// //                 💾
// //               </button>
// //               <button
// //                 className="tree-cancel"
// //                 onClick={() => {
// //                   setEditing(false);
// //                   setName(node.name);
// //                 }}
// //               >
// //                 ✕
// //               </button>
// //             </>
// //           ) : (
// //             <>
// //               <button
// //                 className="tree-edit"
// //                 onClick={() => setEditing(true)}
// //               >
// //                 ✎
// //               </button>

// //               <button
// //                 className="tree-delete"
// //                 onClick={handleDelete}
// //               >
// //                 🗑
// //               </button>
// //             </>
// //           )}
// //         </div>
// //       </div>

// //       {open &&
// //         node.children?.map((child: any) => (
// //           <TreeNode
// //             key={child.id}
// //             node={child}
// //             level={level + 1}
// //             onDelete={onDelete}
// //             onUpdate={onUpdate} // 🔥 truyền tiếp
// //           />
// //         ))}
// //     </>
// //   );
// // }


// import { useState } from "react";
// import toast from "react-hot-toast";
// // Import các icon cần thiết
// import {
//   ChevronDown,
//   ChevronRight,
//   Pencil,
//   Trash2,
//   Check,
//   X,
//   Save
// } from "lucide-react";

// export default function TreeNode({
//   node,
//   level = 0,
//   onDelete,
//   onUpdate,
// }: any) {
//   const [open, setOpen] = useState(true);
//   const [editing, setEditing] = useState(false);
//   const [name, setName] = useState(node.name);

//   const handleDelete = () => {
//     const confirmDelete = window.confirm(`Xóa "${node.name}" ?`);
//     if (!confirmDelete) return;
//     onDelete(node.id);
//   };

//   const handleUpdate = async () => {
//     try {
//       await onUpdate(node.id, name);
//       // toast.success("Cập nhật thành công");
//       toast.success("Cập nhật thành công", {
//         className: "my-toast-success",
//       });
//       setEditing(false);
//     } catch (err: any) {
//       toast.error(err.message);
//     }
//   };

//   return (
//     <>
//       <div
//         className="tree-node flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg group"
//         style={{ "--level": level } as React.CSSProperties}
//       >
//         {/* LEFT */}
//         <div className="tree-left flex items-center gap-2">
//           {node.children?.length > 0 && (
//             <button
//               className="tree-toggle text-gray-500 hover:text-blue-600 transition-colors"
//               onClick={() => setOpen(!open)}
//             >
//               {open ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
//             </button>
//           )}

//           {editing ? (
//             <input
//               className="tree-input border rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//               value={name}
//               autoFocus
//               onChange={(e) => setName(e.target.value)}
//               onKeyDown={(e) => e.key === 'Enter' && handleUpdate()}
//             />
//           ) : (
//             <span className="tree-label text-gray-700">{node.name}</span>
//           )}
//         </div>

//         {/* RIGHT - ACTIONS */}
//         <div className="tree-actions flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
//           {editing ? (
//             <>
//               <button
//                 className="p-1 text-green-600 hover:bg-green-50 rounded"
//                 onClick={handleUpdate}
//                 title="Lưu"
//               >
//                 <Check size={18} />
//               </button>
//               <button
//                 className="p-1 text-gray-400 hover:bg-gray-100 rounded"
//                 onClick={() => {
//                   setEditing(false);
//                   setName(node.name);
//                 }}
//                 title="Hủy"
//               >
//                 <X size={18} />
//               </button>
//             </>
//           ) : (
//             <>
//               <button
//                 className="p-1 text-blue-500 hover:bg-blue-50 rounded"
//                 onClick={() => setEditing(true)}
//                 title="Chỉnh sửa"
//               >
//                 <Pencil size={16} />
//               </button>

//               <button
//                 className="p-1 text-red-500 hover:bg-red-50 rounded"
//                 onClick={handleDelete}
//                 title="Xóa"
//               >
//                 <Trash2 size={16} />
//               </button>
//             </>
//           )}
//         </div>
//       </div>

//       {open &&
//         node.children?.map((child: any) => (
//           <div key={child.id} className="ml-4 border-l border-gray-200">
//             <TreeNode
//               node={child}
//               level={level + 1}
//               onDelete={onDelete}
//               onUpdate={onUpdate}
//             />
//           </div>
//         ))}
//     </>
//   );
// }


import { useState } from "react";
import toast from "react-hot-toast";
import { ChevronDown, ChevronRight, Pencil, Trash2, Check, X } from "lucide-react";

export default function TreeNode({ node, level = 0, onDelete, onUpdate }: any) {
  const [open, setOpen] = useState(true);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(node.name);

  const handleDelete = () => {
     onDelete(node.id);
  };

  const handleUpdate = async () => {
    try {
      await onUpdate(node.id, name);
      toast.success("Cập nhật thành công", { className: "my-toast-success" });
      setEditing(false);
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return (
    <>
      <div 
        className="tree-node" 
        style={{ "--level": level } as React.CSSProperties}
      >
        {/* LEFT */}
        <div className="tree-left">
          {node.children?.length > 0 && (
            <button className="tree-toggle" onClick={() => setOpen(!open)}>
              {open ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
            </button>
          )}

          {editing ? (
            <input
              className="tree-input"
              value={name}
              autoFocus
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleUpdate()}
            />
          ) : (
            <span className="tree-label">{node.name}</span>
          )}
        </div>

        {/* RIGHT - ACTIONS */}
        <div className="tree-actions">
          {editing ? (
            <>
              <button className="action-btn btn-saved" onClick={handleUpdate} title="Lưu">
                <Check size={18} />
              </button>
              <button className="action-btn btn-canceled" onClick={() => { setEditing(false); setName(node.name); }} title="Hủy">
                <X size={18} />
              </button>
            </>
          ) : (
            <>
              <button className="action-btn btn-edit" onClick={() => setEditing(true)} title="Sửa">
                <Pencil size={16} />
              </button>
              <button className="action-btn btn-deleted" onClick={handleDelete} title="Xóa">
                <Trash2 size={16} />
              </button>
            </>
          )}
        </div>
      </div>

      {open && node.children?.map((child: any) => (
        <div key={child.id} className="tree-children">
          <TreeNode node={child} level={level + 1} onDelete={onDelete} onUpdate={onUpdate} />
        </div>
      ))}
    </>
  );
}