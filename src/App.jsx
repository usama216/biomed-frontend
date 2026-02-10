import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import CartSidebar from './components/CartSidebar';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CheckoutPage from './pages/CheckoutPage';
import CheckoutSuccessPage from './pages/CheckoutSuccessPage';
import HealthPointsPage from './pages/HealthPointsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import OffersPage from './pages/OffersPage';
import AdminLayout from './components/AdminLayout';

function AppContent() {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id, quantity) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  return (
      <div className="min-h-screen bg-white">
        {!isAdmin && (
          <Header cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)} onCartClick={() => setIsCartOpen(true)} />
        )}
        <Routes>
          <Route path="/" element={<HomePage addToCart={addToCart} />} />
          <Route path="/products" element={<ProductsPage addToCart={addToCart} />} />
          <Route path="/products/:category" element={<ProductsPage addToCart={addToCart} />} />
          <Route path="/product/:id" element={<ProductDetailPage addToCart={addToCart} />} />
          <Route path="/checkout" element={<CheckoutPage cartItems={cartItems} onOrderSuccess={() => setCartItems([])} />} />
          <Route path="/checkout/success" element={<CheckoutSuccessPage onOrderSuccess={() => setCartItems([])} />} />
          <Route path="/offers" element={<OffersPage addToCart={addToCart} />} />
          <Route path="/health-points" element={<HealthPointsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/admin/*" element={<AdminLayout />} />
        </Routes>
        {!isAdmin && (
          <>
            <Footer />
            <CartSidebar
              isOpen={isCartOpen}
              onClose={() => setIsCartOpen(false)}
              cartItems={cartItems}
              updateQuantity={updateQuantity}
              removeItem={removeItem}
            />
          </>
        )}
      </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
