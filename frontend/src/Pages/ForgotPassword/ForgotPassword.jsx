import React, { useState } from "react";
import { Link } from "react-router-dom";
import { forgotPassword } from "../../features/auth/authService";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Calls the API to send the email
      const response = await forgotPassword(email);
      setMessage({
        text: response.msg || "Reset link sent! Please check your email.",
        type: "success",
      });
    } catch (err) {
      setMessage({ text: err.message, type: "error" });
    }
  };

  return (
    <section className="container">
      <div className="reset_container">
        <h3>Reset Password</h3>
        <p>Enter your email to receive a reset link.</p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="btn_blue">
            Send Reset Link
          </button>
        </form>

        {message.text && (
          <p
            style={{
              color: message.type === "success" ? "green" : "red",
              marginTop: "10px",
            }}
          >
            {message.text}
          </p>
        )}

        <div style={{ marginTop: "15px" }}>
          <Link to="/login">Back to Login</Link>
        </div>
      </div>
    </section>
  );
}

export default ForgotPassword;
