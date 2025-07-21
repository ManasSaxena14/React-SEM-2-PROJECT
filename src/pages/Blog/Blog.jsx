import React from 'react';
import './Blog.css';

const Blog = () => {
  return (
    <div className="blog-container">
      <div className="blog-hero-images">
        <img src="https://images.unsplash.com/photo-1640161704729-cbe966a08476?q=80&w=2344&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Crypto concept 1" className="blog-hero-img" />
        <img src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Crypto concept 2" className="blog-hero-img" />
      </div>
      <h1>📚 Beginner Guides & Tutorials</h1>
      <p>
        Whether you're new to crypto or brushing up your skills, our tutorials walk you through the fundamentals and latest market trends in simple language.
      </p>

      <h2>🔍 Crypto Concepts Explained Simply</h2>
      <p>
        Dive into core blockchain and crypto topics like wallets, DeFi, NFTs, and smart contracts — all broken down into clear, concise insights.
      </p>

      <h2>🔗 What is Blockchain?</h2>
      <p>
        Blockchain is a decentralized digital ledger that records transactions across a network of computers. Unlike traditional databases managed by a single authority (like a bank), blockchain is transparent and tamper-resistant. Every transaction is added as a "block" to a chronological chain — hence the name. This technology powers cryptocurrencies like Bitcoin and Ethereum, enabling secure, peer-to-peer value exchange without middlemen.
      </p>

      <h2>👛 What is a Crypto Wallet?</h2>
      <p>
        A crypto wallet is a tool that allows users to store, send, and receive cryptocurrencies. There are two main types: hot wallets (online and easy to access) and cold wallets (offline and more secure). Your wallet doesn’t store coins directly — it stores your private keys, which give access to your crypto on the blockchain. Protecting your private key is critical — anyone with it can control your assets.
      </p>

      <h2>🏦 What is DeFi (Decentralized Finance)?</h2>
      <p>
        DeFi refers to financial systems built on blockchain that remove intermediaries like banks and brokers. Using smart contracts, DeFi platforms offer services such as lending, borrowing, trading, and saving — without requiring permission or centralized control. It's finance for everyone, running 24/7, with full transparency.
      </p>

      <h2>🤖 What is a Smart Contract?</h2>
      <p>
        A smart contract is a self-executing program stored on the blockchain that runs when specific conditions are met. Think of it like an “if-this-then-that” agreement, but without a middleman. They're used in DeFi, NFT sales, and many blockchain apps to automate transactions with security and trust.
      </p>

      <p className="author-signature">
        ✍️ Made by Manas Saxena | Written by Manas
      </p>
    </div>
  );
};

export default Blog;

