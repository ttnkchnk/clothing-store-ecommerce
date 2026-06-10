import React, { useState } from 'react';
import axios from 'axios';
import '../Newsletter/Newsletter.css';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/subscribe', { email });
      setMessage(response.data);
      setEmail('');
    } catch (error) {
      console.error('Subscription error:', error); // Log the error for debugging
      setMessage('Error subscribing');
    }
  };

  return (
    <div className='news-letter'>
      <h1>Отримуй ексклюзивні пропозиції</h1>
      <p>Підпишись на нашу розсилку та залишайтеся в курсі</p>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="email"
            placeholder='Твій email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Підписатися</button>
        </div>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Newsletter;

