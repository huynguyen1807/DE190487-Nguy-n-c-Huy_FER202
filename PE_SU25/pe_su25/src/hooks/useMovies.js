import { useState, useEffect } from 'react';
import { getMovies } from '../services/api';

export const useMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      const data = await getMovies();
      // Sort by rating descending
      const sortedMovies = data.sort((a, b) => b.rating - a.rating);
      setMovies(sortedMovies);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error loading movies:', err);
    } finally {
      setLoading(false);
    }
  };

  return { movies, loading, error, refetch: fetchMovies };
};
