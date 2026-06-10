import React from 'react';
import './footer.css';
import footer_logo from '../assets/logo.png';
import instagram_icon from '../assets/instagram_icon.png';
import pinterest_icon from '../assets/pinterest_icon.png';
import telegram_icon from '../assets/telegram_icon.png';

const Footer = () => {
  return (
    <div className='footer'>
      <div className="footer-container">
        <div className="footer-logo">
          <img src={footer_logo} alt="Logo" />
          <p>INSIDE OUT</p>
        </div>
        <ul className="footer-links">
          <li><a href="#about">Про компанію</a></li>
          <li><a href="#products">Продукція</a></li>
          <li><a href="#stores">Магазини</a></li>
          <li><a href="#about-us">Про нас</a></li>
          <li><a href="#contact">Контакти</a></li>
        </ul>
        <div className="footer-social-icons">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <img src={instagram_icon} alt="Instagram" />
          </a>
          <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer">
            <img src={pinterest_icon} alt="Pinterest" />
          </a>
          <a href="https://telegram.org" target="_blank" rel="noopener noreferrer">
            <img src={telegram_icon} alt="Telegram" />
          </a>
        </div>
      </div>
      <div className="footer-copyright">
        <hr />
        <p>Copyright © 2024 - All Rights Reserved.</p>
      </div> 
    </div>
  );
};

export default Footer;



