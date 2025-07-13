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

  // Only load portfolio from localStorage once, and never overwrite with empty
  useEffect(() => {
    if (portfolio.length === 0) {
      const saved = localStorage.getItem('portfolio');
      if (saved) setPortfolio(JSON.parse(saved));
    }
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
      
      // Fetch top 20 coins for display
      const top20Response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}&order=market_cap_desc&per_page=20&page=1&sparkline=false&locale=en`,
        options
      );
      if (!top20Response.ok) {
        throw new Error(`HTTP error! status: ${top20Response.status}`);
      }
      const top20Data = await top20Response.json();
      setAllCoins(top20Data);
      
      // Fetch all coins for search (up to 250 to avoid rate limits)
      const searchResponse = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}&order=market_cap_desc&per_page=250&page=1&sparkline=false&locale=en`,
        options
      );
      if (searchResponse.ok) {
        const searchData = await searchResponse.json();
        setSearchCoins(searchData);
      }
    } catch (err) {
      setError(err.message);
      // Set some sample data for demo purposes
      const sampleTop20 = [
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
        },
        {
          id: "tether",
          name: "Tether",
          symbol: "usdt",
          image: "https://assets.coingecko.com/coins/images/325/large/Tether.png?1696501661",
          current_price: 1.0,
          market_cap: 95000000000,
          market_cap_rank: 3,
          price_change_percentage_24h: 0.1
        },
        {
          id: "binancecoin",
          name: "BNB",
          symbol: "bnb",
          image: "https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png?1696501970",
          current_price: 315,
          market_cap: 48000000000,
          market_cap_rank: 4,
          price_change_percentage_24h: 1.8
        },
        {
          id: "solana",
          name: "Solana",
          symbol: "sol",
          image: "https://assets.coingecko.com/coins/images/4128/large/solana.png?1696502016",
          current_price: 98,
          market_cap: 42000000000,
          market_cap_rank: 5,
          price_change_percentage_24h: 3.2
        },
        {
          id: "usd-coin",
          name: "USD Coin",
          symbol: "usdc",
          image: "https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1696502066",
          current_price: 1.0,
          market_cap: 32000000000,
          market_cap_rank: 6,
          price_change_percentage_24h: 0.0
        },
        {
          id: "staked-ether",
          name: "Lido Staked Ether",
          symbol: "steth",
          image: "https://assets.coingecko.com/coins/images/13442/large/steth_logo.png?1696513206",
          current_price: 2650,
          market_cap: 28000000000,
          market_cap_rank: 7,
          price_change_percentage_24h: -1.1
        },
        {
          id: "cardano",
          name: "Cardano",
          symbol: "ada",
          image: "https://assets.coingecko.com/coins/images/975/large/Cardano.png?1696502090",
          current_price: 0.48,
          market_cap: 17000000000,
          market_cap_rank: 8,
          price_change_percentage_24h: 2.1
        },
        {
          id: "avalanche-2",
          name: "Avalanche",
          symbol: "avax",
          image: "https://assets.coingecko.com/coins/images/12559/large/Avalanche_Circle_RedWhite_Trans.png?1696512169",
          current_price: 35,
          market_cap: 13000000000,
          market_cap_rank: 9,
          price_change_percentage_24h: 4.5
        },
        {
          id: "dogecoin",
          name: "Dogecoin",
          symbol: "doge",
          image: "https://assets.coingecko.com/coins/images/5/large/dogecoin.png?1696501409",
          current_price: 0.085,
          market_cap: 12000000000,
          market_cap_rank: 10,
          price_change_percentage_24h: 1.7
        },
        {
          id: "tron",
          name: "TRON",
          symbol: "trx",
          image: "https://assets.coingecko.com/coins/images/1094/large/tron-logo.png?1696502193",
          current_price: 0.12,
          market_cap: 11000000000,
          market_cap_rank: 11,
          price_change_percentage_24h: 0.8
        },
        {
          id: "chainlink",
          name: "Chainlink",
          symbol: "link",
          image: "https://assets.coingecko.com/coins/images/877/large/chainlink.png?1696502099",
          current_price: 15.5,
          market_cap: 9000000000,
          market_cap_rank: 12,
          price_change_percentage_24h: 2.3
        },
        {
          id: "polkadot",
          name: "Polkadot",
          symbol: "dot",
          image: "https://assets.coingecko.com/coins/images/12171/large/polkadot_new_logo.png?1696512162",
          current_price: 7.2,
          market_cap: 8500000000,
          market_cap_rank: 13,
          price_change_percentage_24h: 1.9
        },
        {
          id: "matic-network",
          name: "Polygon",
          symbol: "matic",
          image: "https://assets.coingecko.com/coins/images/4713/large/matic-token-icon.png?1696502297",
          current_price: 0.85,
          market_cap: 8000000000,
          market_cap_rank: 14,
          price_change_percentage_24h: 3.1
        },
        {
          id: "toncoin",
          name: "Toncoin",
          symbol: "ton",
          image: "https://assets.coingecko.com/coins/images/17980/large/ton_symbol.png?1696513780",
          current_price: 2.1,
          market_cap: 7500000000,
          market_cap_rank: 15,
          price_change_percentage_24h: 5.2
        },
        {
          id: "wrapped-bitcoin",
          name: "Wrapped Bitcoin",
          symbol: "wbtc",
          image: "https://assets.coingecko.com/coins/images/7598/large/wrapped_bitcoin_wbtc.png?1696507857",
          current_price: 43250,
          market_cap: 7000000000,
          market_cap_rank: 16,
          price_change_percentage_24h: 2.5
        },
        {
          id: "shiba-inu",
          name: "Shiba Inu",
          symbol: "shib",
          image: "https://assets.coingecko.com/coins/images/11939/large/shiba.png?1696512262",
          current_price: 0.000012,
          market_cap: 6500000000,
          market_cap_rank: 17,
          price_change_percentage_24h: 1.3
        },
        {
          id: "dai",
          name: "Dai",
          symbol: "dai",
          image: "https://assets.coingecko.com/coins/images/9956/large/4943.png?1696502031",
          current_price: 1.0,
          market_cap: 6000000000,
          market_cap_rank: 18,
          price_change_percentage_24h: 0.1
        },
        {
          id: "litecoin",
          name: "Litecoin",
          symbol: "ltc",
          image: "https://assets.coingecko.com/coins/images/2/large/litecoin.png?1696501400",
          current_price: 68,
          market_cap: 5500000000,
          market_cap_rank: 19,
          price_change_percentage_24h: 1.6
        },
        {
          id: "uniswap",
          name: "Uniswap",
          symbol: "uni",
          image: "https://assets.coingecko.com/coins/images/12504/large/uniswap-uni.png?1696512269",
          current_price: 7.8,
          market_cap: 5000000000,
          market_cap_rank: 20,
          price_change_percentage_24h: 2.8
        }
      ];
      
      setAllCoins(sampleTop20);
      // For search, include more sample coins
      const extendedSample = [
        ...sampleTop20,
        {
          id: "ripple",
          name: "XRP",
          symbol: "xrp",
          image: "https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png?1696501442",
          current_price: 0.52,
          market_cap: 28000000000,
          market_cap_rank: 21,
          price_change_percentage_24h: 1.4
        },
        {
          id: "chainlink",
          name: "Chainlink",
          symbol: "link",
          image: "https://assets.coingecko.com/coins/images/877/large/chainlink.png?1696502099",
          current_price: 15.5,
          market_cap: 9000000000,
          market_cap_rank: 22,
          price_change_percentage_24h: 2.3
        },
        {
          id: "stellar",
          name: "Stellar",
          symbol: "xlm",
          image: "https://assets.coingecko.com/coins/images/100/large/Stellar_symbol_black_RGB.png?1696501482",
          current_price: 0.12,
          market_cap: 3500000000,
          market_cap_rank: 23,
          price_change_percentage_24h: 0.8
        },
        {
          id: "monero",
          name: "Monero",
          symbol: "xmr",
          image: "https://assets.coingecko.com/coins/images/69/large/monero_logo.png?1696501460",
          current_price: 165,
          market_cap: 3000000000,
          market_cap_rank: 24,
          price_change_percentage_24h: 1.2
        },
        {
          id: "ethereum-classic",
          name: "Ethereum Classic",
          symbol: "etc",
          image: "https://assets.coingecko.com/coins/images/453/large/ethereum-classic-logo.png?1696501718",
          current_price: 25,
          market_cap: 2800000000,
          market_cap_rank: 25,
          price_change_percentage_24h: 0.9
        }
      ];
      setSearchCoins(extendedSample);
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
    searchCoins,
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
