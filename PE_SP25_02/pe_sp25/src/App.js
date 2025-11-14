import logo from './logo.svg';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { ReviewsProvider } from './contexts/ReviewsContext';

function App() {
  return (
    <BrowserRouter>
      <ReviewsProvider>
        <AppRoutes />
      </ReviewsProvider>
    </BrowserRouter>
  );
}

export default App;
