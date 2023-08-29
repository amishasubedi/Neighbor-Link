import React from 'react';
import {
  BrowserRouter,
  Routes, 
  Route,
} from "react-router-dom";

import Header from './components/Navigation/Header';
import HomePage from './pages/Homepage';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route exact path="/" element={<HomePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
