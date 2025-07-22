import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <img
        src="https://img.freepik.com/premium-photo/bitcoin-digital-concept_828075-3663.jpg"
        alt="Bitcoin digital concept hero"
        className="about-hero-img"
      />
      <h1><strong>About CRYPTO "X" PULSE</strong></h1>

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
        <img src="https://assets.coingecko.com/coins/images/5/large/dogecoin.png?1696501409" alt="Dogecoin" />
        <img src="https://assets.coingecko.com/coins/images/1094/large/tron-logo.png?1696502193" alt="Tron" />
      </div>

      <section className="features-section">
        <h2><strong>Key Features</strong></h2>
        <ul className="features-list">
          <li><strong>Extensive coverage</strong> of all major cryptocurrencies and tokens</li>
          <li><strong>Live price tracking</strong> with low latency and real-time updates</li>
          <li><strong>Interactive charts</strong> and historical data for deep market analysis</li>
          <li><strong>User-friendly UI</strong> designed for seamless navigation</li>
          <li><strong>Secure & private</strong> platform with no unnecessary data collection</li>
          <li><strong>Fully responsive design</strong> for perfect experience on any device</li>
          <li><strong>Educational resources</strong> and insights for beginners and pros alike</li>
          <li><strong>Beginner-friendly guides</strong> and intuitive features for new users</li>
          <li><strong>Accurate & up-to-date market data</strong> you can trust</li>
          <li><strong>Optimized performance</strong> for low latency on all devices</li>
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
