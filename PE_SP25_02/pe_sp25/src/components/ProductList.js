import React from 'react';
import ProductCard from './ProductCard';

export default function ProductList({ products = [], onAddReview }) {
  if (!products.length) return <div className="p-3">No products found.</div>;
  return (
    <div className="d-flex flex-wrap">
      {products.map(p => (
        <ProductCard key={p.id} product={p} onAddReview={onAddReview} />
      ))}
    </div>
  );
}
