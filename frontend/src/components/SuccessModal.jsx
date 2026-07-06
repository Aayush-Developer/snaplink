import { useEffect, useState } from "react";
import { FiCopy, FiExternalLink, FiX } from "react-icons/fi";
import "../styles/successModal.css";

function SuccessModal({
  open,
  onClose,
  originalUrl,
  shortUrl,
}) {
  const [copied, setCopied] = useState(false);

  const shortCode = shortUrl?.split("/").pop();

  useEffect(() => {
    if (!open) {
      setCopied(false);
    }
  }, [open]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  if (!open) return null;

  const copyLink = async () => {
    await navigator.clipboard.writeText(shortUrl);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
    >
      <div
        className="success-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="close-btn"
          onClick={onClose}
        >
          <FiX />
        </button>

        <h2>🎉 Your link is ready!</h2>

        <div className="generated-link-box">

          <span className="generated-label">
            Your Short Link
          </span>

          <div className="generated-link">
              {shortUrl}
          </div>

          <div className="modal-buttons">

            <a
              href={shortUrl}
              target="_blank"
              rel="noreferrer"
            >
              <button className="visit-btn">
                <FiExternalLink />
                Visit Link
              </button>
            </a>

            <button
              className="copy-btn"
              onClick={copyLink}
            >
              <FiCopy />

              {copied ? "Copied!" : "Copy Link"}
            </button>

          </div>

        </div>

        <hr className="modal-divider" />

        <div className="original-url">

          <label>Original URL</label>

          <div className="original-box">
            {originalUrl}
          </div>

        </div>

      </div>
    </div>
  );
}

export default SuccessModal;