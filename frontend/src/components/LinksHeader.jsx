import { FiSearch } from "react-icons/fi";

function LinksHeader({ search, setSearch }) {
  return (
    <div className="links-header">

      <div>

        <h1>My Links</h1>

        <p>
          Manage and organize all your shortened URLs.
        </p>

      </div>

      <div className="search-box">

        <FiSearch className="search-icon" />

        <input
          type="text"
          placeholder="Search by alias or URL..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>

    </div>
  );
}

export default LinksHeader;