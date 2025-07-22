import React from 'react';
import './Blog.css';

const Blog = () => {
  return (
    <div className="blog-container">
      <div className="blog-hero-images">
        <img src="https://images.unsplash.com/photo-1640161704729-cbe966a08476?q=80&w=2344&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Crypto concept 1" className="blog-hero-img" />
        <img src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Crypto concept 2" className="blog-hero-img" />
      </div>
      <h1><strong>Crypto X Tracker Blog</strong></h1>
      <p>
        Welcome to the Crypto X Tracker Blog! Here, you'll find beginner-friendly guides and insightful tutorials to help you navigate the world of cryptocurrencies. Our goal is to make complex crypto topics easy to understand for everyone.
      </p>

      <h2><strong>Understanding Cryptocurrency</strong></h2>
      <p>
        Cryptocurrency is a digital or virtual currency that uses cryptography for security. Unlike traditional money, cryptocurrencies operate on decentralized networks based on blockchain technology. This means transactions are transparent, secure, and not controlled by any single authority.
      </p>

      <h2><strong>How Blockchain Works</strong></h2>
      <p>
        Blockchain is a distributed ledger that records all transactions across a network of computers. Each block contains a list of transactions, and once a block is added to the chain, the information is permanent and cannot be altered. This technology is the backbone of most cryptocurrencies, ensuring trust and transparency.
      </p>

      <h2><strong>Crypto Wallets</strong></h2>
      <p>
        A crypto wallet allows you to store, send, and receive digital assets. There are two main types: hot wallets (connected to the internet) and cold wallets (offline for extra security). Always keep your private keys safe, as they are the only way to access your funds.
      </p>

      <h2><strong>DeFi: Decentralized Finance</strong></h2>
      <p>
        DeFi is a movement that leverages blockchain technology to recreate and improve traditional financial systems like lending, borrowing, and trading—without intermediaries. DeFi platforms are open to everyone and operate around the clock, providing greater accessibility and transparency.
      </p>

      <h2><strong>Smart Contracts</strong></h2>
      <p>
        Smart contracts are self-executing agreements with the terms directly written into code. They automatically execute actions when predefined conditions are met, removing the need for a third party. Smart contracts are widely used in DeFi, NFTs, and many blockchain applications.
      </p>

      <p className="author-signature">
        "Made by Manas Saxena | Written by Manas"
      </p>
    </div>
  );
};

export default Blog;
