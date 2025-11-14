import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

// Import components
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import Products from './pages/Products.jsx';
import Contact from './pages/Contact.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import DashboardLayout from './pages/DashboardLayout.jsx';
import DashboardHome from './pages/DashboardHome.jsx';
import Settings from './pages/Settings.jsx';
import Reports from './pages/Reports.jsx';
import NotFound from './pages/NotFound.jsx';

function App() {
  return (
    <div className="App">
      {/* Navigation Bar - hiển thị ở mọi trang */}
      <Navbar />
      
      {/* Main Content Container */}
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        padding: '0 2rem',
        minHeight: '500px'
      }}>
        <Routes>
          {/* Bài Tập 1: Routes Cơ bản */}
          <Route path="/" element={<Home />} />
          <Route path="/san-pham" element={<Products />} />
          <Route path="/lien-he" element={<Contact />} />
          
          {/* Bài Tập 2: Dynamic Routing */}
          <Route path="/san-pham/:productId" element={<ProductDetail />} />
          
          {/* Bài Tập 3: Nested Routes */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            {/* Index Route - hiển thị khi chỉ có /dashboard */}
            <Route index element={<DashboardHome />} />
            <Route path="settings" element={<Settings />} />
            <Route path="reports" element={<Reports />} />
          </Route>
          
          {/* 404 Route - phải đặt cuối cùng */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
