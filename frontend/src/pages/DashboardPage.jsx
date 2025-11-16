import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import api from '../api/axiosConfig.js';
import { Link } from 'react-router-dom';
import styles from './DashboardPage.module.css'; 

const DashboardPage = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Helper function to get status styling
  const getStatusClass = (status) => {
    if (status === 'Pending') return styles.statusPending;
    if (status === 'Completed') return styles.statusCompleted;
    return '';
  };

  useEffect(() => {
    const fetchVendorOrders = async () => {
      try {
        setLoading(true);
        const response = await api.get('/orders/my-orders');
        // Sort orders to show Pending first
        const sortedOrders = response.data.sort((a, b) => 
          a.status === 'Pending' ? -1 : b.status === 'Pending' ? 1 : 0
        );
        setOrders(sortedOrders);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch your orders.');
        setLoading(false);
      }
    };

    if (user.role === 'vendor') {
      fetchVendorOrders();
    }
  }, [user]);

  return (
    <div>
      <header className={styles.header}>
        <h2>Welcome to your Dashboard, {user.name}!</h2>
      </header>
      
      <div className={styles.quickActions}>
        <Link to="/dashboard/add-product" className={styles.actionLink}>
          + Add New Product
        </Link>
        {/* <Link to="/dashboard/inventory" className={styles.actionLink}>
          Manage My Inventory
        </Link> */}
      </div>

      <h3 className={styles.ordersTitle}>Your Recent Orders</h3>
      {loading && <p className={styles.loading}>Loading orders...</p>}
      {error && <p className={styles.error}>{error}</p>}
      
      <div className={styles.orderList}>
        {orders.length > 0 ? (
          orders.map((order) => (
            <div key={order._id} className={styles.orderCard}>
              <div className={styles.orderHeader}>
                <div>
                  <p>Customer: <strong>{order.studentId.name}</strong></p>
                  <p className={styles.orderId}>Order ID: {order._id}</p>
                </div>
                <span className={`${styles.orderStatus} ${getStatusClass(order.status)}`}>
                  {order.status}
                </span>
              </div>
              <div className={styles.orderBody}>
                <p>Total Price: <strong style={{color: "var(--color-primary)"}}>${order.totalPrice.toFixed(2)}</strong></p>
                <p>Items:</p>
                <ul>
                  {order.items.map((item, index) => (
                    <li key={index}>
                      {item.quantity} x (Product ID: {item.product})
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))
        ) : (
          !loading && <p className={styles.loading}>You have no orders yet.</p>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;