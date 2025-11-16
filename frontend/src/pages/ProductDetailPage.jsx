import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axiosConfig.js';
import { useCart } from '../context/CartContext.jsx'; 
import styles from './HomePage.module.css';

const ProductDetailPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart(); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/products/${productId}`);
        setProduct(response.data);
      } catch (err) {
        console.error("Failed to fetch product", err);
      }
      setLoading(false);
    };
    fetchProduct();
  }, [productId]);

  const handleAddToCart = () => {
    addItem(product, 1);
    navigate('/cart'); 
  };

  if (loading) return <p className={styles.loading}>Loading...</p>;
  if (!product) return <p className={styles.error}>Product not found.</p>;

  return (
    <div>
      <header className={styles.pageHeader}>
        <h1>{product.name}</h1>
      </header>
      <div style={{ background: 'var(--color-gray-dark)', padding: '2rem', borderRadius: '8px', maxWidth: '700px', margin: 'auto' }}>
        <p>{product.description}</p>
        <h2 style={{ color: 'var(--color-primary)', margin: '1rem 0' }}>
          ${product.price.toFixed(2)}
        </h2>
        <p style={{ color: 'var(--color-text-muted)' }}>
          Stock: {product.stock}
        </p>
        <button onClick={handleAddToCart} style={{ marginTop: '2rem' }}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetailPage;