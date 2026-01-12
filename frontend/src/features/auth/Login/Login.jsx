import React, { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { Eye, EyeOff } from "lucide-react";
//import { loginUser } from "../authService";
import classes from "./Login.module.css";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const { login } = useAuth();
  //const { setUser } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // 1. Validate length before starting the loading state
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    setLoading(true);

    try {
      await login({ email, password });
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={classes.container}>
      {error && <p className={classes.error}>{error}</p>}

      <form onSubmit={handleSubmit} className={classes.form}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <div className={classes.password_wrapper}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span className={classes.eye_icon} onClick={togglePasswordVisibility}>
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </span>
        </div>

        <div className={classes.forgot_link_container}>
          <Link to="/" className={classes.forgot_link}>
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          className={`orange_btn ${classes.login_submit}`}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </section>
  );
};

export default Login;
