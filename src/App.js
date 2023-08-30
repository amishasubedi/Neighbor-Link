import React from 'react';
import {
  BrowserRouter,
  Routes, 
  Route,
} from "react-router-dom";

import Header from './components/Navigation/Header';
import HomePage from './pages/Homepage';
import PostItem from './components/Posts/PostItem';
import PostList from './components/Posts/PostList';
import Login from './components/Authentication/Login';
import Signup from './components/Authentication/signup';
import { AuthProvider } from './components/Authentication/AuthContext';
import TrustScore from './components/TrustScore/TrustScore';
import MyPosts from './components/Posts/MyPosts';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <AuthProvider>
        <Header />
        <Routes>
          <Route exact path="/" element={<HomePage />} />
        </Routes>
        <Routes>
          <Route path = "/new/post" element = {<PostItem />} />
        </Routes>
        <Routes>
          <Route exact path="/post" element={<PostList />} />
        </Routes>
        <Routes>
          <Route path = "/login" element= {<Login />} />
        </Routes>
        <Routes>
          <Route path = "/signup" element= {<Signup />} />
        </Routes>
        <Routes>
          <Route path = "/trustscore" element= {<TrustScore />} />
        </Routes>
        <Routes>
          <Route path = "/myposts" element= {<MyPosts />} />
        </Routes>
        </AuthProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;