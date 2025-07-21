import { createContext, useEffect, useState } from "react";

export const CoinContext = createContext();

const CoinContextProvider = (props) => {
  const [allCoins, setAllCoins] = useState([]);
  const [searchCoins, setSearchCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currency, setCurrency] = useState({
    name: "usd",
    symbol: "$",
  });
  const [portfolio, setPortfolio] = useState([]);
  const [exchangeRates, setExchangeRates] = useState({ usd: 1, eur: 0.85, inr: 83.5 });
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (email, password) => {
    if (email && password) {
      const userData = { email, id: Date.now(), name: email.split('@')[0] };
      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(userData));
      return userData;
    } else {
      throw new Error('Please enter valid credentials');
    }
  };

  const register = async (email, password) => {
    if (email && password && password.length >= 6) {
      const userData = { email, id: Date.now(), name: email.split('@')[0] };
      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(userData));
      return userData;
    } else {
      throw new Error('Please enter valid credentials (password must be at least 6 characters)');
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      setIsAuthenticated(true);
    }
  }, []);

  const fetchExchangeRates = async () => {
    try {
      const res = await fetch(
        'https://api.coingecko.com/api/v3/simple/price?ids=usd,eur,inr&vs_currencies=usd,eur,inr',
        {
          method: "GET",
          headers: {
            accept: "application/json",
          },
        }
      );
      
      if (res.ok) {
        const data = await res.json();
        setExchangeRates({
          usd: 1,
          eur: data.usd?.eur || 0.85,
          inr: data.usd?.inr || 83.5,
        });
      } else {
        console.warn('Exchange rates API failed, using fallback rates');
      }
    } catch (err) {
      console.warn('Exchange rates fetch failed:', err);
    }
  };

  const convertPortfolioCurrency = (newCurrency) => {
    setPortfolio((prevPortfolio) => {
      return prevPortfolio.map((entry) => {
        if (entry.buyCurrency && entry.buyCurrency !== newCurrency.name) {
          let buyPriceInUSD = entry.buyPrice;
    
          if (entry.buyCurrency === 'eur') buyPriceInUSD = entry.buyPrice / exchangeRates.eur;
          if (entry.buyCurrency === 'inr') buyPriceInUSD = entry.buyPrice / exchangeRates.inr;
          let newBuyPrice = buyPriceInUSD;
          if (newCurrency.name === 'eur') newBuyPrice = buyPriceInUSD * exchangeRates.eur;
          if (newCurrency.name === 'inr') newBuyPrice = buyPriceInUSD * exchangeRates.inr;
          return { ...entry, buyPrice: parseFloat(newBuyPrice.toFixed(6)), buyCurrency: newCurrency.name };
        } else if (!entry.buyCurrency) {
          return { ...entry, buyCurrency: newCurrency.name };
        }
        return entry;
      });
    });
  };

  const setCurrencyAndConvert = (newCurrency) => {
    setCurrency(newCurrency);
    convertPortfolioCurrency(newCurrency);
  };

  useEffect(() => {
    if (portfolio.length === 0) {
      const saved = localStorage.getItem('portfolio');
      if (saved) setPortfolio(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('portfolio', JSON.stringify(portfolio));
  }, [portfolio]);

  const getSampleData = (currencyName) => {
    const basePrices = {
      usd: { bitcoin: 43250, ethereum: 2650, tether: 1.0, bnb: 315, solana: 98 },
      eur: { bitcoin: 36800, ethereum: 2250, tether: 0.85, bnb: 268, solana: 83 },
      inr: { bitcoin: 3610000, ethereum: 221000, tether: 83.5, bnb: 26300, solana: 8180 }
    };

    const prices = basePrices[currencyName] || basePrices.usd;
    const symbol = currencyName === 'usd' ? '$' : currencyName === 'eur' ? '€' : '₹';

    return [
      {
        id: "bitcoin",
        name: "Bitcoin",
        symbol: "btc",
        image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1696501400",
        current_price: prices.bitcoin,
        market_cap: 847000000000,
        market_cap_rank: 1,
        price_change_percentage_24h: 2.5
      },
      {
        id: "ethereum",
        name: "Ethereum",
        symbol: "eth",
        image: "https://assets.coingecko.com/coins/images/279/large/ethereum.png?1696501628",
        current_price: prices.ethereum,
        market_cap: 318000000000,
        market_cap_rank: 2,
        price_change_percentage_24h: -1.2
      },
      {
        id: "tether",
        name: "Tether",
        symbol: "usdt",
        image: "https://assets.coingecko.com/coins/images/325/large/Tether.png?1696501661",
        current_price: prices.tether,
        market_cap: 95000000000,
        market_cap_rank: 3,
        price_change_percentage_24h: 0.1
      },
      {
        id: "binancecoin",
        name: "BNB",
        symbol: "bnb",
        image: "https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png?1696501970",
        current_price: prices.bnb,
        market_cap: 48000000000,
        market_cap_rank: 4,
        price_change_percentage_24h: 1.8
      },
      {
        id: "solana",
        name: "Solana",
        symbol: "sol",
        image: "https://assets.coingecko.com/coins/images/4128/large/solana.png?1696502016",
        current_price: prices.solana,
        market_cap: 42000000000,
        market_cap_rank: 5,
        price_change_percentage_24h: 3.2
      },
      {
        id: "usd-coin",
        name: "USD Coin",
        symbol: "usdc",
        image: "https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1696502066",
        current_price: prices.tether,
        market_cap: 32000000000,
        market_cap_rank: 6,
        price_change_percentage_24h: 0.0
      },
      {
        id: "staked-ether",
        name: "Lido Staked Ether",
        symbol: "steth",
        image: "https://assets.coingecko.com/coins/images/13442/large/steth_logo.png?1696513206",
        current_price: prices.ethereum,
        market_cap: 28000000000,
        market_cap_rank: 7,
        price_change_percentage_24h: -1.1
      },
      {
        id: "cardano",
        name: "Cardano",
        symbol: "ada",
        image: "https://assets.coingecko.com/coins/images/975/large/Cardano.png?1696502090",
        current_price: currencyName === 'inr' ? 40 : currencyName === 'eur' ? 0.41 : 0.48,
        market_cap: 17000000000,
        market_cap_rank: 8,
        price_change_percentage_24h: 2.1
      },
      {
        id: "avalanche-2",
        name: "Avalanche",
        symbol: "avax",
        image: "https://assets.coingecko.com/coins/images/12559/large/Avalanche_Circle_RedWhite_Trans.png?1696512169",
        current_price: currencyName === 'inr' ? 2925 : currencyName === 'eur' ? 30 : 35,
        market_cap: 13000000000,
        market_cap_rank: 9,
        price_change_percentage_24h: 4.5
      },
      {
        id: "dogecoin",
        name: "Dogecoin",
        symbol: "doge",
        image: "https://assets.coingecko.com/coins/images/5/large/dogecoin.png?1696501409",
        current_price: currencyName === 'inr' ? 7.1 : currencyName === 'eur' ? 0.072 : 0.085,
        market_cap: 12000000000,
        market_cap_rank: 10,
        price_change_percentage_24h: 1.7
      },
      {
        id: "tron",
        name: "TRON",
        symbol: "trx",
        image: "https://assets.coingecko.com/coins/images/1094/large/tron-logo.png?1696502193",
        current_price: currencyName === 'inr' ? 10 : currencyName === 'eur' ? 0.102 : 0.12,
        market_cap: 11000000000,
        market_cap_rank: 11,
        price_change_percentage_24h: 0.8
      },
      {
        id: "chainlink",
        name: "Chainlink",
        symbol: "link",
        image: "https://assets.coingecko.com/coins/images/877/large/chainlink.png?1696502099",
        current_price: currencyName === 'inr' ? 1295 : currencyName === 'eur' ? 13.2 : 15.5,
        market_cap: 9000000000,
        market_cap_rank: 12,
        price_change_percentage_24h: 2.3
      },
      {
        id: "polkadot",
        name: "Polkadot",
        symbol: "dot",
        image: "https://assets.coingecko.com/coins/images/12171/large/polkadot_new_logo.png?1696512162",
        current_price: currencyName === 'inr' ? 600 : currencyName === 'eur' ? 6.1 : 7.2,
        market_cap: 8500000000,
        market_cap_rank: 13,
        price_change_percentage_24h: 1.9
      },
      {
        id: "matic-network",
        name: "Polygon",
        symbol: "matic",
        image: "https://assets.coingecko.com/coins/images/4713/large/matic-token-icon.png?1696502297",
        current_price: currencyName === 'inr' ? 71 : currencyName === 'eur' ? 0.72 : 0.85,
        market_cap: 8000000000,
        market_cap_rank: 14,
        price_change_percentage_24h: 3.1
      },
      {
        id: "toncoin",
        name: "Toncoin",
        symbol: "ton",
        image: "https://assets.coingecko.com/coins/images/17980/large/ton_symbol.png?1696513780",
        current_price: currencyName === 'inr' ? 175 : currencyName === 'eur' ? 1.8 : 2.1,
        market_cap: 7500000000,
        market_cap_rank: 15,
        price_change_percentage_24h: 5.2
      }
    ];
  };

  const fetchAllCoin = async () => {
    setLoading(true);
    setError(null);
    
    const timeoutDuration = 10000;
    
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeoutDuration);
      
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
        },
        signal: controller.signal,
      };
      
      const top20Response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}&order=market_cap_desc&per_page=20&page=1&sparkline=false&locale=en`,
        options
      );
      
      clearTimeout(timeoutId);
      
      if (top20Response.ok) {
        const top20Data = await top20Response.json();
        
        if (top20Data && Array.isArray(top20Data) && top20Data.length > 0) {
          setAllCoins(top20Data);
          
          try {
            const searchResponse = await fetch(
              `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}&order=market_cap_desc&per_page=250&page=1&sparkline=false&locale=en`,
              options
            );
            
            if (searchResponse.ok) {
              const searchData = await searchResponse.json();
              if (searchData && Array.isArray(searchData) && searchData.length > 0) {
                setSearchCoins(searchData);
              } else {
                setSearchCoins(top20Data);
              }
            } else {
              setSearchCoins(top20Data);
            }
          } catch (searchErr) {
            console.warn('Search API failed, using top 20:', searchErr);
            setSearchCoins(top20Data);
          }
        } else {
          throw new Error('Invalid data received from API');
        }
      } else {
        throw new Error(`API Error: ${top20Response.status}`);
      }
    } catch (err) {
      console.warn('API fetch failed, using sample data:', err);
      
      const sampleData = getSampleData(currency.name);
      setAllCoins(sampleData);
      setSearchCoins(sampleData);
      
      if (err.name === 'AbortError') {
        setError('API request timed out. Using demo data for now.');
      } else {
        setError('Unable to fetch live data. Using demo data instead.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllCoin();
    fetchExchangeRates();
    
    const interval = setInterval(() => {
      fetchAllCoin();
      fetchExchangeRates();
    }, 60000);
    
    return () => clearInterval(interval);
  }, [currency]);

  const contextValue = {
    allCoins,
    searchCoins,
    currency,
    setCurrency: setCurrencyAndConvert,
    loading,
    error,
    portfolio,
    setPortfolio,
    exchangeRates,
    user,
    isAuthenticated,
    login,
    register,
    logout,
  };

  return (
    <CoinContext.Provider value={contextValue}>
      {props.children}
    </CoinContext.Provider>
  );
};

export { CoinContextProvider as CoinProvider };
