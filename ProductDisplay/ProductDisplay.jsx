import React, { useContext } from 'react'
import './productDisplay.css'
import star_icon from '../assets/star_icon.png';
import star_dull_icon from '../assets/star_dull_icon.png';
import { ShopContext } from '../../context/ShopContext';

const ProductDisplay = (props) => {

  const {product} = props;
  const {addToCart} = useContext(ShopContext);
  return (
    <div className='productdisplay'>
      <div className="productdisplay-left">
      <div className="productdisplay-imglist">
        <img src={product.image} alt="" />
        <img src={product.image} alt="" />
        <img src={product.image} alt="" />
        <img src={product.image} alt="" />
      </div>
      <div className="productlist-img">
        <img className='productdisplay-main-img' src={product.image} alt="" />
      </div>
      </div>
      <div className="productdisplay-right">
      <h1>{product.name}</h1>
      <div className="productdisplay-right-stars">
        <img src={star_icon} alt="" />
        <img src={star_icon} alt="" />
        <img src={star_icon} alt="" />
        <img src={star_icon} alt="" />
        <img src={star_dull_icon} alt="" />
        <p>(122)</p>
      </div>
      <div className="productdisplay-right-prices">
        <div className="productdisplay-right-oldprice">${product.old_price}</div>
        <div className="productdisplay-right-newprice">${product.new_price}</div>
      </div>
      <div className="productdisplay-right-description">
       Товар виготовленний з натуральної сировини.
      </div>
      <div className="productdisplay-right-size">
        <h2>Розміри</h2>
        <div className="productdisplay-right-sizes">
          <div>XS</div>
          <div>S</div>
          <div>M</div>
          <div>L</div>
          <div>XL</div>
          <div>XXL</div>
        </div>
      </div>
      <button onClick={()=>{addToCart(product.id)}}>Купити</button>
      <p className='productdisplay-right-category'><span>Категорія:</span> Жінки, Спідниці, Міні</p>
      <p className='productdisplay-right-category'><span>Теги:</span> Сучасне, Нове</p>
      </div>
    </div>
  )
}

export default ProductDisplay
