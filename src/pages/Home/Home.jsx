import React, { useContext, useEffect, useState } from "react";
import "./Home.css";
import { CoinContext } from "../../context/CoinContext";
import { Link } from "react-router-dom";

const Home = () => {
  const { allCoins, currency, loading, error, portfolio, setPortfolio } = useContext(CoinContext);
  const [displayCoins, setDisplayCoins] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    setDisplayCoins(allCoins);
  }, [allCoins]);

  const addToPortfolio = (coin) => {
    if (!portfolio.find((c) => c.coin === coin.id)) {
      setPortfolio([...portfolio, { coin: coin.id, quantity: 1, buyPrice: coin.current_price }]);
    }
  };

  const inputHandler = (e) => {
    setInput(e.target.value);
    if (e.target.value === "") {
      setDisplayCoins(allCoins);
    }
  };

  const searchHandler = async (e) => {
    e.preventDefault();
    const coins = await allCoins.filter((coin) => {
      return coin.name.toLowerCase().includes(input.toLowerCase());
    });
    setDisplayCoins(coins);
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

  if (error) {
    return (
      <div className="home">
        <div className="hero">
          <h1>Error Loading Data</h1>
          <p>Unable to fetch cryptocurrency data. Using demo data instead.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="home">
      <div className="hero">
        <h1>
          CRYPTO <br />
          X TRACKER
        </h1>
        <p>
          Welcome to CRYPTO X TRACKER, your ultimate cryptocurrency price tracker, where you
          can explore real-time market data and analyse trends across thousands
          of digital assets.
        </p>
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
            {allCoins.map((coin, index) => (
              <option key={index} value={coin.name} />
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
        {displayCoins.slice(0, 10).map((coin, index) => (
          <div className="table-layout" key={index}>
            <p>{coin.market_cap_rank}</p>
            <div>
              <Link to={`/coin/${coin.id}`} style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', color: 'inherit' }}>
                <img src={coin.image} alt="" />
                <p>{coin.name + " - " + coin.symbol}</p>
              </Link>
            </div>
            <p>
              {currency.symbol} {coin.current_price.toLocaleString()}
            </p>
            <p
              className={coin.price_change_percentage_24h > 0 ? "green" : "red"}
            >
              {Math.floor(coin.price_change_percentage_24h * 100) / 100}
            </p>
            <p className="market-cap">
              {currency.symbol} {coin.market_cap.toLocaleString()}
            </p>
            <button
              className="portfolio-add-btn"
              onClick={() => addToPortfolio(coin)}
              disabled={portfolio.find((c) => c.coin === coin.id)}
            >
              {portfolio.find((c) => c.coin === coin.id) ? 'Added' : 'Add to Portfolio'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
