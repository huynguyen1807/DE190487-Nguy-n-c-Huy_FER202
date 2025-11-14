import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div style={{ 
      textAlign: 'center', 
      padding: '2rem',
      minHeight: '400px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <h1 style={{ fontSize: '6rem', color: '#dc3545', margin: '0' }}>404</h1>
      <h2 style={{ color: '#6c757d', marginBottom: '1rem' }}>Trang Không Tìm Thấy</h2>
      <p style={{ color: '#6c757d', marginBottom: '2rem', maxWidth: '500px' }}>
        Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển. 
        Vui lòng kiểm tra lại URL hoặc quay về trang chủ.
      </p>
      
      <Link 
        to="/" 
        style={{
          backgroundColor: '#007bff',
          color: 'white',
          padding: '12px 24px',
          borderRadius: '6px',
          textDecoration: 'none',
          fontSize: '16px',
          fontWeight: '500',
          transition: 'background-color 0.3s ease'
        }}
        onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
        onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
      >
        Quay Về Trang Chủ
      </Link>
    </div>
  );
}

export default NotFound;