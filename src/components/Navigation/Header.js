import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { useAuth } from '../Authentication/AuthContext';

const Header = () => {
  const { isLoggedIn, logout } = useAuth();

  const handleLogout = () => {
    logout(); // from auth context
  }

  return (
    <div className="header">
      <Link to="/" className="logo">Neighbor-Link</Link>
      <div className="nav-items">
        {isLoggedIn && <Link to="/new/post">AddPost</Link>}
        <Link to="/post">AllPosts</Link>
        <div className="dropdown">
          Profile
          <div className="dropdown-content">
            {isLoggedIn && <Link to="/myposts">My Posts</Link>}
            {isLoggedIn && <Link to="/trustscore">Trust Score</Link>}
            {isLoggedIn && <Link to="/myprofile">My Profile</Link>}
            {isLoggedIn && <button onClick={handleLogout}>Logout</button>}
            {!isLoggedIn && <Link to="/login">Login</Link>}
            {!isLoggedIn && <Link to="/signup">Signup</Link>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
