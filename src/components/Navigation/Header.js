import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <div className="header">
      <Link to = "/" className="logo">CommuneLink</Link>
      <div className="nav-items">
        <Link to="/new/post">AddPost</Link>
        <Link to="/post">AllPosts</Link>
        <Link to="/chat">Chat</Link>
        <div className="dropdown">
          Profile
          <div className="dropdown-content">
            <Link to="/myposts">My Posts</Link>
            <Link to="/trustscore">Trust Score</Link>
            <Link to="/login">Login</Link>
            <Link to = "/signup">Signup</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
