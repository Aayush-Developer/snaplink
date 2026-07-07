import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FiEye, FiEyeOff } from "react-icons/fi";

import api from "../services/api.js";

function SignupForm() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      return toast.error("Please fill all fields");
    }

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      setLoading(true);

      const res = await api.post("/user/signup", {
        name,
        email,
        password,
      });

      toast.success(res.data.success);

      navigate("/login");

    } catch (err) {
      toast.error(err.response?.data?.error || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>

      <div className="input-group">
        <label>Full Name</label>

        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="input-group">
        <label>Email Address</label>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="input-group">
        <label>Password</label>

        <div className="password-wrapper">

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="button"
            className="eye-btn"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </button>

        </div>
      </div>

      <div className="input-group">
        <label>Confirm Password</label>

        <div className="password-wrapper">

          <input
            type={showConfirm ? "text" : "password"}
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button
            type="button"
            className="eye-btn"
            onClick={() => setShowConfirm(!showConfirm)}
          >
            {showConfirm ? <FiEyeOff /> : <FiEye />}
          </button>

        </div>
      </div>

      <button
        className="auth-btn"
        type="submit"
        disabled={loading}
      >
        {loading ? "Creating Account..." : "Create Account"}
      </button>

    </form>
  );
}

export default SignupForm;