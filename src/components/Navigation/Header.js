import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <div className="header">
      <div className="logo">CommuneLink</div>
      <div className="nav-items">
        <a href="/home">Home</a>
        <a href="/post">Post</a>
        <select>
          <option>Current Location</option>
          <option>City Center</option>
          <option>North District</option>
          {/* Add other districts or predefined areas */}
        </select>
        <a href="/chat">Chat</a>
        <div className="dropdown">
          Profile
          <div className="dropdown-content">
            <a href="/profile">View Profile</a>
            <a href="/myposts">My Posts</a>
            <a href="/trustscore">Trust Score</a>
            <a href="/settings">Settings</a>
            <a href="/logout">Logout</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
