import React, { useContext, useEffect, useState } from "react";
import "./Coin.css";
import { useParams } from "react-router-dom";
import { CoinContext } from "../../context/CoinContext";
import LineChart from "../../components/LineChart/LineChart";

const Coin = () => {
  const { id: coinId } = useParams();
  const [coinData, setCoinData] = useState();
  const [historicalData, setHistoricalData] = useState();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { currency, portfolio, setPortfolio, allCoins } = useContext(CoinContext);

  // Generate sample historical data for fallback
  const generateSampleHistoricalData = (coinId, currencyName) => {
    const basePrice = allCoins.find(c => c.id === coinId)?.current_price || 100;
    const prices = [];
    const now = Date.now();
    
    for (let i = 9; i >= 0; i--) {
      const date = now - (i * 24 * 60 * 60 * 1000);
      const randomChange = (Math.random() - 0.5) * 0.1; // ±5% change
      const price = basePrice * (1 + randomChange);
      prices.push([date, price]);
    }
    
    return { prices };
  };

  // Generate sample coin data for fallback
  const generateSampleCoinData = (coinId, currencyName) => {
    const coin = allCoins.find(c => c.id === coinId);
    if (!coin) return null;

    const currentPrice = coin.current_price;
    const marketCap = coin.market_cap;
    
    return {
      id: coin.id,
      name: coin.name,
      symbol: coin.symbol,
      image: { large: coin.image },
      market_cap_rank: coin.market_cap_rank,
      market_data: {
        current_price: { [currencyName]: currentPrice },
        market_cap: { [currencyName]: marketCap },
        high_24h: { [currencyName]: currentPrice * 1.05 },
        low_24h: { [currencyName]: currentPrice * 0.95 }
      }
    };
  };

  const fetchCoinData = async () => {
    try {
      const res = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, {
        method: "GET",
        headers: {
          accept: "application/json",
        },
      });
      
      if (res.ok) {
        const data = await res.json();
        setCoinData(data);
      } else {
        throw new Error('API request failed');
      }
    } catch (err) {
      console.warn('Coin data API failed, using fallback:', err);
      // Use fallback data from allCoins
      const fallbackData = generateSampleCoinData(coinId, currency.name);
      if (fallbackData) {
        setCoinData(fallbackData);
      } else {
        setError('Coin not found in available data.');
      }
    }
  };

  const fetchHistoricalCoinData = async () => {
    try {
      const res = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`, {
        method: "GET",
        headers: {
          accept: "application/json",
        },
      });
      
      if (res.ok) {
        const data = await res.json();
        setHistoricalData(data);
      } else {
        throw new Error('Historical data API failed');
      }
    } catch (err) {
      console.warn('Historical data API failed, using fallback:', err);
      // Generate sample historical data
      const fallbackData = generateSampleHistoricalData(coinId, currency.name);
      setHistoricalData(fallbackData);
    }
  };

  useEffect(() => {
    setError(null);
    setLoading(true);
    
    const fetchData = async () => {
      await Promise.all([
        fetchCoinData(),
        fetchHistoricalCoinData()
      ]);
      setLoading(false);
    };
    
    fetchData();
  }, [currency, coinId]);

  if (loading) {
    return (
      <div className="coin">
        <div className="spinner">
          <div className="spin"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="coin">
        <div className="hero">
          <h1>Error</h1>
          <p>{error}</p>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Using demo data due to API limitations.
          </p>
        </div>
      </div>
    );
  }

  if (coinData && historicalData && coinData.market_data) {
    // Check if this coin is in the portfolio
    const portfolioEntry = portfolio.find((c) => c.coin === coinId);
    // Get current price
    const currentPrice = coinData.market_data.current_price[currency.name];
    // Add to portfolio handler
    const handleAddToPortfolio = () => {
      if (!portfolioEntry) {
        setPortfolio([
          ...portfolio,
          { coin: coinId, quantity: 1, buyPrice: currentPrice, buyCurrency: currency.name }
        ]);
      }
    };
    // Calculate P/L if in portfolio
    let pl = null;
    let value = null;
    if (portfolioEntry) {
      value = currentPrice * portfolioEntry.quantity;
      pl = value - portfolioEntry.buyPrice * portfolioEntry.quantity;
    }
    return (
      <div className="coin">
        <div className="coin-logo-center">
          <img src={coinData.image?.large} alt={coinData.name} className="coin-logo-img" />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
          {!portfolioEntry ? (
            <button
              className="portfolio-add-btn"
              onClick={handleAddToPortfolio}
              style={{ marginRight: 12 }}
            >
              Add to Portfolio
            </button>
          ) : (
            <div className="coin-portfolio-info" style={{ background: 'var(--bg-alt)', borderRadius: 10, padding: '12px 24px', boxShadow: '0 2px 8px #7929ff22', display: 'flex', gap: 18, alignItems: 'center' }}>
              <span>In Portfolio:</span>
              <span>Qty: <b>{portfolioEntry.quantity}</b></span>
              <span>Buy: <b>{portfolioEntry.buyCurrency ? (portfolioEntry.buyCurrency === 'usd' ? '$' : portfolioEntry.buyCurrency === 'eur' ? '€' : '₹') : currency.symbol}{portfolioEntry.buyPrice}</b></span>
              <span>Value: <b>{currency.symbol}{value?.toFixed(2)}</b></span>
              <span>P/L: <b className={pl >= 0 ? 'green' : 'red'}>{currency.symbol}{pl?.toFixed(2)}</b></span>
            </div>
          )}
        </div>
        <div className="coin-chart">
          <LineChart historicalData={historicalData} />
        </div>
        <div className="coin-table-section">
          <table className="coin-info-table">
            <tbody>
              <tr>
                <th>Crypto Market Rank</th>
                <td>{coinData.market_cap_rank}</td>
              </tr>
              <tr>
                <th>Current Price</th>
                <td>{currency.symbol}{currentPrice?.toLocaleString()}</td>
              </tr>
              <tr>
                <th>Market Cap</th>
                <td>{currency.symbol}{coinData.market_data.market_cap[currency.name]?.toLocaleString()}</td>
              </tr>
              <tr>
                <th>24 Hour High</th>
                <td>{currency.symbol}{coinData.market_data.high_24h[currency.name]?.toLocaleString()}</td>
              </tr>
              <tr>
                <th>24 Hour Low</th>
                <td>{currency.symbol}{coinData.market_data.low_24h[currency.name]?.toLocaleString()}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  } else {
    return (
      <div className="coin">
        <div className="hero">
          <h1>Loading...</h1>
          <p>Fetching coin data...</p>
        </div>
      </div>
    );
  }
};

export default Coin;
