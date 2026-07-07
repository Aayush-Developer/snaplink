import { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import LinksHeader from "../components/LinksHeader.jsx";
import LinkCard from "../components/LinkCard.jsx";
import DeleteModal from "../components/DeleteModal.jsx";
import EditModal from "../components/EditModal.jsx";
import api from "../services/api.js";
import toast from "react-hot-toast";

import "../styles/mylinks.css";

function MyLinks() {
  const [links, setLinks] = useState([]);
const [editModal, setEditModal] = useState(false);
const [search, setSearch] = useState("");
const [selectedLink, setSelectedLink] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    fetchLinks();
  }, []);
const filteredLinks = links.filter((link) => {
  const query = search.toLowerCase();

  return (
    link.shortCode.toLowerCase().includes(query) ||
    link.targetURL.toLowerCase().includes(query)
  );
});
  const fetchLinks = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get("/url/codes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setLinks(res.data.code);
    } catch (err) {
      toast.error("Failed to load links");
    }
  };

  const deleteLink = (id) => {
    setSelectedId(id);
    setDeleteModal(true);
  };

  const confirmDelete = async () => {
  try {
    const token = localStorage.getItem("token");

    await api.delete(`/url/delete/${selectedId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setLinks((prev) =>
      prev.filter((link) => link.id !== selectedId)
    );

    toast.success("Link deleted successfully");
 
    setDeleteModal(false);
    setSelectedId(null);

  } catch (err) {
    toast.error(
      err.response?.data?.error || "Failed to delete link"
    );
  }
};

const editLink = (link) => {
  setSelectedLink(link);
  setEditModal(true);
};
const saveEditedLink = async (newAlias) => {
  try {
    const token = localStorage.getItem("token");

    await api.patch(
      `/url/update/${selectedLink.id}`,
      {
        code: newAlias,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setLinks((prev) =>
      prev.map((link) =>
        link.id === selectedLink.id
          ? {
              ...link,
              shortCode: newAlias,
            }
          : link
      )
    );

    toast.success("Alias updated successfully");

    setEditModal(false);
    setSelectedLink(null);

  } catch (err) {
    toast.error(
      err.response?.data?.error ||
      "Failed to update alias"
    );
  }
};

  return (
    <>
      <Navbar />

      <main className="links-page">

        <LinksHeader
  search={search}
  setSearch={setSearch}
/>

        <div className="links-list">

  {filteredLinks.length === 0 ? (

    <div className="empty-state">

      <h2>No links found</h2>

      <p>
        Try searching with another keyword.
      </p>

    </div>

  ) : (

    filteredLinks.map((link) => (
      <LinkCard
        key={link.id}
        link={link}
        onDelete={deleteLink}
        onEdit={editLink}
      />
    ))

  )}

</div>

      </main>

      <DeleteModal
        open={deleteModal}
        onClose={() => {
          setDeleteModal(false);
          setSelectedId(null);
        }}
        onConfirm={confirmDelete}
      />
      <EditModal
  open={editModal}
  onClose={() => {
    setEditModal(false);
    setSelectedLink(null);
  }}
  onSave={saveEditedLink}
  link={selectedLink}
/>
    </>
  );
}

export default MyLinks;