import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FiEye, FiEyeOff } from "react-icons/fi";

import api from "../services/api";

function LoginForm() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return toast.error("Please fill all fields");
    }

    try {
      setLoading(true);

      const res = await api.post("/user/login", {
        email,
        password,
      });

     
      localStorage.setItem("token", res.data.token);

    
      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      toast.success(res.data.success);

     
      navigate("/my-links");

    } catch (err) {
      toast.error(err.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>

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
            placeholder="Enter your password"
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

      <button
        className="auth-btn"
        type="submit"
        disabled={loading}
      >
        {loading ? "Signing In..." : "Login"}
      </button>

    </form>
  );
}

export default LoginForm;