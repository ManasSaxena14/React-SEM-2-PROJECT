import { createContext, useEffect, useState } from "react";

export const CoinContext = createContext();

const CoinContextProvider = (props) => {
  const [allCoins, setAllCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currency, setCurrency] = useState({
    name: "usd",
    symbol: "$",
  });
  const [portfolio, setPortfolio] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('portfolio');
    if (saved) setPortfolio(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('portfolio', JSON.stringify(portfolio));
  }, [portfolio]);

  const fetchAllCoin = async () => {
    setLoading(true);
    setError(null);
    
    try {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    };

      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en`,
      options
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setAllCoins(data);
    } catch (err) {
      console.error("Error fetching coins:", err);
      setError(err.message);
      // Set some sample data for demo purposes
      setAllCoins([
        {
          id: "bitcoin",
          name: "Bitcoin",
          symbol: "btc",
          image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1696501400",
          current_price: 43250,
          market_cap: 847000000000,
          market_cap_rank: 1,
          price_change_percentage_24h: 2.5
        },
        {
          id: "ethereum",
          name: "Ethereum",
          symbol: "eth",
          image: "https://assets.coingecko.com/coins/images/279/large/ethereum.png?1696501628",
          current_price: 2650,
          market_cap: 318000000000,
          market_cap_rank: 2,
          price_change_percentage_24h: -1.2
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllCoin();
  }, [currency]);

  const contextValue = {
    allCoins,
    currency,
    setCurrency,
    loading,
    error,
    portfolio,
    setPortfolio,
  };

  return (
    <CoinContext.Provider value={contextValue}>
      {props.children}
    </CoinContext.Provider>
  );
};

export { CoinContextProvider as CoinProvider };
