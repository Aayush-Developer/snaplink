import { Link } from "react-router-dom";

import Navbar from "../components/Navbar.jsx";
import SignupForm from "../components/SignupForm.jsx";


import "../styles/auth.css";

function Signup() {
  return (
    <>
      <Navbar />

      <section className="auth-page">
        <div className="auth-container">

          <div className="auth-header">

            <h1>Create your account </h1>

            <p>
              Join SnapLink and start shortening and managing your links in
              seconds.
            </p>

          </div>

          <SignupForm />

          <p className="auth-footer">
            Already have an account?
            <Link to="/login"> Login</Link>
          </p>

        </div>
      </section>
    </>
  );
}

export default Signup;