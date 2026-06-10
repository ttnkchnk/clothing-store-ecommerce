import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <h2>Admin Panel</h2>
      <ul>
        <li>
          <Link to="../addproduct">Add Product</Link>
        </li>
        <li>
          <Link to="../listproduct">List Products</Link>
        </li>
        <li>
          <Link to="../orders">Orders</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;





