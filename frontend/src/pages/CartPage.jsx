import React, { useState } from 'react';
import { useCart } from '../context/CartContext.jsx';
import { useNavigate } from 'react-router-dom';
import api from '../api/axiosConfig.js';
import styles from './HomePage.module.css';
import formStyles from '../components/Form.module.css';

const CartPage = () => {
  const { items, removeItem, clearCart, cartCount } = useCart();
  const navigate = useNavigate();
  
  // Add state for messages
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const total = items.reduce((acc, item) => acc + item.qty * item.product.price, 0);

  const handleCheckout = async () => {
    setLoading(true);
    setError('');
    setSuccess('');

    const ordersByVendor = items.reduce((acc, item) => {
      const vendorId = item.product.owner._id; 
      if (!acc[vendorId]) {
        acc[vendorId] = {
          vendorId: vendorId,
          items: [],
          totalPrice: 0,
        };
      }
      acc[vendorId].items.push({
        product: item.product._id,
        quantity: item.qty,
      });
      acc[vendorId].totalPrice += item.product.price * item.qty;
      return acc;
    }, {});

    const orderPromises = Object.values(ordersByVendor).map(order => {
      return api.post('/orders', order); 
    });

    try {
      await Promise.all(orderPromises);
      
      setSuccess('Order placed successfully! Redirecting to profile...');
      setLoading(false);
      clearCart();
      
      setTimeout(() => {
        navigate('/profile');
      }, 2000); // Wait 2 seconds before redirecting

    } catch (err) {
      console.error('Checkout failed', err);
      setError('Failed to place order. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div>
      <header className={styles.pageHeader}>
        <h1>My Cart</h1>
      </header>
      {cartCount === 0 ? (
        <p className={styles.loading}>Your cart is empty.</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
          {/* Column 1: Cart Items */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* Show success/error messages */}
            {success && <p className={formStyles.success}>{success}</p>}
            {error && <p className={formStyles.error}>{error}</p>}

            {items.map((item) => (
              <div key={item.product._id} style={{ display: 'flex', background: 'var(--color-gray-dark)', padding: '1rem', borderRadius: '8px', alignItems: 'center' }}>
                <div style={{ flexGrow: 1 }}>
                  <h3>{item.product.name}</h3>
                  <p>Qty: {item.qty}</p>
                  <p>Price: ${item.product.price.toFixed(2)}</p>
                  <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)'}}>
                    Vendor: {item.product.owner.name || 'Unknown'}
                  </p>
                </div>
                <button onClick={() => removeItem(item.product._id)} style={{ background: 'var(--color-error)'}}>
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Column 2: Checkout Summary */}
          <div className={formStyles.formContainer}>
            <h2 className={formStyles.title}>Cart Summary</h2>
            <div style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>
              Subtotal ({cartCount} items):
              <strong style={{ float: 'right' }}>
                ${total.toFixed(2)}
              </strong>
            </div>
            {/* Update the button to call the new function
              and show a loading state */}
            <button 
              onClick={handleCheckout} 
              style={{ width: '100%' }}
              disabled={loading}
            >
              {loading ? 'Placing Order...' : 'Proceed to Checkout'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;