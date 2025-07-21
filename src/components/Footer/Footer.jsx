import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer formal-footer">
      <div className="footer-content-flex">
        <div className="footer-copy-only">
          <p>© 2025 Crypto X Tracker. All rights reserved.</p>
          <p className="footer-disclaimer">The information provided on this site does not constitute investment advice. Please consult a financial advisor before making investment decisions.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
