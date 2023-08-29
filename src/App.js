import React from 'react';
import {
  BrowserRouter,
  Routes, 
  Route,
} from "react-router-dom";

import Header from './components/Navigation/Header';
import HomePage from './pages/Homepage';
import PostItem from './pages/PostItem';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route exact path="/" element={<HomePage />} />
        </Routes>
        <Routes>
          <Route path = "/post" element = {<PostItem />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;