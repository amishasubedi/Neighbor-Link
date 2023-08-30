import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { useAuth } from '../Authentication/AuthContext';

const Header = () => {
  const { isLoggedIn } = useAuth();

  return (
    <div className="header">
      <Link to="/" className="logo">CommuneLink</Link>
      <div className="nav-items">
        {isLoggedIn && <Link to="/new/post">AddPost</Link>}
        <Link to="/post">AllPosts</Link>
        <div className="dropdown">
          Profile
          <div className="dropdown-content">
            {isLoggedIn && <Link to="/myposts">My Posts</Link>}
            {isLoggedIn && <Link to="/trustscore">Trust Score</Link>}
            {!isLoggedIn && <Link to="/login">Login</Link>}
            {!isLoggedIn && <Link to="/signup">Signup</Link>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
