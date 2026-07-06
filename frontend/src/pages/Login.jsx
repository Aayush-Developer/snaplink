import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";

import LoginForm from "../components/LoginForm";

import "../styles/auth.css";

function Login() {
  return (
    <>
      <Navbar />

      <section className="auth-page">
        <div className="auth-container">

          <div className="auth-header">

            <h1>Welcome Back 👋</h1>

            <p>
              Sign in to your SnapLink account and manage all your shortened
              links from one place.
            </p>

          </div>

          <LoginForm />

          <p className="auth-footer">
            Don't have an account?
            <Link to="/signup"> Create one</Link>
          </p>

        </div>
      </section>
    </>
  );
}

export default Login;