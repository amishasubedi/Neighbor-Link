import './App.css';
import { Fragment } from 'react';
import React from 'react';
import Header from './components/Navigation/Header';
import HomePage from './pages/Homepage';

function App() {
  return (
    <Fragment>
      <Header />
      <HomePage />
    </Fragment>
  );
}

export default App;
