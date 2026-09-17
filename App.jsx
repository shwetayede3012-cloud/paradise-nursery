import React, { useState } from 'react';
import './App.css';
import ProductList from './ProductList';

function App() {
  const [showProducts, setShowProducts] = useState(false);

  const handleGetStartedClick = () => {
    setShowProducts(true);
  };

  return (
    <div className="App">
      {!showProducts ? (
        <div className="landing-page">
          <div className="landing-content">
            <h1>Paradise Nursery</h1>
            <p>Where Green Meets Serenity</p>
            <p>
              Discover a wide variety of houseplants that bring life, 
              freshness, and tranquility to your home.
            </p>
            <button 
              className="get-started-button" 
              onClick={handleGetStartedClick}
            >
              Get Started
            </button>
