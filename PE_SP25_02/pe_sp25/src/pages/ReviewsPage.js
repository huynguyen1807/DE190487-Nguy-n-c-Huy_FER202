import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { formatDateForAssignment } from '../utils/format';
import { Link } from 'react-router-dom';

export default function ReviewsPage() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    api.get('/products')
      .then(res => {
        if (!mounted) return;
        const products = res.data || [];
        const flattened = [];
        products.forEach(p => {
          (p.reviews || []).forEach(r => {
            flattened.push({
              productId: p.id,
              title: p.title,
              date: r.date,
              reviewer: r.reviewer,
              comment: r.comment,
              rating: r.rating,
            });
          });
        });
        setRows(flattened);
      })
      .catch(err => { if (mounted) setError(err); })
      .finally(() => mounted && setLoading(false));
    return () => { mounted = false; };
  }, []);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>List of Reviews</h2>
        <Link to="/" className="btn btn-outline-secondary">Back to Products</Link>
      </div>

      {loading && <div>Loading...</div>}
      {error && <div className="text-danger">Failed to load reviews</div>}

      {!loading && !rows.length && <div>No reviews available.</div>}

      {!loading && rows.length > 0 && (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ProductId</th>
                <th>Title</th>
                <th>Date</th>
                <th>Reviewer</th>
                <th>Comment</th>
                <th>Rating</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, idx) => (
                <tr key={idx}>
                  <td>{r.productId}</td>
                  <td>{r.title}</td>
                  <td>{formatDateForAssignment(r.date)}</td>
                  <td>{r.reviewer}</td>
                  <td>{r.comment}</td>
                  <td>{r.rating}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
