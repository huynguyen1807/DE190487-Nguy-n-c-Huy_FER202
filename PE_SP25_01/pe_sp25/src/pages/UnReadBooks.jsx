import React, { useEffect, useState } from 'react';
import api from '../services/api';

const UnReadBooks = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    api.get('/books?isUnread=true')
      .then(res => setBooks(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Unread Books (isUnread = true)</h2>
      <ul>
        {books.map(b => (
          <li key={b.id}>{b.bookName} - {b.bookType}</li>
        ))}
      </ul>
    </div>
  );
};

export default UnReadBooks;
