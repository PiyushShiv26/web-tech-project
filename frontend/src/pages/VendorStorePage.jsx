import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/axiosConfig.js';
import styles from './HomePage.module.css'; 

const VendorStorePage = () => {
  const { vendorId } = useParams(); // Get vendor ID from the URL
  const [storeData, setStoreData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchVendorStore = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await api.get(`/users/store/${vendorId}`);
        setStoreData(response.data);
      } catch (err) {
        console.error('Failed to fetch vendor store', err);
        setError('Could not load vendor store.');
      }
      setLoading(false);
    };
    
    fetchVendorStore();
  }, [vendorId]); 

  if (loading) return <p className={styles.loading}>Loading store...</p>;
  if (error) return <p className={styles.error}>{error}</p>;
  if (!storeData) return <p className={styles.loading}>Vendor not found.</p>;

  const { vendor, products } = storeData;

  return (
    <div>
      <header className={styles.pageHeader}>
        <h1>{vendor.name}'s Store</h1>
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
                
                <Link 
                  to={`/product/${product._id}`} 
                  className={styles.viewButton} 
                  style={{marginTop: '1rem'}}
                >
                  View Item
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className={styles.loading}>This vendor has no products listed yet.</p>
        )}
      </div>
    </div>
  );
};

export default VendorStorePage;