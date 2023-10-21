import React from 'react';
import { FaGithub } from 'react-icons/fa';
import '../../css/Footer.css';

// Footer setup

function Footer() {
  return (
    <footer className="footer-container">
      <a href="https://github.com/DPdotexe" target="_blank" rel="noopener noreferrer" className="github-link">
        <FaGithub />
      </a>
      <div className="copyright-text">&copy; Copyright DP 2023. All rights reserved.</div>
    </footer>
  );
}

export default Footer;
