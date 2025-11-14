import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import AllBooks from '../pages/AllBooks';
import ReadingBooks from '../pages/ReadingBooks';
import UnReadBooks from '../pages/UnReadBooks';
import BookDetail from '../pages/BookDetail';
import AddBook from '../pages/AddBook';

const AppRoutes = () => {
  return (
    <Router>
      <NavBar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Navigate to="/AllBooks" replace />} />
          <Route path="/AllBooks" element={<AllBooks />} />
          <Route path="/ReadingBooks" element={<ReadingBooks />} />
          <Route path="/UnReadBooks" element={<UnReadBooks />} />
          <Route path="/books/:id" element={<BookDetail />} />
          <Route path="/add" element={<AddBook />} />
        </Routes>
      </div>
    </Router>
  );
};

export default AppRoutes;
