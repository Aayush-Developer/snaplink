import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import SuccessModal from "./SuccessModal.jsx";
import api from "../services/api.js";

const UrlForm = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("");
  const [alias, setAlias] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [generatedLink, setGeneratedLink] = useState(null);

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("1. Form Submitted");

    if (!url.trim()) {
      console.log("2. URL Empty");
      return toast.error("Please enter a URL");
    }

    console.log("3. URL Entered");

    if (!isValidUrl(url)) {
      console.log("4. Invalid URL");
      return toast.error("Please enter a valid URL");
    }

    console.log("5. URL Valid");

    const token = localStorage.getItem("token");

    if (!token) {
      console.log("6. No Token");
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    console.log("7. Token Found");

    try {
      setLoading(true);

      console.log("8. Sending API Request...");

      const res = await api.post(
        "/url/shorten",
        {
          url,
          code: alias || undefined,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("9. API Success");
      console.log(res.data);

      setGeneratedLink({
        original: res.data.target,
        short: `http://localhost:8000/${res.data.shortCode}`,
      });

      console.log("10. Generated Link Stored");

      setShowModal(true);

      console.log("11. Modal Opened");

      setUrl("");
      setAlias("");
    } catch (err) {
      console.error("❌ API ERROR:", err);

      if (err.response) {
        console.log("Response:", err.response.data);
      }

      toast.error(err.response?.data?.error || "Something went wrong");
    } finally {
      console.log("12. Loading False");
      setLoading(false);
    }
  };

  return (
    <>
      <form className="url-form" onSubmit={handleSubmit}>
        <h2 className="form-title">Create a New Link</h2>

        <div className="form-group">
          <label htmlFor="url">Paste your long URL</label>

          <input
            id="url"
            className="input"
            type="text"
            placeholder="https://example.com/my-long-url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="alias">Custom Alias (Optional)</label>

          <input
            id="alias"
            className="alias-input"
            type="text"
            placeholder="my-link"
            value={alias}
            onChange={(e) => setAlias(e.target.value)}
          />
        </div>

        <div className="button-row">
          <button
            className="generate-btn"
            type="submit"
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate Link"}
          </button>
        </div>
      </form>

      <SuccessModal
        open={showModal}
        onClose={() => setShowModal(false)}
        originalUrl={generatedLink?.original}
        shortUrl={generatedLink?.short}
      />
    </>
  );
};

export default UrlForm;