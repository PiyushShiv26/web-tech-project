import React, { useState, useEffect } from 'react';
import api from '../api/axiosConfig.js';
import { Link, useNavigate } from 'react-router-dom';
import styles from './HomePage.module.css';
import { useCart } from '../context/CartContext.jsx'; 
import { useAuth } from '../context/AuthContext.jsx'; 

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const { addItem } = useCart(); 
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await api.get('/products');
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch products.');
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    if (!user) {
      navigate('/login'); // Redirect to login if not logged in
    } else {
      addItem(product, 1); // Pass the entire product object
    }
  };

  if (loading) return <p className={styles.loading}>Loading products...</p>;
  if (error) return <p className={styles.error}>{error}</p>;

  return (
    <div>
      <header className={styles.pageHeader}>
        <h1>Welcome to CampusCart</h1>
        <p>Browse products from student vendors.</p>
      </header>
      
      <div className={styles.productGrid}>
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product._id} className={styles.productCard}>
              <div className={styles.cardContent}>
                <h3>{product.name}</h3>
                <p className={styles.description}>{product.description}</p>
                <p className={styles.price}>${product.price.toFixed(2)}</p>
                <p className={styles.stock}>In Stock: {product.stock}</p>
                <p className={styles.vendor}>Sold by: {product.owner?.name || 'Unknown'}</p>
                
                <div style={{display: 'flex', gap: '0.5rem', marginTop: 'auto'}}>
                  <Link to={`/product/${product._id}`} className={styles.viewButton} style={{flex: 1}}>
                    View Item
                  </Link>
                  {/* Only show "Add to Cart" if user is a student */}
                  {user && user.role === 'student' && (
                    <button 
                      onClick={() => handleAddToCart(product)} 
                      style={{flex: 1}}
                    >
                      Add to Cart
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className={styles.loading}>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;