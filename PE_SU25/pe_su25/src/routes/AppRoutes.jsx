import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MovieList from '../pages/MovieList';
import BookingCreate from '../pages/BookingCreate';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/movies" element={<MovieList />} />
      <Route path="/booking/create" element={<BookingCreate />} />
      <Route path="/" element={<Navigate to="/movies" replace />} />
    </Routes>
  );
};

export default AppRoutes;
