import { useEffect, useState } from "react";

function EditModal({
  open,
  onClose,
  onSave,
  link,
}) {
  const [alias, setAlias] = useState("");

  useEffect(() => {
    if (link) {
      setAlias(link.shortCode);
    }
  }, [link]);

  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!alias.trim()) return;

    onSave(alias);
  };

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
    >
      <div
        className="edit-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <h2>Edit Short Link</h2>

        <p>Update your custom alias.</p>

        <form onSubmit={handleSubmit}>

          <label>Alias</label>

          <input
            type="text"
            value={alias}
            onChange={(e) => setAlias(e.target.value)}
            placeholder="Enter new alias"
          />

          <div className="edit-actions">

            <button
              type="button"
              className="cancel-btn"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="save-btn"
            >
              Save Changes
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}

export default EditModal;