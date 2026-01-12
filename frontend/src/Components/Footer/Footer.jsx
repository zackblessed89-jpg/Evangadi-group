import React from "react";
import styles from "./Footer.module.css";
import logoWhite from "../../assets/images/footer-logo.png";
import { Facebook, Instagram, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className={styles.footerWrapper}>
      <div className={styles.footerContainer}>
        {/* Column 1: Socials */}
        <div className={styles.footerSec}>
          <img
            src={logoWhite}
            alt="Evangadi Logo"
            className={styles.footerLogo}
          />
          <div className={styles.socialIcons}>
            <a
              href="https://www.facebook.com/evangaditech"
              target="_blank"
              rel="noreferrer"
              className={styles.socialLink}
            >
              <Facebook size={20} />
            </a>
            <a
              href="https://www.instagram.com/evangaditech/"
              target="_blank"
              rel="noreferrer"
              className={styles.socialLink}
            >
              <Instagram size={20} />
            </a>
            <a
              href="https://www.youtube.com/@EvangadiTech"
              target="_blank"
              rel="noreferrer"
              className={styles.socialLink}
            >
              <Youtube size={20} />
            </a>
          </div>
        </div>

        {/* Column 2: Useful Links (Direct to official site) */}
        <div className={styles.footerSec}>
          <h3 className={styles.columnTitle}>Useful Link</h3>
          <ul className={styles.footerList}>
            <li>
              <a
                href="https://www.evangadi.com/how-it-works/"
                target="_blank"
                rel="noreferrer"
              >
                How it works
              </a>
            </li>
            <li>
              <a
                href="https://www.evangadi.com/legal/terms/"
                target="_blank"
                rel="noreferrer"
              >
                Terms of Service
              </a>
            </li>
            <li>
              <a
                href="https://www.evangadi.com/legal/privacy/"
                target="_blank"
                rel="noreferrer"
              >
                Privacy policy
              </a>
            </li>
          </ul>
        </div>

        {/* Column 3: Contact Info (Active Links) */}
        <div className={styles.footerSec}>
          <h3 className={styles.columnTitle}>Contact Info</h3>
          <p className={styles.contactText}>
            <a
              href="https://www.evangadi.com"
              target="_blank"
              rel="noreferrer"
              className={styles.contactLink}
            >
              Evangadi Networks
            </a>
          </p>
          <p className={styles.contactText}>
            <a
              href="group1:support@evangadi.com"
              className={styles.contactLink}
            >
              support@evangadi.com
            </a>
          </p>
          <p className={styles.contactText}>
            <a href="tel:+251xxxxxxxxx" className={styles.contactLink}>
              +251-xxx-xxx-xxx
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
