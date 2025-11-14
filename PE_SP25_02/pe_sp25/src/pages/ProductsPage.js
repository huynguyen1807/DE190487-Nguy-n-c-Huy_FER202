import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import useProducts from '../hooks/useProducts';
import ProductList from '../components/ProductList';
import api from '../services/api';

export default function ProductsPage() {
  const { products, loading, error, refresh } = useProducts();
  const [category, setCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [reviewerName, setReviewerName] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const categories = useMemo(() => {
    const set = new Set(products.map(p => p.category).filter(Boolean));
    return ['all', ...Array.from(set)];
  }, [products]);

  const filtered = useMemo(() => {
    if (category === 'all') return products;
    return products.filter(p => p.category === category);
  }, [products, category]);

  function handleAddReview(product) {
    setSelectedProduct(product);
    setReviewerName('');
    setComment('');
    setRating(5);
    setErrors({});
    setSuccessMessage('');
  }

  async function handleSendReview() {
    const newErrors = {};
    if (!reviewerName.trim()) newErrors.reviewerName = 'Reviewer name is required.';
    if (!comment.trim()) newErrors.comment = 'Comment is required.';
    setErrors(newErrors);
    if (Object.keys(newErrors).length) return;

    const newReview = {
      date: new Date().toISOString(),
      reviewer: reviewerName.trim(),
      comment: comment.trim(),
      rating: Number(rating),
    };

    try {
      const updatedReviews = [...(selectedProduct.reviews || []), newReview];
      await api.patch(`/products/${selectedProduct.id}`, { reviews: updatedReviews });
      setSuccessMessage('Thanks for your review!');
      // refresh product list to show updated average
      await refresh();
      // set selectedProduct to the fresh product data
      const fresh = (await api.get(`/products/${selectedProduct.id}`)).data;
      setSelectedProduct(fresh);
      setReviewerName('');
      setComment('');
      setRating(5);
    } catch (err) {
      setErrors({ submit: 'Failed to submit review. Try again.' });
    }
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Products Review System</h2>
      <div className="d-flex align-items-center mb-3">
        <label className="me-2">Category:</label>
        <select className="form-select w-auto me-3" value={category} onChange={e => setCategory(e.target.value)}>
          {categories.map(c => (
            <option value={c} key={c}>{c === 'all' ? 'All categories' : c}</option>
          ))}
        </select>
        <button className="btn btn-outline-secondary me-2" onClick={refresh}>Refresh</button>
        <Link to="/reviews" className="btn btn-success">Show Review List</Link>
      </div>

      {loading && <div>Loading products...</div>}
      {error && <div className="text-danger">Error loading products</div>}

      <div className="row">
        <div className="col-md-8">
          <ProductList products={filtered} onAddReview={handleAddReview} />
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Reviews details:</h5>
              {!selectedProduct && <div className="text-muted">Select a product to Review!</div>}

              {selectedProduct && (
                <div>
                  <p><strong>ProductId:</strong> {selectedProduct.id}</p>
                  <p><strong>Title:</strong> {selectedProduct.title}</p>
                  <p><strong>Category:</strong> {selectedProduct.category}</p>
                  <p><strong>Price:</strong> ${selectedProduct.price}</p>

                  <hr />
                  <h6>Add a new Review</h6>
                  <div className="mb-2">
                    <label className="form-label">Reviewer Name</label>
                    <input className="form-control" value={reviewerName} onChange={e => setReviewerName(e.target.value)} />
                    {errors.reviewerName && <div className="text-danger small">{errors.reviewerName}</div>}
                  </div>
                  <div className="mb-2">
                    <label className="form-label">Comment</label>
                    <textarea className="form-control" rows={3} value={comment} onChange={e => setComment(e.target.value)} />
                    {errors.comment && <div className="text-danger small">{errors.comment}</div>}
                  </div>
                  <div className="mb-2">
                    <label className="form-label me-2">Rating</label>
                    <select className="form-select w-auto" value={rating} onChange={e => setRating(e.target.value)}>
                      {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
                    </select>
                  </div>
                  {errors.submit && <div className="text-danger mb-2">{errors.submit}</div>}
                  {successMessage && <div className="text-success mb-2">{successMessage}</div>}
                  <button className="btn btn-warning" onClick={handleSendReview}>Send Review</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
 
