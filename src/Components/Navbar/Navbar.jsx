import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import navlogo from '../../assets/nav-logo.svg';
import navProfile from '../../assets/nav-profile.svg';

const Navbar = () => {
  const isAuthenticated = localStorage.getItem('auth-token');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('auth-token');
    navigate('/'); // Navigate to home or login page after logout
  };

  return (
    <div className='navbar'>
      <Link to="/">
        <img src={navlogo} className="nav-logo" alt="" />
      </Link>
      <div className='nav-links'>
      {localStorage.getItem('auth-token')
        ?<button onClick={()=>{localStorage.removeItem('auth-token');window.location.replace('/')}}>Вийти</button>:
        <Link to='/login'><button>Вхід</button></Link>}
    
      </div>
    </div>
  );
};

export default Navbar;



