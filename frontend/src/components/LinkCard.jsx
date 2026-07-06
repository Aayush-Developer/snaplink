import { useState } from "react";
import toast from "react-hot-toast";

function LinkCard({
  link,
  onDelete,
  onEdit,
}) {
  const [copied, setCopied] = useState(false);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(
        `http://localhost:8000/${link.shortCode}`
      );

      setCopied(true);
      toast.success("Link copied");

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      toast.error("Failed to copy link");
    }
  };

  return (
    <div className="link-card">

      <div className="link-top">

        <div>

          <span className="label">
            Short Link
          </span>

          <h3>
            http://localhost:8000/{link.shortCode}
          </h3>

        </div>

        <div className="action-buttons">

          <a
            href={`http://localhost:8000/${link.shortCode}`}
            target="_blank"
            rel="noreferrer"
          >
            <button className="visit-btn">
              Visit
            </button>
          </a>

          <button
            className={`copy-btn ${copied ? "copied" : ""}`}
            onClick={copyLink}
            disabled={copied}
          >
            {copied ? "Copied!" : "Copy"}
          </button>

        </div>

      </div>

      <div className="original-section">

        <span className="label">
          Original URL
        </span>

        <p>{link.targetURL}</p>

      </div>

      <div className="link-bottom">

        <span>
          Created{" "}
          {new Date(link.createdAt).toLocaleDateString()}
        </span>

        <div>

          <button
            className="edit-btn"
            onClick={() => onEdit(link)}
          >
            Edit
          </button>

          <button
            className="delete-btn"
            onClick={() => onDelete(link.id)}
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  );
}

export default LinkCard;