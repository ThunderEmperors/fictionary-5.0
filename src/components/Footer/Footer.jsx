import React from "react";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import styles from "./Footer.module.css";

import logo from "/assets/debsoc_logo.png";
const SocialLinks = () => {

  return (
    <div className={styles["footer"]}>
      <a
        href="https://www.facebook.com/debatingsociety3103.nitd"
        target="_blank"
        rel="noopener noreferrer"
        className={styles["social-icon"]}
      >
        <FacebookIcon style={{ color: "1739f3" }} /> 
      </a>
      <a
        href="https://www.youtube.com/@thedebatingsocietynitdurga3689"
        target="_blank"
        rel="noopener noreferrer"
        className={styles["social-icon"]}
      >
        <YouTubeIcon style={{ color: "red" }} /> 
      </a>
      <a
        href="https://www.debsocnitdgp.com/"
        target="_blank"
        rel="noopener noreferrer"
        className={styles["social-icon"]}
      >
        <img src={logo} alt="ds-logo" />
      </a>
      <a
        href="https://chat.whatsapp.com/BlUYd2SoQxZKda7saRGAyS"
        target="_blank"
        rel="noopener noreferrer"
        className={styles["social-icon"]}
      >
        <WhatsAppIcon style={{ color: "#75B06F" }} /> 
      </a>
      <a
        href="https://www.linkedin.com/company/debating-society-nit-durgapur/people/"
        target="_blank"
        rel="noopener noreferrer"
        className={styles["social-icon"]}
      >
        <LinkedInIcon style={{ color: "#76bdee" }}/>
      </a>
      <a
        href="https://www.instagram.com/debsocnitd/profilecard/?igsh=MWk2a25panBrNjJlbQ=="
        target="_blank"
        rel="noopener noreferrer"
        className={styles["social-icon"]}
      >
        <InstagramIcon style={{ color: "#df1b86" }} /> 
      </a>

    </div>
  );
};

export default SocialLinks;
