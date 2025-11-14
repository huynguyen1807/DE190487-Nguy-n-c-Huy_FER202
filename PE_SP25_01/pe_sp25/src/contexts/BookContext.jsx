import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';

export const BookContext = createContext(null);

export const BookProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/books')
      .then(res => setBooks(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const value = { books, setBooks, loading };

  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
};
