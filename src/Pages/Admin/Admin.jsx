import React from 'react';
import './Admin.css';
import Sidebar from '../../Components/Sidebar/Sidebar';
import { Routes, Route, Navigate } from 'react-router-dom';
import AddProduct from '../../Components/AddProduct/AddProduct';
import ListProduct from '../../Components/ListProduct/ListProduct';
import Orders from '../../Components/Orders/Orders';
import LoginSignup from '../LoginSignup';
import Newsletter from '../../../../frontend/src/Components/Newsletter/Newsletter';

const Admin = () => {
  return (
    <div className='admin'>
      <Sidebar />
      <div className='admin-content'>
        <Routes>
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/listproduct" element={<ListProduct />} />
          <Route path="/orders" element={<Orders />} />
          <Route path='/login' element={<LoginSignup/>}/>
          <Route path="*" element={<Navigate to="/admin/addproduct" />} />
        </Routes>
      </div>
    </div>
  );
};

export default Admin;




