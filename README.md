# CRYPTO X TRACKER

> Your comprehensive cryptocurrency tracking platform for live prices, portfolio management, and market analysis

**Live Demo:** [crypto-x-tracker.netlify.app](https://crypto-x-tracker.netlify.app/)

---

##  Problem Statement & Solution

**Problem:** Cryptocurrency investors and enthusiasts need a centralized platform to track real-time prices, analyze market trends, and manage their portfolios across multiple currencies — all without the complexity of traditional trading platforms.

**Solution:** CRYPTO X TRACKER provides a sleek, user-friendly dashboard that aggregates live crypto data, enables multi-currency portfolio tracking with instant P/L calculations, and presents market trends through interactive visualizations. Built for both beginners and experienced traders, it simplifies crypto monitoring in one responsive interface.

---



##  Tech Stack

### **Frontend Framework**
- **React 19.1.0** - Modern UI library with hooks and functional components
- **Vite 7.0.3** - Lightning-fast build tool and dev server

### **Routing & State Management**
- **React Router DOM 7.6.3** - Client-side routing for SPA navigation
- **Context API** - Global state management for coins, portfolio, and authentication

### **Data Visualization**
- **Chart.js 4.5.0** - Powerful charting library
- **react-chartjs-2 5.3.0** - React wrapper for Chart.js
- **react-google-charts 5.2.1** - Google Charts integration

### **Styling**
- **Vanilla CSS** - Custom styles with Flexbox and CSS Grid
- **Responsive Design** - Mobile-first approach with media queries

### **External APIs**
- **CoinGecko API** - Real-time cryptocurrency price data and market information

### **Authentication & Storage**
- **LocalStorage** - Client-side persistence for user data and portfolio
- **Basic Auth** - Email/password authentication system

### **Deployment**
- **Netlify** - Continuous deployment and hosting

---

##  Features

- [x] **Live Cryptocurrency Prices** - Track real-time prices for top 20 digital assets
- [x] **Market Trend Visualization** - Interactive charts showing price changes and trends
- [x] **Portfolio Management** - Add, monitor, and analyze your crypto holdings
- [x] **Profit/Loss Calculation** - Instant P/L tracking based on buy price vs current price
- [x] **Multi-Currency Support** - Switch between USD (💵), EUR (💶), and INR (₹)
- [x] **Currency Conversion** - Automatic portfolio conversion when switching currencies
- [x] **User Authentication** - Login/Register system with persistent sessions
- [x] **Detailed Coin Pages** - In-depth information and charts for individual cryptocurrencies
- [x] **Search Functionality** - Quick search across 250+ cryptocurrencies
- [x] **Responsive Design** - Seamless experience on desktop, tablet, and mobile
- [x] **Offline Fallback** - Demo data when API is unavailable
- [x] **Auto-Refresh** - Data updates every 60 seconds
- [ ] **Price Alerts** - Set notifications for price thresholds *(planned)*
- [ ] **Historical Data** - Extended price history and analytics *(planned)*
- [ ] **Export Portfolio** - Download portfolio data as CSV *(planned)*

---

##  Getting Started

### Setup and Installation

1. **Clone the repository**

   git clone https://github.com/ManasSaxena14/React-SEM-2-PROJECT.git
   cd Crypto-X-Tracker


2. **Install dependencies**
   
   npm install
  

3. **Environment Variables** *(Optional)*
   
   This project uses the public CoinGecko API which doesn't require an API key for basic usage. No `.env` file is needed for development.
   
   If you want to use advanced features or a premium API key, create a `.env` file:
   # Optional: Add your CoinGecko API key for higher rate limits
   VITE_COINGECKO_API_KEY=your_api_key_here
  

4. **Start the development server**

   npm run dev

   
   The app will open at `http://localhost:5173`

##  Deployment

This project is deployed on **Netlify** with continuous deployment from the main branch.



---

## 📁 Project Structure


Crypto-X-Tracker/
├── public/
│   └── vite.svg                 # Vite logo
├── src/
│   ├── assets/                  # Images and static assets
│   │   ├── logo.png
│   │   ├── email.png
│   │   ├── password.png
│   │   ├── person.png
│   │   └── arrow_icon.png
│   ├── components/              # Reusable UI components
│   │   ├── Navbar/
│   │   │   ├── Navbar.jsx
│   │   │   └── Navbar.css
│   │   ├── Footer/
│   │   │   ├── Footer.jsx
│   │   │   └── Footer.css
│   │   └── LineChart/
│   │       └── LineChart.jsx
│   ├── context/                 # Context API for state management
│   │   └── CoinContext.jsx      # Global state (coins, portfolio, auth)
│   ├── pages/                   # Route components
│   │   ├── Home/
│   │   │   ├── Home.jsx
│   │   │   └── Home.css
│   │   ├── Portfolio/
│   │   │   ├── Portfolio.jsx
│   │   │   └── Portfolio.css
│   │   ├── Coin/
│   │   │   ├── Coin.jsx
│   │   │   └── Coin.css
│   │   ├── Login/
│   │   │   ├── Login.jsx
│   │   │   └── Login.css
│   │   ├── About/
│   │   │   ├── About.jsx
│   │   │   └── About.css
│   │   └── Blog/
│   │       ├── Blog.jsx
│   │       └── Blog.css
│   ├── App.jsx                  # Main app component with routing
│   ├── App.css                  # Global app styles
│   ├── main.jsx                 # Application entry point
│   └── index.css                # Base CSS and CSS variables
├── index.html                   # HTML template
├── package.json                 # Dependencies and scripts
├── vite.config.js               # Vite configuration
├── eslint.config.js             # ESLint configuration
└── README.md                    # Project documentation


---


##  Screenshots

![Live Demo](https://crypto-x-tracker.netlify.app/)

- **CoinGecko** - For providing the comprehensive cryptocurrency API
- **Chart.js** - For powerful data visualization tools
- **Netlify** - For seamless deployment and hosting
