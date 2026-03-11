import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { changePassword } from "../../features/auth/authService";
import classes from "./ChangePassword.module.css";

function ChangePassword() {
  const navigate = useNavigate();
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
  });
  const [status, setStatus] = useState({ msg: "", type: "" }); //holds a feedback message (msg) and its type (success or error).

  const handleChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  }; //dynamic input handler.

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwords.newPassword.length < 8) {
      return setStatus({
        msg: "New password must be at least 8 characters long.",
        type: "error",
      });
    }
    try {
      await changePassword(passwords);

      //Update status message
      setStatus({
        msg: "Password updated successfully! Redirecting...",
        type: "success",
      });

      // Clear fields
      setPasswords({ currentPassword: "", newPassword: "" });

      //Wait 1 second then navigate to Home
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (err) {
      setStatus({ msg: err.message, type: "error" });
    }
  };

  return (
    <div className={classes.change_password_container}>
      <h3>Update Password</h3>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <input
            name="currentPassword"
            type="password"
            placeholder="Current Password"
            value={passwords.currentPassword}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "10px" }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <input
            name="newPassword"
            type="password"
            placeholder="New Password (min 8 chars)"
            value={passwords.newPassword}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "10px" }}
          />
        </div>
        <button type="submit" className="btn_blue">
          Update Password
        </button>
      </form>
      {status.msg && (
        <p
          style={{
            color: status.type === "success" ? "green" : "red",
            marginTop: "10px",
            fontWeight: "bold",
          }}
        >
          {status.msg}
        </p>
      )}
    </div>
  );
}

export default ChangePassword;
