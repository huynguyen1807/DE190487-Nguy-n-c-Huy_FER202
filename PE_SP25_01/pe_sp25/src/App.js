import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BookProvider } from './contexts/BookContext';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <BookProvider>
      <AppRoutes />
    </BookProvider>
  );
}

export default App;
