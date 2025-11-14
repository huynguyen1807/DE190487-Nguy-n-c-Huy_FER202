import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProductsPage from '../pages/ProductsPage';
import ReviewsPage from '../pages/ReviewsPage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ProductsPage />} />
      <Route path="/reviews" element={<ReviewsPage />} />
    </Routes>
  );
}
