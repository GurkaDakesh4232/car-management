import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import '../components/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p className="footer-text">Developed by <strong>Gurka Dakesh</strong></p>
        <div className="social-icons">
          <a href="https://github.com/your-github" target="_blank" rel="noopener noreferrer">
            <FaGithub className="social-icon" />
          </a>
          <a href="https://www.linkedin.com/in/your-linkedin" target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="social-icon" />
          </a>
        </div>
        <p className="footer-description">Follow me on GitHub and LinkedIn for more updates!</p>
      </div>
    </footer>
  );
};

export default Footer;
