import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MovieManager from './pages/MovieManager';
import ViewDetailsPage from './pages/ViewDetailsPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Login from './components/Login';
import { AuthProvider, useAuthState } from './contexts/AuthContext';

function AppContent() {
  const { user } = useAuthState();
  
  return (
    <Router>
      <Header />
      {user ? (
        <Routes>
          <Route path="/" element={<Navigate to="/movies" replace />} />
          <Route path="/movies" element={<MovieManager />} />
          <Route path="/movies/:id" element={<ViewDetailsPage />} />
          <Route path="*" element={<Navigate to="/movies" replace />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="*" element={<Login />} />
        </Routes>
      )}
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
