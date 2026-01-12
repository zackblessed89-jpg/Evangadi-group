import {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
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
          <img src={logo} alt="Evangadi Logo" />
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
