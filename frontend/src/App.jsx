import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import VendorRoute from './components/VendorRoute.jsx';
import styles from './App.module.css';

// importing all pages
import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import VendorsPage from './pages/VendorsPage.jsx';
import VendorStorePage from './pages/VendorStorePage.jsx';
import ProductDetailPage from './pages/ProductDetailPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import CartPage from './pages/CartPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import InventoryPage from './pages/InventoryPage.jsx';
import AddProductPage from './pages/AddProductPage.jsx';

function App() {
  return (
    <>
      <Navbar />
      <main className={styles.container}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/vendors" element={<VendorsPage />} />
          <Route path="/vendor/:vendorId" element={<VendorStorePage />} />
          <Route path="/product/:productId" element={<ProductDetailPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/*Protected Routes */}
          <Route element={<ProtectedRoute />}>
            {/* Student-only routes  */}
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/cart" element={<CartPage />} />

            {/* Vendor-only routes  */}
            <Route element={<VendorRoute />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/dashboard/inventory" element={<InventoryPage />} />
              <Route path="/dashboard/add-product" element={<AddProductPage />} /> 
            </Route>
          </Route>

          <Route path="*" element={<h1>404: Page Not Found</h1>} />
        </Routes>
      </main>
    </>
  );
}

export default App;