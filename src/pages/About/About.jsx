import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <img
        src="https://img.freepik.com/premium-photo/bitcoin-digital-concept_828075-3663.jpg"
        alt="Bitcoin digital concept hero"
        className="about-hero-img"
      />
      <h1>About CRYPTO "X" PULSE</h1>

      <p className="intro">
        CRYPTO "X" PULSE is your ultimate companion in the fast-paced world of cryptocurrencies.
        We provide real-time data, comprehensive market coverage, and an intuitive interface
        to help you stay ahead in your investment journey.
      </p>

      <div className="about-crypto-icons">
        <img src="https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1696501400" alt="Bitcoin" />
        <img src="https://assets.coingecko.com/coins/images/279/large/ethereum.png?1696501628" alt="Ethereum" />
        <img src="https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png?1696501970" alt="BNB" />
        <img src="https://assets.coingecko.com/coins/images/4128/large/solana.png?1696502016" alt="Solana" />
        <img src="https://assets.coingecko.com/coins/images/325/large/Tether.png?1696501661" alt="Tether" />
      </div>

      <section className="features-section">
        <h2>Key Features</h2>
        <ul className="features-list">
          <li>🌐 Extensive coverage of all major cryptocurrencies and tokens</li>
          <li>⚡ Live price tracking with low latency and real-time updates</li>
          <li>📈 Interactive charts and historical data for deep market analysis</li>
          <li>🎯 User-friendly and modern UI designed for seamless navigation</li>
          <li>🔒 Secure and privacy-focused platform with no unnecessary data collection</li>
          <li>📱 Fully responsive design for perfect experience on any device</li>
          <li>💡 Educational resources and insights to help beginners and pros alike</li>
          <li>🎓 Beginner-friendly guides and intuitive features for new users</li>
          <li>🔍 Reliable, accurate, and up-to-date market data you can trust</li>
          <li>⚙️ Optimized for low latency and smooth performance on all devices</li>
        </ul>
      </section>

      <p className="closing">
        Whether you're a seasoned trader or just starting out, CRYPTO "X" PULSE equips you
        with everything you need to make informed decisions and grow your crypto portfolio
        with confidence.
      </p>

      <p className="author-signature">
        ✍️ Made by Manas Saxena | Written by Manas
      </p>
    </div>
  );
};

export default About;
