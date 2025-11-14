import React, { useEffect, useState } from 'react';
import api from '../services/api';

const AllBooks = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    api.get('/books')
      .then(res => setBooks(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>All Books</h2>
      <ul>
        {books.map(b => (
          <li key={b.id}>{b.bookName} - {b.bookType} - Status: {b.bookReadingStatus}</li>
        ))}
      </ul>
    </div>
  );
};

export default AllBooks;
