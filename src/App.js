import React from 'react';
import {
  BrowserRouter,
  Routes, 
  Route,
} from "react-router-dom";

import Header from './components/Navigation/Header';
import HomePage from './pages/Homepage';
import PostItem from './components/Posts/PostItem';
import ChatPage from './pages/Chatpage';
import PostList from './components/Posts/PostList';
import Login from './components/Authentication/Login';
import Signup from './components/Authentication/signup';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route exact path="/" element={<HomePage />} />
        </Routes>
        <Routes>
          <Route path = "/new/post" element = {<PostItem />} />
        </Routes>
        <Routes>
          <Route path = "/chat" element = {<ChatPage />} />
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
      </div>
    </BrowserRouter>
  );
}

export default App;