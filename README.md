# Crypto X Tracker

A beginner-friendly cryptocurrency tracker built with React.js, Vite, and CoinGecko API.

## Features
- Real-time prices of top 100 cryptocurrencies
- Portfolio tracker (manual entry, localStorage persistence)
- Historical price chart per coin
- Crypto to fiat/crypto converter
- Educational blog page
- Static About page

## Tech Stack
- React.js (with hooks)
- Context API
- React Router (react-router-dom)
- react-chartjs-2 & chart.js
- CSS only
- Vite

## Getting Started
1. Clone the repo
2. Run `npm install`
3. Run `npm run dev`

## Folder Structure
```
crypto-x-tracker/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Navbar/Navbar.jsx
│   │   ├── Footer/Footer.jsx
│   │   └── LineChart/LineChart.jsx
│   ├── context/CoinContext.jsx
│   ├── pages/
│   │   ├── Home/Home.jsx
│   │   ├── Portfolio/Portfolio.jsx
│   │   ├── Coin/Coin.jsx
│   │   ├── About/About.jsx + About.css
│   │   └── Blog/Blog.jsx + Blog.css
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
├── vite.config.js
└── README.md
```

## API
Powered by [CoinGecko API](https://www.coingecko.com/en/api).
# React-SEM-2-PROJECT
