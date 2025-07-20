import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import { CoinProvider } from './context/CoinContext';
import Home from './pages/Home/Home';
import Portfolio from './pages/Portfolio/Portfolio';
import Coin from './pages/Coin/Coin';
import About from './pages/About/About';
import Blog from './pages/Blog/Blog';
import Login from './pages/Login/Login';

const App = () => {
  return (
    <CoinProvider>
      <Router>
        <Navbar />
        <div style={{ minHeight: '80vh' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/coin/:id" element={<Coin />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </CoinProvider>
  );
};

export default App;
