import React, { useContext, useState } from "react";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import { CoinContext } from "../../context/CoinContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { setCurrency, isAuthenticated, logout } = useContext(CoinContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleCurrencyChange = (e) => {
    switch (e.target.value) {
      case "usd":
        setCurrency({ name: "usd", symbol: "$" });
        break;
      case "eur":
        setCurrency({ name: "eur", symbol: "€" });
        break;
      case "inr":
        setCurrency({ name: "inr", symbol: "₹" });
        break;
      default:
        setCurrency({ name: "usd", symbol: "$" });
        break;
    }
  };

  const handleAuthClick = () => {
    if (isAuthenticated) {
      logout();
    }
  };

  const handleHamburger = () => {
    setMenuOpen((prev) => !prev);
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="navbar">
      <div className="navbar-section navbar-left">
        <Link to="/" onClick={closeMenu}>
          <img src={logo} alt="logo" className="logo" />
        </Link>
      </div>
      <button
        className="hamburger"
        aria-label="Toggle navigation menu"
        aria-expanded={menuOpen}
        onClick={handleHamburger}
      >
        <span className="hamburger-bar"></span>
        <span className="hamburger-bar"></span>
        <span className="hamburger-bar"></span>
      </button>
      <ul className={`nav-links${menuOpen ? " open" : ""}`}>
        <li>
          <Link to="/" onClick={closeMenu}>Home</Link>
        </li>
        <li>
          <Link to="/about" onClick={closeMenu}>About</Link>
        </li>
        <li>
          <Link to="/portfolio" onClick={closeMenu}>Portfolio</Link>
        </li>
        <li>
          <Link to="/blog" onClick={closeMenu}>Blog</Link>
        </li>
      </ul>
      <div className="nav-actions">
        <select onChange={handleCurrencyChange} className="currency-select" aria-label="Select currency">
          <option value="usd">USD</option>
          <option value="eur">EUR</option>
          <option value="inr">INR</option>
        </select>
        {isAuthenticated ? (
          <button onClick={handleAuthClick} className="auth-btn logout-btn">
            Logout
          </button>
        ) : (
          <Link to="/login" className="auth-btn login-btn" onClick={closeMenu}>
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
