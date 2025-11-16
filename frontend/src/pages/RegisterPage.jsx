import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import styles from '../components/Form.module.css'; 

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isVendor, setIsVendor] = useState(false);
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const role = isVendor ? 'vendor' : 'student';
      await register(name, email, phone, password, role);
      
      // Navigate based on role
      if (role === 'vendor') {
        navigate('/dashboard');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError('Registration failed. User might already exist.');
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.title}>Register</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Name:</label>
          <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email:</label>
          <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="phone">Phone:</label>
          <input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Password:</label>
          <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div className={styles.checkboxGroup}>
          <input id="isVendor" type="checkbox" checked={isVendor} onChange={(e) => setIsVendor(e.target.checked)} />
          <label htmlFor="isVendor">Register as a Vendor?</label>
        </div>
        {error && <p className={styles.error}>{error}</p>}
        <button type="submit" className={styles.submitButton}>Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;