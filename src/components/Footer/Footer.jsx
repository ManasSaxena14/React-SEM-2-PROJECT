import React from 'react';
import { Link } from 'react-router-dom';
// import logo from '../../assets/logo.png'; // Uncomment if you want to use the logo

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-gradient-bar"></div>
      <div className="footer-content">
        {/* <img src={logo} alt="logo" className="footer-logo" /> */}
        <div className="footer-links">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/portfolio">Portfolio</Link>
          <Link to="/blog">Blog</Link>
        </div>
        <div className="footer-copy">
          <p>Copyright © 2025, Cryptoplace - All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
