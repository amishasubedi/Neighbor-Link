import React from 'react';
import './Homepage.css';

const HomePage = () => {
  return (
    <div className="homepage">

      <div className="hero-section">
        <h1>Welcome to CommuneLink</h1>
        <p>Connecting communities like never before.</p>
        <button className="cta-button">Get Started</button>
      </div>

      <div className="features-section">
        <div className="feature">
          <div className="icon">🌍</div>
          <h2>Localize</h2>
          <p>Find connections right in your vicinity.</p>
        </div>
        <div className="feature">
          <div className="icon">💬</div>
          <h2>Chat</h2>
          <p>Communicate seamlessly with neighbors.</p>
        </div>
        <div className="feature">
          <div className="icon">🤝</div>
          <h2>Collaborate</h2>
          <p>Team up for community projects and goals.</p>
        </div>
      </div>

      {/* Footer */}
      <footer>
        <p>© 2023 CommuneLink</p>
      </footer>

    </div>
  );
};

export default HomePage;
