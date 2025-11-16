import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import styles from './Navbar.module.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cartCount } = useCart(); 
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isStudent = user && user.role === 'student';
  const isVendor = user && user.role === 'vendor';

  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles.logo}>CampusCart</Link>
      
      <div className={styles.links}>
        <NavLink to="/" className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`} end>
          Home
        </NavLink>
        <NavLink to="/vendors" className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}>
          Vendors
        </NavLink>
        
        {isStudent && (
          <NavLink to="/profile" className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}>
            My Profile
          </NavLink>
        )}
        {isVendor && (
          <NavLink to="/dashboard" className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}>
            Dashboard
          </NavLink>
        )}
      </div>

      <div className={styles.userActions}>
        {user ? (
          <>
            <span className={styles.welcomeText}>Welcome, {user.name}!</span>
            {isStudent && (
              <NavLink to="/cart" className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}>
                Cart
                {/* 3. Show cart count */}
                {cartCount > 0 && (
                  <span style={{ marginLeft: '5px', background: 'var(--color-primary)', color: 'white', borderRadius: '50%', padding: '2px 8px', fontSize: '0.8rem' }}>
                    {cartCount}
                  </span>
                )}
              </NavLink>
            )}
            <button onClick={handleLogout} className={styles.logoutButton}>
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login" className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}>
              Login
            </NavLink>
            <NavLink to="/register" className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}>
              Register
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;