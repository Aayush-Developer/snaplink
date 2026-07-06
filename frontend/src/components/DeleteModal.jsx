import "../styles/DeleteModal.css";

function DeleteModal({
  open,
  onClose,
  onConfirm,
}) {
  if (!open) return null;

  return (
    <div
      className="delete-overlay"
      onClick={onClose}
    >
      <div
        className="delete-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <h2>Delete Link</h2>

        <p>
          Are you sure you want to delete this link?
        </p>

        <span>
          This action cannot be undone.
        </span>

        <div className="delete-actions">

          <button
            className="cancel-btn"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="confirm-delete-btn"
            onClick={onConfirm}
          >
            Delete
          </button>

        </div>
      </div>
    </div>
  );
}

export default DeleteModal;