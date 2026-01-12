import React, { useState } from "react";
import { registerUser } from "../authService";
import classes from "./Register.module.css";
import { useNavigate } from "react-router-dom";
import Loader from "../../../components/Loader/Loader";

const Register = ({ onSuccess }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await registerUser(formData);

      // STOP loading so the spinner disappears
      setLoading(false);
      // Trigger success state
      setSuccess(true);

      // Wait 1.5 seconds, then switch to Login view
      setTimeout(() => {
        if (onSuccess) {
          onSuccess(); // Switches the view in Landing.jsx
        } else {
          navigate("/login"); // Fallback for routing
        }
      }, 1500);
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.msg || err.message);
    }
  };

  return (
    <div className={classes.form_wrapper}>
      {error && <p className={classes.error_msg}>{error}</p>}

      <form onSubmit={handleSubmit} className={classes.form}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
          disabled={loading || success}
        />

        <div className={classes.name_row}>
          <input
            type="text"
            name="firstname"
            placeholder="First Name"
            onChange={handleChange}
            required
            disabled={loading || success}
          />
          <input
            type="text"
            name="lastname"
            placeholder="Last Name"
            onChange={handleChange}
            required
            disabled={loading || success}
          />
        </div>

        <input
          type="text"
          name="username"
          placeholder="User Name"
          onChange={handleChange}
          required
          disabled={loading || success}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
          disabled={loading || success}
        />

        <button
          type="submit"
          className={classes.blue_btn}
          disabled={loading || success}
        >
          {loading ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                justifyContent: "center",
              }}
            >
              <Loader /> <span>Joining...</span>
            </div>
          ) : success ? (
            "Joined!"
          ) : (
            "Agree and Join"
          )}
        </button>

        {success && (
          <div className={classes.success_message_bottom}>
            <p>
              Welcome to the community, <strong>{formData.username}</strong>.
            </p>
            <small>Account Created! Redirecting to login...</small>
          </div>
        )}
      </form>
    </div>
  );
};

export default Register;
