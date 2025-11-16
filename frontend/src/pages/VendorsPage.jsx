import React, { useState, useEffect } from 'react';
import api from '../api/axiosConfig.js';
import { Link } from 'react-router-dom';
import styles from './HomePage.module.css'; 

const VendorsPage = () => {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchVendors = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await api.get('/users/vendors');
        setVendors(response.data);
      } catch (err) {
        console.error('Failed to fetch vendors', err);
        setError('Failed to load vendors.');
      }
      setLoading(false);
    };
    fetchVendors();
  }, []); 

  return (
    <div>
      <header className={styles.pageHeader}>
        <h1>All Vendors</h1>
        <p>Browse stores from other students.</p>
      </header>
      {loading ? (
        <p className={styles.loading}>Loading vendors...</p>
      ) : error ? (
        <p className={styles.error}>{error}</p>
      ) : (
        <div className={styles.productGrid}>
          {vendors.length > 0 ? (
            vendors.map((vendor) => (
              <div key={vendor._id} className={styles.productCard}>
                <div className={styles.cardContent}>
                  <h3 style={{ textAlign: 'center', width: '100%' }}>
                    {vendor.name}
                  </h3>
                  <Link to={`/vendor/${vendor._id}`} className={styles.viewButton} style={{marginTop: '1rem'}}>
                    View Store
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className={styles.loading}>No vendors have registered yet.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default VendorsPage;