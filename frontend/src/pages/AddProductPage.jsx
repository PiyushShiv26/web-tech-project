import React, { useState } from 'react';
import api from '../api/axiosConfig.js';
import { useNavigate } from 'react-router-dom';
import styles from '../components/Form.module.css'; 

const AddProductPage = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await api.post('/products', {
        name,
        description,
        price: Number(price),
        stock: Number(stock),
      });

      setSuccess(`Product "${response.data.name}" created!`);
      setName('');
      setDescription('');
      setPrice('');
      setStock('');
      setTimeout(() => navigate('/dashboard'), 2000);
    } catch (err) {
      setError('Failed to create product. ' + (err.response?.data?.message || 'Server error'));
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.title}>Add New Product</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Product Name:</label>
          <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="description">Description:</label>
          <input id="description" type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="price">Price ($):</label>
          <input id="price" type="number" min="0" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} required />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="stock">Stock Quantity:</label>
          <input id="stock" type="number" min="0" step="1" value={stock} onChange={(e) => setStock(e.target.value)} required />
        </div>
        
        {error && <p className={styles.error}>{error}</p>}
        {success && <p className={styles.success}>{success}</p>}
        <button type="submit" className={styles.submitButton}>Add Product</button>
      </form>
    </div>
  );
};

export default AddProductPage;