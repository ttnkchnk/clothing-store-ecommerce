import React, { useState, useEffect } from 'react';
import './ListProduct.css';
import cross_icon from '../../assets/cross_icon.png';

const ListProduct = () => {
  const [allproducts, setAllProducts] = useState([]);

 
  const fetchInfo = async () => {
  await fetch('http://localhost:4000/allproducts')
  .then((res)=>res.json())
  .then((data)=>{setAllProducts(data)});
  }

  useEffect(() => {
    fetchInfo();
  }, []); // Empty dependency array to run the effect only once on component mount

  // Function to remove a product
  const remove_product = async (id) => {
      await fetch('http://localhost:4000/removeproduct', {
        method: 'POST',
        headers: {
          Accepte:'application/json',
          'Content-Type':'application/json'
        },
        body:JSON.stringify({id:id})
      })
      await  fetchInfo();
    }

  return (
    <div className='listproduct'> 
      <h1>All products list</h1>
      <div className="list-product-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Old price</p>
        <p>New price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="list-product-all-products">
        {allproducts.map((product,index) => {
          return <div key={index} className="list-product-format-main list-product-format">
            <img src={product.image} alt="" className="list-product-product-icon" />
            <p>{product.name}</p>
            <p>${product.old_price}</p>
            <p>${product.new_price}</p>
            <p>{product.category}</p>
            <img onClick={()=>{remove_product(product.id)}} className='list-product-remove-icon' src={cross_icon} alt="" />
          </div>
        
        })}
      </div>
    </div>
  );
};

export default ListProduct;




