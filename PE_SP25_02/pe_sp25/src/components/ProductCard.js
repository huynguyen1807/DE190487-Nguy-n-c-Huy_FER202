import React from 'react';

function averageRating(reviews = []) {
  if (!reviews || !reviews.length) return 'N/A';
  const sum = reviews.reduce((s, r) => s + (r.rating || 0), 0);
  return (sum / reviews.length).toFixed(1);
}

export default function ProductCard({ product, onAddReview }) {
  const avg = averageRating(product?.reviews || []);
  return (
    <div className="card m-2" style={{ width: '18rem' }}>
      <div className="card-body">
        <h5 className="card-title">{product?.title}</h5>
        <h6 className="card-subtitle mb-2 text-muted">Price: ${product?.price}</h6>
        <p className="card-text">Category: {product?.category}</p>
        <p className="card-text"><strong>Average Rate: {avg}</strong></p>
        <button className="btn btn-primary" onClick={() => onAddReview && onAddReview(product)}>
          Add New Review
        </button>
      </div>
    </div>
  );
}

