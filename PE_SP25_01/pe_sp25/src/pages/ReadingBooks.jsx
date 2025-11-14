import React, { useEffect, useState } from 'react';
import api from '../services/api';

const ReadingBooks = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    api.get('/books?bookReadingStatus=2')
      .then(res => setBooks(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Reading Books (status = 2)</h2>
      <div className="row">
        {books.map(b => (
          <div key={b.id} className="col-md-4 mb-3">
            <div className="card">
              <img src={b.bookImage} className="card-img-top" alt={b.bookName} />
              <div className="card-body">
                <h5 className="card-title">{b.bookName}</h5>
                <p className="card-text">Type: {b.bookType}</p>
                <p className="card-text">Status: {b.bookReadingStatus}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReadingBooks;
