import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { resetPassword } from "../../features/auth/authService";
import classes from "./ResetPassword.module.css";

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submit button clicked!"); // Check browser console for this!

    if (newPassword.length < 8) {
      return setMessage({
        text: "Password must be at least 8 characters.",
        type: "error",
      });
    }

    if (newPassword !== confirmPassword) {
      return setMessage({ text: "Passwords do not match!", type: "error" });
    }

    try {
      const response = await resetPassword(token, newPassword);

      setMessage({
        text: "Password updated successfully! Redirecting to login...",
        type: "success",
      });

      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (err) {
      console.error("API Error:", err);
      setMessage({
        text:
          err.response?.data?.msg ||
          "Something went wrong. Link might be expired.",
        type: "error",
      });
    }
  };

  return (
    <section className={classes.reset_container}>
      <div className={classes.inner_container}>
        <div className={classes.auth_box}>
          <div className={classes.form_wrapper}>
            <h3>Reset Your Password</h3>
            <p>Enter your new password below to regain access.</p>

            <form onSubmit={handleSubmit}>
              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className={classes.input_field}
              />
              {/* ADDED: Confirm password input so your check actually works */}
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className={classes.input_field}
              />
              <button type="submit" className={classes.orange_btn}>
                Update Password
              </button>
            </form>

            {/* FIXED: Changed 'status.msg' to 'message.text' */}
            {message.text && (
              <p
                className={
                  message.type === "error"
                    ? classes.error_msg
                    : classes.success_msg
                }
              >
                {message.text}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ResetPassword;
