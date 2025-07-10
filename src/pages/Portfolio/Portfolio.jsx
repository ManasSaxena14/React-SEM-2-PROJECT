import React, { useState, useEffect, useContext } from 'react';
import { CoinContext } from '../../context/CoinContext';
import './Portfolio.css';

const Portfolio = () => {
  const { allCoins, currency, portfolio, setPortfolio, error } = useContext(CoinContext);
  const [form, setForm] = useState({ coin: '', quantity: '', buyPrice: '' });

  useEffect(() => {
    localStorage.setItem('portfolio', JSON.stringify(portfolio));
  }, [portfolio]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!form.coin || !form.quantity || !form.buyPrice) return;
    setPortfolio([...portfolio, { ...form, quantity: parseFloat(form.quantity), buyPrice: parseFloat(form.buyPrice), buyCurrency: currency.name }]);
    setForm({ coin: '', quantity: '', buyPrice: '' });
  };

  const handleRemove = (idx) => {
    setPortfolio(portfolio.filter((_, i) => i !== idx));
  };

  const getCurrentPrice = (coinId) => {
    const coin = allCoins.find((c) => c.id === coinId);
    return coin ? coin.current_price : 0;
  };

  const totalValue = portfolio.reduce((sum, h) => sum + getCurrentPrice(h.coin) * h.quantity, 0);
  const totalCost = portfolio.reduce((sum, h) => sum + h.buyPrice * h.quantity, 0);
  const profitLoss = totalValue - totalCost;

  if (error || allCoins.length === 0) {
    return (
      <div className="portfolio-container">
        <h2 className="portfolio-title">Portfolio Tracker</h2>
        <div style={{ textAlign: 'center', color: 'var(--danger)', fontWeight: 700, margin: '2rem 0' }}>
          Unable to fetch cryptocurrency data. Please check your internet connection or try again later.<br/>
          Your portfolio is stored locally and will reappear when data is available.
        </div>
      </div>
    );
  }

  if (portfolio.length === 0) {
    return (
      <div className="portfolio-container">
        <h2 className="portfolio-title">Portfolio Tracker</h2>
        <div style={{ textAlign: 'center', color: 'var(--text-muted)', fontWeight: 700, margin: '2rem 0' }}>
          Your portfolio is empty. Add coins to start tracking your profit and loss!
        </div>
      </div>
    );
  }

  return (
    <div className="portfolio-container">
      <h2 className="portfolio-title">Portfolio Tracker</h2>
      <form onSubmit={handleAdd} className="portfolio-form">
        <select name="coin" value={form.coin} onChange={handleChange} required>
          <option value="">Select Coin</option>
          {allCoins.map((coin) => (
            <option key={coin.id} value={coin.id}>{coin.name}</option>
          ))}
        </select>
        <input
          type="number"
          name="quantity"
          value={form.quantity}
          onChange={handleChange}
          placeholder="Quantity"
          min="0"
          step="any"
          required
        />
        <input
          type="number"
          name="buyPrice"
          value={form.buyPrice}
          onChange={handleChange}
          placeholder={`Buy Price (${currency.symbol})`}
          min="0"
          step="any"
          required
        />
        <button type="submit">Add</button>
      </form>
      <table className="portfolio-table">
        <thead>
          <tr>
            <th>Coin</th>
            <th>Quantity</th>
            <th>Buy Price</th>
            <th>Current Price</th>
            <th>Value</th>
            <th>P/L</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {portfolio.map((h, idx) => {
            const current = getCurrentPrice(h.coin);
            const value = current * h.quantity;
            const pl = value - h.buyPrice * h.quantity;
            const coinObj = allCoins.find((c) => c.id === h.coin);
            return (
              <tr key={idx}>
                <td>{coinObj ? coinObj.name : h.coin}</td>
                <td>{h.quantity}</td>
                <td>{h.buyCurrency ? (h.buyCurrency === 'usd' ? '$' : h.buyCurrency === 'eur' ? '€' : '₹') : currency.symbol}{h.buyPrice}</td>
                <td>{currency.symbol}{current}</td>
                <td>{currency.symbol}{value.toFixed(2)}</td>
                <td className={pl >= 0 ? 'green' : 'red'}>{currency.symbol}{pl.toFixed(2)}</td>
                <td><button className="remove-btn" onClick={() => handleRemove(idx)}>Remove</button></td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="portfolio-summary">
        Total Value: {currency.symbol}{totalValue.toFixed(2)}<br />
        Total P/L: <span className={profitLoss >= 0 ? 'green' : 'red'}>{currency.symbol}{profitLoss.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default Portfolio;
