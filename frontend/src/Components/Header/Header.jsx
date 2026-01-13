import {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import classes from "./Header.module.css";
import logo from "../../assets/images/Header-logo.png";
import HowItWorks from "../../Pages/Landing/HowItWorks/HowItWorks";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showHowItWorks, setShowHowItWorks] = useState(false);

  const handleAuth = () => {
    if (user) {
      // If logged in, log the user out and redirect to home
      logout();
      navigate("/");
    } else {
      // If not logged in, send them to the register/login page
      navigate("/register");
    }
  };

  return (
    <>
    <header className={classes.headerWrapper}>
      <div className={classes.headerContainer}>
        {/* Logo links back to the landing page */}
        <Link to="/" className={classes.logoLink}>
          <img src={logo} alt="Evangadi Logo" className={classes.logoImg} />
        </Link>

        <nav className={classes.navMenu}>
          <Link to="/" className={classes.navItem}>
            Home
          </Link>

          <a
            className={classes.navItem}
            onClick={() => setShowHowItWorks(true)}
          >
            How it Works
          </a>
          {/* Strict check for logged-in user */}
          {user?.userid && (
            <>
              <Link to="/settings" className={classes.navItem}>
                Settings
              </Link>
              <div className={classes.navItem}>
                <ThemeToggle />
              </div>
            </>
          )}

          <button className={classes.authButton} onClick={handleAuth}>
            {user ? "LOG OUT" : "SIGN IN"}
          </button>
        </nav>
      </div>
    </header>
     {showHowItWorks && (
        <HowItWorks onClose={() => setShowHowItWorks(false)} />
  )
  }
  </>
  );
};

export default Header;
