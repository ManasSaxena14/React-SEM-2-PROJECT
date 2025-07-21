import React, { useContext } from "react";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import { CoinContext } from "../../context/CoinContext";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const { setCurrency, isAuthenticated, logout } = useContext(CoinContext);
  const navigate = useNavigate();
  const location = useLocation();

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

  const handleNavDropdown = (e) => {
    if (e.target.value) navigate(e.target.value);
  };

  return (
    <nav className="navbar">
      <div className="navbar-section navbar-left">
        <Link to="/">
          <img src={logo} alt="logo" className="logo" />
        </Link>
      </div>
      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/portfolio">Portfolio</Link>
        </li>
        <li>
          <Link to="/blog">Blog</Link>
        </li>
      </ul>
      <select
        className="nav-dropdown"
        aria-label="Navigate"
        value={['/', '/about', '/portfolio', '/blog'].includes(location.pathname) ? location.pathname : ''}
        onChange={handleNavDropdown}
      >
        <option value="">Navigate...</option>
        <option value="/">Home</option>
        <option value="/about">About</option>
        <option value="/portfolio">Portfolio</option>
        <option value="/blog">Blog</option>
      </select>
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
          <Link to="/login" className="auth-btn login-btn">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
