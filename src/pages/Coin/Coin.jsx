import React, { useContext, useEffect, useState } from "react";
import "./Coin.css";
import { useParams } from "react-router-dom";
import { CoinContext } from "../../context/CoinContext";
import LineChart from "../../components/LineChart/LineChart";

const Coin = () => {
  const { coinId } = useParams();
  const [coinData, setCoinData] = useState();
  const [historicalData, setHistoricalData] = useState();
  const { currency } = useContext(CoinContext);

  const fetchCoinData = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "\tCG-VG4K5ie9paJGe4nPaB2jRNqm",
      },
    };

    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options)
      .then((res) => res.json())
      .then((res) => setCoinData(res))
      .catch((err) => console.error(err));
  };

  const fetchHistoricalCoinData = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "\tCG-VG4K5ie9paJGe4nPaB2jRNqm",
      },
    };

    fetch(
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`,
      options
    )
      .then((res) => res.json())
      .then((res) => setHistoricalData(res))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchCoinData();
    fetchHistoricalCoinData();
    // eslint-disable-next-line
  }, [currency]);

  if (coinData && historicalData) {
    return (
      <div className="coin">
        <div className="coin-logo-center">
          <img src={coinData.image.large} alt={coinData.name} className="coin-logo-img" />
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
                <td>{currency.symbol}{coinData.market_data.current_price[currency.name].toLocaleString()}</td>
              </tr>
              <tr>
                <th>Market Cap</th>
                <td>{currency.symbol}{coinData.market_data.market_cap[currency.name].toLocaleString()}</td>
              </tr>
              <tr>
                <th>24 Hour High</th>
                <td>{currency.symbol}{coinData.market_data.high_24h[currency.name].toLocaleString()}</td>
              </tr>
              <tr>
                <th>24 Hour Low</th>
                <td>{currency.symbol}{coinData.market_data.low_24h[currency.name].toLocaleString()}</td>
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
