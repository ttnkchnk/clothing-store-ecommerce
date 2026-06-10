import React, { useState, useEffect } from 'react';
import './Orders.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('auth-token');
        if (!token) {
          console.error('No token found in local storage');
          return;
        }

        const response = await fetch('http://localhost:4000/orders', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': token
          }
        });

        if (response.status === 401) {
          console.error('Authentication error');
          return;
        }

        const data = await response.json();
        console.log('Fetched orders:', data); // Log the fetched orders
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders', error);
      }
    };
    fetchOrders();
  }, []);

  const deleteOrder = async (orderId) => {
    try {
      const response = await fetch(`http://localhost:4000/deleteOrder/${orderId}`, {
        method: 'DELETE',
        headers: {
          'auth-token': localStorage.getItem('auth-token')
        }
      });

      if (response.ok) {
        setOrders(orders.filter(order => order._id !== orderId));
        alert('Order deleted successfully');
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete order');
      }
    } catch (error) {
      console.error('Delete order failed', error.message);
      alert(`Delete order failed: ${error.message}`);
    }
  };

  return (
    <div className='orders'>
      <h1>Orders</h1>
      {orders.length > 0 ? (
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>User</th>
              <th>Items</th>
              <th>Total Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.userId?.name} ({order.userId?.email}) ({order.userId.phone})</td>
                <td>
                  {order.items.map(item => (
                    <div key={item.productId._id}>
                      {item.productId.name} - {item.quantity} pcs
                    </div>
                  ))}
                </td>
                <td>${order.totalAmount}</td>
                <td>{new Date(order.createdAt).toLocaleString()}</td>
                
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No orders found</p>
      )}
    </div>
  );
};

export default Orders;








