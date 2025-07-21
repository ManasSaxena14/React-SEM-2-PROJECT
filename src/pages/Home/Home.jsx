import React, { useContext, useEffect, useState } from "react";
import "./Home.css";
import { CoinContext } from "../../context/CoinContext";
import { Link } from "react-router-dom";

const Home = () => {
  const { allCoins, searchCoins, currency, loading, error, portfolio, setPortfolio } = useContext(CoinContext);
  const [displayCoins, setDisplayCoins] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    setDisplayCoins(allCoins);
  }, [allCoins]);

  const addToPortfolio = (coin) => {
    if (!portfolio.find((c) => c.coin === coin.id)) {
      setPortfolio([...portfolio, { coin: coin.id, quantity: 1, buyPrice: coin.current_price, buyCurrency: currency.name }]);
    }
  };

  const inputHandler = (e) => {
    setInput(e.target.value);
    if (e.target.value === "") {
      setDisplayCoins(allCoins);
    }
  };

  const searchHandler = (e) => {
    e.preventDefault();
    const coins = searchCoins.filter((coin) =>
      coin.name.toLowerCase().includes(input.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(input.toLowerCase())
    );
    setDisplayCoins(coins);
  };

  const formatMarketCap = (num) => {
    if (num >= 1e9) return (num / 1e9).toFixed(2) + 'B';
    if (num >= 1e6) return (num / 1e6).toFixed(2) + 'M';
    return num.toLocaleString();
  };

  if (loading) {
    return (
      <div className="home">
        <div className="hero">
          <h1>Loading...</h1>
          <p>Fetching cryptocurrency data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="home">
      <div className="hero">
        <h1>
          CRYPTO <br />
          "X" TRACKER
        </h1>
        <p className="hero-welcome" style={{ textAlign: 'center' }}>
          Welcome to CRYPTO X TRACKER — your go-to crypto hub for live prices, trend analysis, and top 15 asset tracking. With real-time data and intuitive tools, it's built to help you stay ahead in the crypto game.
        </p>
        
        {error && (
          <div style={{ 
            background: 'rgba(255, 70, 70, 0.1)', 
            border: '1px solid var(--danger)', 
            color: 'var(--danger)', 
            padding: '12px 20px', 
            borderRadius: '8px', 
            marginBottom: '20px',
            textAlign: 'center',
            fontWeight: '600'
          }}>
            {error}
          </div>
        )}
        
        <form onSubmit={searchHandler}>
        <input
            onChange={inputHandler}
            list="coinlist"
            value={input}
            type="text"
            placeholder="Search crypto..."
          required
        />

          <datalist id="coinlist">
            {searchCoins.map((coin) => (
              <option key={coin.id} value={coin.name} />
            ))}
          </datalist>

          <button type="submit">Search</button>
      </form>
      </div>

      <div className="crypto-table">
        <div className="table-layout">
          <p>#</p>
          <p>Coins</p>
          <p>Price</p>
          <p style={{ textAlign: "center" }}>24H Change</p>
          <p className="market-cap">Market Cap</p>
        </div>

        {displayCoins.slice(0, 15).map((coin) => (
          <div className="table-layout" key={coin.id}>
            <p>{coin.market_cap_rank}</p>
            <div>
              <Link
                to={`/coin/${coin.id}`}
                style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', color: 'inherit' }}
              >
                <img src={coin.image} alt={coin.name} />
                <p>{coin.name + " - " + coin.symbol}</p>
              </Link>
            </div>
            <p>
              {currency.symbol} {coin.current_price.toLocaleString()}
            </p>
            <p className={coin.price_change_percentage_24h > 0 ? "green" : "red"}>
              {coin.price_change_percentage_24h.toFixed(2)}%
            </p>
            <p className="market-cap">
              {currency.symbol} {formatMarketCap(coin.market_cap)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;