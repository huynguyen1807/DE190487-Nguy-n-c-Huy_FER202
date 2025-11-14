import React from 'react';

function DashboardHome() {
  return (
    <div>
      <h2>Dashboard - Trang Chủ</h2>
      <p>Chào mừng bạn đến với trang quản trị!</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '20px' }}>
        <div style={{ 
          backgroundColor: '#e3f2fd', 
          padding: '20px', 
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <h3>Tổng Người Dùng</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#1976d2' }}>1,234</p>
        </div>
        
        <div style={{ 
          backgroundColor: '#e8f5e8', 
          padding: '20px', 
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <h3>Đơn Hàng</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#388e3c' }}>567</p>
        </div>
        
        <div style={{ 
          backgroundColor: '#fff3e0', 
          padding: '20px', 
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <h3>Doanh Thu</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#f57c00' }}>890M</p>
        </div>
      </div>
      
      <p style={{ marginTop: '20px' }}>
        Sử dụng menu bên trái để điều hướng đến các trang con khác.
      </p>
    </div>
  );
}

export default DashboardHome;