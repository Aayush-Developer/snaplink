import { Link, useNavigate, NavLink } from "react-router-dom";
import toast from "react-hot-toast";
import "../styles/navbar.css";
import { FiLink } from "react-icons/fi";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <header className="navbar">
      <div className="nav-left">
        <Link to="/" className="logo">
          <span className="logo-icon">
            <FiLink />
          </span>
          SnapLink
        </Link>

        <nav className="nav-links">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Home
          </NavLink>

          {token && (
            <NavLink
              to="/my-links"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              My Links
            </NavLink>
          )}
        </nav>
      </div>

      <div className="auth-links">
        {!token ? (
          <>
            <NavLink to="/login" className="login-link">
              Login
            </NavLink>

            <NavLink to="/signup" className="signup-btn">
              Sign Up
            </NavLink>
          </>
        ) : (
          <>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                isActive ? "profile-link active-link" : "profile-link"
              }
            >
              Profile
            </NavLink>

            <button className="logout-nav-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </header>
  );
}

export default Navbar;
