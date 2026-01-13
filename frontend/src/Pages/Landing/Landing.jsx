import React, { useState } from "react";
import Login from "@/features/auth/Login/Login";
import Register from "@/features/auth/Register/Register";
import axios from "../../services/axiosConfig";
import classes from "./Landing.module.css";
import HowItWorks from "./HowItWorks/HowItWorks";

const Landing = () => {
  const [showHowItWorks, setShowHowItWorks] = useState(false);
  const [activeState, setActiveState] = useState("login"); // login, signup, forgot
  const [resetEmail, setResetEmail] = useState("");
  const [status, setStatus] = useState({ type: "", msg: "" });

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setStatus({ type: "loading", msg: "Checking email..." });

    try {
      const response = await axios.post("/user/forgot-password", {
        email: resetEmail.trim(),
      });

      setStatus({
        type: "success",
        msg: response.data.msg || "Check your email for the link!",
      });
    } catch (err) {
      const errorMsg = err.response?.data?.msg || "Something went wrong.";
      setStatus({ type: "error", msg: errorMsg });
    }
  };

  return (
    <section className={classes.landing_container}>
      <div className={classes.inner_container}>
        {/* --- LEFT SIDE: AUTHENTICATION BOX --- */}
        <div className={classes.auth_box}>
          {/* VIEW 1: LOGIN */}
          {activeState === "login" && (
            <div className={classes.form_wrapper}>
              <h3>Login to your account</h3>
              <p className={classes.toggle_link}>
                Don't have an account?{" "}
                <span onClick={() => setActiveState("signup")}>
                  Create a new account
                </span>
              </p>
              <Login onForgotClick={() => setActiveState("forgot")} />
            </div>
          )}

          {/* VIEW 2: SIGNUP */}
          {activeState === "signup" && (
            <div className={classes.form_wrapper}>
              <h3>Join the network</h3>
              <p className={classes.toggle_link}>
                Already have an account?{" "}
                <span onClick={() => setActiveState("login")}>Sign in</span>
              </p>
              <Register
                hideHeader={true}
                onSuccess={() => setActiveState("login")}
              />
              <p className={classes.terms_text}>
                I agree to the {""}
                <a
                  href="https://www.evangadi.com/legal/privacy/"
                  target="_blank"
                  rel="noreferrer"
                >
                  privacy policy{""}
                </a>
                {""} and {""}
                <a
                  href="https://www.evangadi.com/legal/privacy/"
                  target="_blank"
                  rel="noreferrer"
                >
                  terms of service
                </a>
                .
              </p>

              <div className={classes.bottom_link}>
                <span onClick={() => setActiveState("login")}>
                  Already have an account?
                </span>
              </div>
            </div>
          )}

          {/* VIEW 3: FORGOT PASSWORD */}
          {activeState === "forgot" && (
            <div className={classes.form_wrapper}>
              <h3>Reset Password</h3>
              <p className={classes.toggle_link}>
                Enter your email to receive a reset link.
              </p>
              <form
                onSubmit={handleForgotPassword}
                className={classes.forgot_form}
              >
                <input
                  type="email"
                  placeholder="Email address"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  required
                  className={classes.input_field}
                />
                <button type="submit" className={classes.orange_btn}>
                  Reset Password
                </button>
              </form>

              {status.msg && (
                <p
                  className={
                    status.type === "error"
                      ? classes.error_msg
                      : classes.success_msg
                  }
                >
                  {status.msg}
                </p>
              )}

              <div className={classes.bottom_link}>
                <span
                  onClick={() => {
                    setActiveState("login");
                    setStatus({ type: "", msg: "" });
                  }}
                >
                  Back to Login
                </span>
              </div>
            </div>
          )}
        </div>{" "}
        {/* --- RIGHT SIDE: ABOUT SECTION --- */}
        <div className={classes.landing_about}>
          <p className={classes.about_label}>About</p>
          <h1>Evangadi Networks </h1>
          <div className={classes.about_content}>
            <p>
              No matter what stage of life you are in, whether you’re just
              starting elementary school or being promoted to CEO of a Fortune
              500 company, you have much to offer to those who are trying to
              follow in your footsteps.
            </p>

            <p>
              Wheather you are willing to share your knowledge or you are just
              looking to meet mentors of your own, please start by joining the
              network here.
            </p>
          </div>
          <button
            className={classes.how_it_works_btn}
            onClick={() => setShowHowItWorks(true)}
          >
            HOW IT WORKS
          </button>
          {showHowItWorks && (
            <HowItWorks onClose={() => setShowHowItWorks(false)} />
          )}
        </div>
      </div>
    </section>
  );
};

export default Landing;
