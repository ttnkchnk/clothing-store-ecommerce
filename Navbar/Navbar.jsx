import React, { useContext, useRef, useState } from 'react';
import './Navbar.css';

import logo from '../assets/logo.png';
import cart_icon from '../assets/cart_icon.png';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../context/ShopContext';
import nav_dropdown from '../assets/nav_dropdown.png'

const Navbar = () => {


  const [menu, setMenu] = useState('shop');
  const {getTotalCartItems} = useContext(ShopContext);
  const menoRef = useRef();

  const dropdown_toggle = (e) =>{
    menoRef.current.classList.toggle('nav-menu-visible');
    e.target.classList.toggle('open');

  }

  return (
    <div className='navbar'>
       <div className='nav-logo'>
        <Link to='/'><img src={logo} alt='' /></Link>
      </div>
         <img className='nav-drop-down' onClick={dropdown_toggle} src={nav_dropdown} alt="" />
      <ul ref={menoRef}  className='nav-menu'>
        <li onClick={() => { setMenu('shop') }}><Link className="menu-link" style={{textDecoration: 'none'}} to='/'>Головна</Link></li>
        <li onClick={() => { setMenu('womens') }}><Link className="menu-link" style={{textDecoration: 'none'}} to='/womens'>Жінки</Link></li>
        <li onClick={() => { setMenu('mens') }}><Link className="menu-link" style={{textDecoration: 'none'}} to='/mens'>Чоловіки</Link></li>
        <li onClick={() => { setMenu('kids') }}><Link className="menu-link" style={{textDecoration: 'none'}} to='/kids'>Діти</Link></li>
        <li onClick={() => { setMenu('kids, mens, womens') }}><Link className="menu-link" style={{textDecoration: 'none'}} to='/all-products'>Всі товари</Link></li>
      </ul>
   
   
      {menu === 'shop' ? null : <></>}
      <div className='nav-login-cart'>
        {localStorage.getItem('auth-token')
        ?<button onClick={()=>{localStorage.removeItem('auth-token');window.location.replace('/')}}>Вийти</button>:
        <Link to='/login'><button>Вхід</button></Link>}
       <Link to='/cart'><img src={cart_icon} alt='' /></Link> 
        <div className='nav-cart-count'>
          {getTotalCartItems()}
        </div>
      </div>
    </div>
  )
}

export default Navbar;

