import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import HomePage from './pages/HomePage';
import FooterPage from './pages/FooterPage';
import AccountPage from './pages/AccountPage';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'account':
        return <AccountPage />;
      case 'about':
        return (
          <div className="container my-5">
            <h1>About Us</h1>
            <p>This is the About page for Movie Management App.</p>
          </div>
        );
      case 'contact':
        return (
          <div className="container my-5">
            <h1>Contact Us</h1>
            <p>This is the Contact page for Movie Management App.</p>
          </div>
        );
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="App">
      <NavBar onPageChange={handlePageChange} currentPage={currentPage} />
      {renderCurrentPage()}
      <FooterPage />
    </div>
  );
}

export default App;
