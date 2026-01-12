import React, { useState } from "react";
import styles from "./Footer.module.css";
import logoWhite from "../../assets/images/footer-logo.png";
import {
  Facebook,
  Instagram,
  Youtube,
  CheckCircle,
  Shield,
  Info,
} from "lucide-react";

const Footer = () => {
  // Hooks for modal
  const [modalContent, setModalContent] = useState(""); 
  const [modalTitle, setModalTitle] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Open dynamic modal
  const openModal = (title, content) => {
    setModalTitle(title);
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent("");
    setModalTitle("");
  };

  // Detailed Terms of Service
  const termsContent = [
    {
      section: "User Responsibilities",
      items: [
        {
          icon: <CheckCircle size={18} />,
          text: "Respect intellectual property rights of others.",
        },
        {
          icon: <CheckCircle size={18} />,
          text: "Do not engage in harmful, abusive, or illegal activities.",
        },
        {
          icon: <CheckCircle size={18} />,
          text: "Ensure that all submitted content is accurate and lawful.",
        },
      ],
    },
    {
      section: "Account Security",
      items: [
        {
          icon: <Shield size={18} />,
          text: "Keep your login credentials confidential.",
        },
        {
          icon: <Shield size={18} />,
          text: "Report unauthorized access or suspicious activity immediately.",
        },
      ],
    },
    {
      section: "General Terms",
      items: [
        {
          icon: <Info size={18} />,
          text: "Evangadi reserves the right to update terms at any time.",
        },
        {
          icon: <Info size={18} />,
          text: "Full terms are binding and legally enforceable.",
        },
      ],
    },
  ];

  // Detailed Privacy Policy
  const privacyContent = [
    {
      section: "Information Collection",
      items: [
        {
          icon: <Shield size={18} />,
          text: "We collect data to improve your experience.",
        },
        {
          icon: <Shield size={18} />,
          text: "Personal information includes name, email, and usage data.",
        },
      ],
    },
    {
      section: "Data Usage",
      items: [
        {
          icon: <CheckCircle size={18} />,
          text: "Data is used to provide services and support.",
        },
        {
          icon: <CheckCircle size={18} />,
          text: "We do not sell or share your personal data with third parties.",
        },
      ],
    },
    {
      section: "Security Measures",
      items: [
        {
          icon: <Shield size={18} />,
          text: "All sensitive data is encrypted.",
        },
        {
          icon: <Shield size={18} />,
          text: "Regular security audits are performed.",
        },
      ],
    },
    {
      section: "User Rights",
      items: [
        {
          icon: <Info size={18} />,
          text: "You may request access to your data anytime.",
        },
        {
          icon: <Info size={18} />,
          text: "You can request data deletion as per legal rights.",
        },
      ],
    },
  ];

  return (
    <>
      <footer className={styles.footerWrapper}>
        <div className={styles.footerContainer}>
          {/* Column 1: Socials */}
          <div className={styles.footerSec}>
            <img
              src={logoWhite}
              alt="Evangadi Logo"
              className={styles.footerLogo}
            />
            <p className={styles.brandText}>
              Empowering developers through community, knowledge, and
              innovation.
            </p>
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

          {/* Column 2: Useful Links */}
          <div className={styles.footerSec}>
            <h3 className={styles.columnTitle}>Useful Link</h3>
            <ul className={styles.footerList}>
              <li>
                <a
                  href="#"
                  onClick={() =>
                    openModal(
                      "How it Works",
                      "Evangadi connects developers with projects, learning resources, and a community of peers. Learn and grow in a structured and supportive environment."
                    )
                  }
                >
                  How it works
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={() => openModal("Terms of Service", termsContent)}
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={() => openModal("Privacy Policy", privacyContent)}
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
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

      {/* ✅ Professional Dynamic Modal */}
      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <h2>{modalTitle}</h2>
              <button className={styles.closeButton} onClick={closeModal}>
                &times;
              </button>
            </div>
            <div className={styles.modalBody}>
              {Array.isArray(modalContent) ? (
                modalContent.map((section, idx) => (
                  <div key={idx} className={styles.modalSection}>
                    <h3 className={styles.modalSectionTitle}>
                      {section.section}
                    </h3>
                    <ul className={styles.modalList}>
                      {section.items.map((item, i) => (
                        <li key={i} className={styles.modalListItem}>
                          <span className={styles.modalIcon}>{item.icon}</span>
                          <span>{item.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))
              ) : (
                <p>{modalContent}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;
