import Navbar from "../components/Navbar";
import ProfileCard from "../components/ProfileCard";

import "../styles/profile.css";

function Profile() {
  return (
    <>
      <Navbar />

      <section className="profile-page">

        <div className="profile-header">

          <h1>My Profile</h1>

          <p>
            View your account information and manage your account.
          </p>

        </div>

        <ProfileCard />

      </section>
    </>
  );
}

export default Profile;