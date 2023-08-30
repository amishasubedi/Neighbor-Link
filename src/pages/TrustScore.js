import React from 'react';
import './Homepage.css';
import { useAuth } from '../components/Authentication/AuthContext';

const TrustScore = () => {

    const {currentUser} = useAuth();

  return (
    <div className="trust-score-container">
      <div className="hero-section">
        <h2>Hi {currentUser.name}, Your trust score point is {currentUser.trustScore}</h2>
        <p>Building a strong and trustworthy community is important. Trust Score is a fun way to recognize your contributions and activities within our neighborhood.</p>
      </div>
      <div className="trust-score-content">
        <div className="trust-score-intro">
          <div className="intro-text">
            <p>Earn points, badges, and rewards by participating in events, helping neighbors, and maintaining a positive presence.</p>
          </div>
        </div>
      </div>
      <div className="trust-score-details">
        <div className="earn-points-container">
          <h3>How to Earn Trust Points:</h3>
          <ul>
            <li>Participate in neighborhood events</li>
            <li>Help your neighbors with their needs</li>
            <li>Contribute positively to discussions</li>
            <li>Report issues and help resolve them</li>
            <li>Be an active member of our community</li>
            <li>Signup and get an instant boost of 3 points!</li>
          </ul>
        </div>
        <div className="trust-score-rules">
          <h3>Rules:</h3>
          <ul>
            <li>Do not spam or post inappropriate content</li>
            <li>Respect your neighbors and maintain a positive tone</li>
            <li>Help us keep the community safe and respectful</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TrustScore;
