import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function ProductDetail() {
  const { productId } = useParams();
  const navigate = useNavigate();

  // Mock data cho demo
  const productData = {
    101: { name: 'Laptop Dell XPS 13', price: '25,000,000 VND', description: 'Laptop cao cấp với thiết kế mỏng nhẹ' },
    102: { name: 'iPhone 15 Pro', price: '28,000,000 VND', description: 'iPhone mới nhất với chip A17 Pro' },
    103: { name: 'Samsung Galaxy S24', price: '22,000,000 VND', description: 'Smartphone Android flagship' }
  };

  const product = productData[productId];

  const handleGoBack = () => {
    navigate('/san-pham');
  };

  return (
    <div>
      <h1>Chi Tiết Sản Phẩm</h1>
      <p><strong>Product ID:</strong> {productId}</p>
      
      {product ? (
        <div>
          <h2>{product.name}</h2>
          <p><strong>Giá:</strong> {product.price}</p>
          <p><strong>Mô tả:</strong> {product.description}</p>
        </div>
      ) : (
        <p style={{ color: 'red' }}>Không tìm thấy sản phẩm với ID: {productId}</p>
      )}

      <button 
        onClick={handleGoBack}
        style={{
          backgroundColor: '#007bff',
          color: 'white',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginTop: '20px'
        }}
      >
        Quay lại trang sản phẩm
      </button>
    </div>
  );
}

export default ProductDetail;