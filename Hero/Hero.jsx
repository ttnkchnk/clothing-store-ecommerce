import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Hero.css';
import hero_image from '../assets/hero_image.png';

const Hero = () => {
  const navigate = useNavigate();

  const handleViewClick = () => {
    navigate('/womens'); // Navigate to the "New Collections" page
  };

  return (
    <div className='hero'>
      <div className="hero-left">
        <h2>Тільки НОВИНКИ</h2>
        <div>
          <p>НОВІ</p>
          <p>Колекції</p>
          <p>Для жінок</p>
        </div>
        <div className="hero-latest-btn" onClick={handleViewClick}>
          <div>Дивитися</div>
        </div>
      </div>
      <div className="hero-right">
        <img src={hero_image} alt="Hero" />
      </div>
    </div>
  );
};

export default Hero;


