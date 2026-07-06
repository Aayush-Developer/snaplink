import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function ProfileCard() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    toast.success("Logged out successfully");

    navigate("/");
  };

  return (
    <div className="profile-card">

      <div className="profile-avatar">
        {user?.name?.charAt(0).toUpperCase()}
      </div>

      <h2>{user?.name}</h2>

      <p>{user?.email}</p>

      <div className="profile-info">

        <div className="info-row">
          <span>Full Name</span>
          <strong>{user?.name}</strong>
        </div>

        <div className="info-row">
          <span>Email Address</span>
          <strong>{user?.email}</strong>
        </div>

      </div>

      <button
        className="logout-btn"
        onClick={handleLogout}
      >
        Logout
      </button>

    </div>
  );
}

export default ProfileCard;