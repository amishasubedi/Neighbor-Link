import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <div className="header">
      <Link to = "/" className="logo">CommuneLink</Link>
      <div className="nav-items">
        <Link to="/post">Post</Link>
        <select>
          <option>Current Location</option>
          <option>City Center</option>
          <option>North District</option>
        </select>
        <Link to="/chat">Chat</Link>
        <div className="dropdown">
          Profile
          <div className="dropdown-content">
            <Link to="/profile">View Profile</Link>
            <Link to="/myposts">My Posts</Link>
            <Link to="/trustscore">Trust Score</Link>
            <Link to="/settings">Settings</Link>
            <Link to="/logout">Logout</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
