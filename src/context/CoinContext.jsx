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
  const [exchangeRates, setExchangeRates] = useState({ usd: 1, eur: 1, inr: 1 });

  // Fetch exchange rates (USD, EUR, INR)
  const fetchExchangeRates = async () => {
    try {
      const res = await fetch(
        'https://api.coingecko.com/api/v3/simple/price?ids=usd,eur,inr&vs_currencies=usd,eur,inr'
      );
      const data = await res.json();
      // USD to others
      setExchangeRates({
        usd: 1,
        eur: data.usd.eur,
        inr: data.usd.inr,
      });
    } catch (err) {
      // fallback: keep previous rates
    }
  };

  // Convert all portfolio buyPrices to new currency
  const convertPortfolioCurrency = (newCurrency) => {
    setPortfolio((prevPortfolio) => {
      return prevPortfolio.map((entry) => {
        // If entry already has buyCurrency, convert
        if (entry.buyCurrency && entry.buyCurrency !== newCurrency.name) {
          // Convert buyPrice to USD first, then to new currency
          let buyPriceInUSD = entry.buyPrice;
          if (entry.buyCurrency === 'eur') buyPriceInUSD = entry.buyPrice / exchangeRates.eur;
          if (entry.buyCurrency === 'inr') buyPriceInUSD = entry.buyPrice / exchangeRates.inr;
          let newBuyPrice = buyPriceInUSD;
          if (newCurrency.name === 'eur') newBuyPrice = buyPriceInUSD * exchangeRates.eur;
          if (newCurrency.name === 'inr') newBuyPrice = buyPriceInUSD * exchangeRates.inr;
          return { ...entry, buyPrice: parseFloat(newBuyPrice.toFixed(6)), buyCurrency: newCurrency.name };
        } else if (!entry.buyCurrency) {
          // If no buyCurrency, assume current context currency
          return { ...entry, buyCurrency: newCurrency.name };
        }
        return entry;
      });
    });
  };

  // Patch setCurrency to also convert portfolio
  const setCurrencyAndConvert = (newCurrency) => {
    setCurrency(newCurrency);
    convertPortfolioCurrency(newCurrency);
  };

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
    fetchExchangeRates();
    // Add polling for live price updates and exchange rates
    const interval = setInterval(() => {
      fetchAllCoin();
      fetchExchangeRates();
    }, 30000); // 30 seconds
    return () => clearInterval(interval);
  }, [currency]);

  const contextValue = {
    allCoins,
    currency,
    setCurrency: setCurrencyAndConvert,
    loading,
    error,
    portfolio,
    setPortfolio,
    exchangeRates,
  };

  return (
    <CoinContext.Provider value={contextValue}>
      {props.children}
    </CoinContext.Provider>
  );
};

export { CoinContextProvider as CoinProvider };
