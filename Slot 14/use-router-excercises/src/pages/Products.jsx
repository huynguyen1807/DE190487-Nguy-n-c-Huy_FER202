import React from 'react';
import { Link } from 'react-router-dom';

function Products() {
  const products = [
    { id: 101, name: 'Laptop Dell XPS 13' },
    { id: 102, name: 'iPhone 15 Pro' },
    { id: 103, name: 'Samsung Galaxy S24' }
  ];

  return (
    <div>
      <h1>Danh Sách Sản Phẩm</h1>
      <p>Chọn một sản phẩm để xem chi tiết:</p>
      <ul>
        {products.map(product => (
          <li key={product.id} style={{ marginBottom: '10px' }}>
            <Link 
              to={`/san-pham/${product.id}`}
              style={{ 
                textDecoration: 'none', 
                color: '#007bff',
                fontSize: '16px' 
              }}
            >
              {product.name} (ID: {product.id})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Products;