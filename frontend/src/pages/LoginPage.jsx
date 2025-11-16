import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import styles from '../components/Form.module.css'; 

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const loggedInUser = await login(email, password);
      if (loggedInUser.role === 'vendor') {
        navigate('/dashboard');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.title}>Login</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email:</label>
          <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Password:</label>
          <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        {error && <p className={styles.error}>{error}</p>}
        <button type="submit" className={styles.submitButton}>Login</button>
      </form>
    </div>
  );
};

export default LoginPage;