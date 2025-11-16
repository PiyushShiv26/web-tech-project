import React, { useState, useEffect } from 'react';
import api from '../api/axiosConfig.js';
import { useAuth } from '../context/AuthContext.jsx';
import { Link } from 'react-router-dom';
import styles from './DashboardPage.module.css'; 

const InventoryPage = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyProducts = async () => {
      setLoading(true);
      // This is a new route you need: GET /api/products/my-products
      // It finds products where owner === req.user._id
      try {
        const response = await api.get('/products'); 
        const myProducts = response.data.filter(p => p.owner?._id === user._id);
        setProducts(myProducts);
      } catch (err) {
        console.error("Failed to fetch products", err);
      }
      setLoading(false);
    };
    fetchMyProducts();
  }, [user]);

  const handleDelete = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await api.delete(`/products/${productId}`);
        // Filter out the deleted product from state
        setProducts(products.filter(p => p._id !== productId));
      } catch (err) {
        console.error('Failed to delete product', err);
      }
    }
  };

  return (
    <div>
      <header className={styles.header}>
        <h2>Manage My Inventory</h2>
      </header>
      <div className={styles.quickActions}>
        <Link to="/dashboard/add-product" className={styles.actionLink}>
          + Add New Product
        </Link>
      </div>
      {loading ? (
        <p>Loading inventory...</p>
      ) : (
        <div className={styles.orderList}>
          {products.map(product => (
            <div key={product._id} className={styles.orderCard}>
              <div className={styles.orderHeader}>
                <h3>{product.name}</h3>
                <div>
                  <button style={{ marginRight: '1rem' }}>Edit</button>
                  <button 
                    onClick={() => handleDelete(product._id)}
                    style={{ backgroundColor: 'var(--color-error)' }}
                  >
                    Delete
                  </button>
                </div>
              </div>
              <div className={styles.orderBody}>
                <p>Price: ${product.price.toFixed(2)}</p>
                <p>Stock: {product.stock}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InventoryPage;