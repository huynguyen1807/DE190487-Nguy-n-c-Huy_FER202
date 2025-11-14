import React, { createContext, useState, useContext, useEffect } from 'react';
import { getMovies } from '../services/api';

const MovieContext = createContext();

export const useMovieContext = () => {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error('useMovieContext must be used within MovieProvider');
  }
  return context;
};

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      const data = await getMovies();
      const sortedMovies = data.sort((a, b) => b.rating - a.rating);
      setMovies(sortedMovies);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const value = {
    movies,
    loading,
    error,
    refetchMovies: fetchMovies
  };

  return (
    <MovieContext.Provider value={value}>
      {children}
    </MovieContext.Provider>
  );
};
