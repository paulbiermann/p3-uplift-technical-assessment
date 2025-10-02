import React from 'react';
import logo from './logo.svg';
import './App.css';
import CountryList from './components/CountryList/CountryList';
import { BrowserRouter, Routes, Route, Link } from 'react-router';
import CountryDetails from './components/CountryDetails/CountryDetails';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CountryList />} />
        <Route path="/countries/:cca3" element={<CountryDetails />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
