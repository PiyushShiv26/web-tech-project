import React, { useState, useEffect } from 'react';
import api from '../api/axiosConfig.js';
import { useAuth } from '../context/AuthContext.jsx';
import styles from './DashboardPage.module.css';
import formStyles from '../components/Form.module.css';

const ProfilePage = () => {
  const { user } = useAuth(); // Get user info from context
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyOrders = async () => {
      setLoading(true);
      try {
        const response = await api.get('/orders/my-orders');
        setOrders(response.data);
      } catch (err) {
        console.error("Failed to fetch orders", err);
      }
      setLoading(false);
    };
    fetchMyOrders();
  }, []);

  return (
    <div>
      <header className={styles.header}>
        <h2>My Profile</h2>
      </header>

      {/* User Details Card */}
      <div className={formStyles.formContainer} style={{ marginBottom: '2rem' }}>
        <h3 className={formStyles.title} style={{ fontSize: '1.5rem' }}>My Details</h3>
        <div className={formStyles.formGroup}>
          <label>Name:</label>
          <input type="text" value={user.name} readOnly disabled />
        </div>
        <div className={formStyles.formGroup}>
          <label>Email:</label>
          <input type="email" value={user.email} readOnly disabled />
        </div>
        <div className={formStyles.formGroup}>
          <label>Role:</label>
          <input type="text" value={user.role} readOnly disabled />
        </div>
      </div>

      {/* Order History */}
      <h3 className={styles.ordersTitle}>My Order History</h3>
      {loading ? (
        <p>Loading orders...</p>
      ) : (
        <div className={styles.orderList}>
          {orders.length > 0 ? (
            orders.map(order => (
              <div key={order._id} className={styles.orderCard}>
                <div className={styles.orderHeader}>
                  <p>Order from: <strong>{order.vendorId.name}</strong></p>
                  <span className={`${styles.orderStatus} ${order.status === 'Pending' ? styles.statusPending : styles.statusCompleted}`}>
                    {order.status}
                  </span>
                </div>
                <div className={styles.orderBody}>
                  <p>Total: <strong style={{color: 'var(--color-primary)'}}>${order.totalPrice.toFixed(2)}</strong></p>
                  <p className={styles.orderId}>Order ID: {order._id}</p>
                </div>
              </div>
            ))
          ) : (
            <p>You have not placed any orders yet.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfilePage;