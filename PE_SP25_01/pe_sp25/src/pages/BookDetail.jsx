import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    api.get(`/books/${id}`)
      .then(res => setBook(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!book) return <div>Loading...</div>;

  return (
    <div>
      <h2>{book.bookName}</h2>
      <img src={book.bookImage} alt={book.bookName} style={{maxWidth:300}} />
      <p>Type: {book.bookType}</p>
      <p>Status: {book.bookReadingStatus}</p>
      <p>isUnread: {book.isUnread ? 'true' : 'false'}</p>
    </div>
  );
};

export default BookDetail;
