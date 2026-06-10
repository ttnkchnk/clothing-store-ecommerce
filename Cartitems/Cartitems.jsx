import React, { useContext } from 'react';
import axios from 'axios';
import './Cartitems.css';
import { ShopContext } from '../../context/ShopContext';
import remove_icon from '../assets/cart_cross_iconn.png';

const Cartitems = () => {
  const { getTotalCartAmount, all_product, cartItems, removeFromCart } = useContext(ShopContext);

  const cartItemsInCart = all_product.filter(product => cartItems[product.id] > 0);

  const handleOrder = async () => {
    const orderItems = cartItemsInCart.map(product => ({
      productId: product._id, // Ensure you are using MongoDB ObjectId
      quantity: cartItems[product.id]
    }));

    const orderData = {
      items: orderItems,
      totalAmount: getTotalCartAmount()
    };

    try {
      const token = localStorage.getItem('auth-token'); // Assuming you store the auth token in localStorage
      const response = await axios.post('http://localhost:4000/createOrder', orderData, {
        headers: { 'auth-token': token }
      });
      if (response.status === 201) {
        alert('Order placed successfully');
        // Optionally clear the cart or redirect the user
      }
    } catch (error) {
      console.error('Error placing order', error);
      alert('Failed to place order');
    }
  };

  return (
    <div className='cart-items'>
      <h1>Кошик</h1>
      
      <div className="cart-items-formatmain">
        <p>Товар</p>
        <p>Назва</p>
        <p>Ціна</p>
        <p>Кількість</p>
        <p>Всього</p>
        <p>Видалити</p>
      </div>
      <hr />
      {cartItemsInCart.map(product => (
        <div key={product.id}>
          <div className="cart-items-format cart-items-formatmain">
            <img src={product.image} alt={product.name} className='cart-icon-product-icon' />
            <p>{product.name}</p>
            <p>${product.new_price ? product.new_price : 0}</p>
            <button className='cart-items-quantity'>{cartItems[product.id]}</button>
            <p>${product.new_price ? product.new_price * cartItems[product.id] : 0}</p>
            <img className='cart-items-remove-icon' src={remove_icon} onClick={() => removeFromCart(product.id)} alt={`Remove ${product.name} from cart`} />
          </div>
          <hr />
        </div>
      ))}
      <div className="cart-items-down">
        <div className="cart-items-total">
          <h1>Всього</h1>
          <div>
            <div className="cart-items-totalitem">
              <p>Сума замовлення</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-items-totalitem">
              <p>Доставка</p>
              <p>Безкоштовно</p>
            </div>
            <hr />
            <div className="cart-items-totalitem">
              <h3>Загальна сума</h3>
              <h3>${getTotalCartAmount()}</h3>
            </div>
          </div>
          <button onClick={handleOrder}>Оформити замовлення</button>
        </div>
        {/* <div className="cart-items-promocode">
          <p>Якщо Ви маєте промокод, то введіть його у поле нижче</p>
          <div className="cart-items-promo-box">
            <input type="text" placeholder='Промокод' />
            <button>Підтвердити</button>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default Cartitems;



