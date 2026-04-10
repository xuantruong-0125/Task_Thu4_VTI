"use client";
import "./confirm.css"

type Props = {
  open: boolean;
  title?: string;
  message?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmModal({
  open,
  title = "Xác nhận",
  message = "Bạn có chắc chắn muốn thực hiện hành động này?",
  onConfirm,
  onCancel,
}: Props) {
  if (!open) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>{title}</h3>
        <p>{message}</p>

        <div className="modal-actions">
          <button className="btn-cancel" onClick={onCancel}>
            Hủy
          </button>

          <button className="btn-delete" onClick={onConfirm}>
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
}