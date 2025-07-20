import React, { useContext } from "react";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import { CoinContext } from "../../context/CoinContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { setCurrency, user, isAuthenticated, logout } = useContext(CoinContext);

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

  return (
    <div className="navbar">
      <Link to="/">
        <img src={logo} alt="logo" className="logo" />
      </Link>
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
      <div className="nav-actions">
        <select onChange={handleCurrencyChange} className="currency-select">
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
    </div>
  );
};

export default Navbar;
