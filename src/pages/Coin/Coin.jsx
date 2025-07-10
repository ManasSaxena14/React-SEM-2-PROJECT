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
  const { currency } = useContext(CoinContext);

  const fetchCoinData = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "\tCG-VG4K5ie9paJGe4nPaB2jRNqm",
      },
    };
    try {
      const res = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options);
      if (!res.ok) throw new Error('Failed to fetch coin data');
      const data = await res.json();
      setCoinData(data);
    } catch (err) {
      setError('Failed to load coin data.');
    }
  };

  const fetchHistoricalCoinData = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "\tCG-VG4K5ie9paJGe4nPaB2jRNqm",
      },
    };
    try {
      const res = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`, options);
      if (!res.ok) throw new Error('Failed to fetch historical data');
      const data = await res.json();
      setHistoricalData(data);
    } catch (err) {
      setError('Failed to load chart data.');
    }
  };

  useEffect(() => {
    setError(null);
    fetchCoinData();
    fetchHistoricalCoinData();
    // eslint-disable-next-line
  }, [currency, coinId]);

  if (error) {
    return (
      <div className="coin">
        <div className="hero">
          <h1>Error</h1>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (coinData && historicalData && coinData.market_data) {
    return (
      <div className="coin">
        <div className="coin-logo-center">
          <img src={coinData.image?.large} alt={coinData.name} className="coin-logo-img" />
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
                <td>{currency.symbol}{coinData.market_data.current_price[currency.name]?.toLocaleString()}</td>
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
      <div className="spinner">
        <div className="spin"></div>
      </div>
    );
  }
};
export default Coin;
