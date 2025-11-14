import React, { useState } from 'react';

function Reports() {
  const [selectedReport, setSelectedReport] = useState('sales');

  const reportData = {
    sales: {
      title: 'Báo Cáo Bán Hàng',
      data: [
        { month: 'Tháng 1', revenue: '150M', orders: 45 },
        { month: 'Tháng 2', revenue: '180M', orders: 52 },
        { month: 'Tháng 3', revenue: '220M', orders: 68 },
        { month: 'Tháng 4', revenue: '195M', orders: 59 }
      ]
    },
    users: {
      title: 'Báo Cáo Người Dùng',
      data: [
        { month: 'Tháng 1', newUsers: 120, activeUsers: 890 },
        { month: 'Tháng 2', newUsers: 145, activeUsers: 920 },
        { month: 'Tháng 3', newUsers: 178, activeUsers: 1050 },
        { month: 'Tháng 4', newUsers: 156, activeUsers: 1120 }
      ]
    },
    products: {
      title: 'Báo Cáo Sản Phẩm',
      data: [
        { product: 'Laptop Dell XPS 13', sold: 25, revenue: '625M' },
        { product: 'iPhone 15 Pro', sold: 18, revenue: '504M' },
        { product: 'Samsung Galaxy S24', sold: 22, revenue: '484M' }
      ]
    }
  };

  const currentReport = reportData[selectedReport];

  return (
    <div>
      <h2>Báo Cáo & Thống Kê</h2>
      <p>Xem các báo cáo chi tiết về hoạt động của hệ thống:</p>
      
      <div style={{ marginBottom: '20px' }}>
        <label style={{ marginRight: '10px' }}>Chọn loại báo cáo:</label>
        <select 
          value={selectedReport}
          onChange={(e) => setSelectedReport(e.target.value)}
          style={{ padding: '5px 10px', borderRadius: '3px', border: '1px solid #ccc' }}
        >
          <option value="sales">Bán Hàng</option>
          <option value="users">Người Dùng</option>
          <option value="products">Sản Phẩm</option>
        </select>
      </div>
      
      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h3>{currentReport.title}</h3>
        
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '15px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8f9fa' }}>
              {Object.keys(currentReport.data[0]).map(key => (
                <th key={key} style={{ 
                  padding: '12px', 
                  textAlign: 'left', 
                  borderBottom: '2px solid #dee2e6',
                  textTransform: 'capitalize'
                }}>
                  {key === 'month' ? 'Thời Gian' : 
                   key === 'revenue' ? 'Doanh Thu' :
                   key === 'orders' ? 'Đơn Hàng' :
                   key === 'newUsers' ? 'Người Dùng Mới' :
                   key === 'activeUsers' ? 'Người Dùng Hoạt Động' :
                   key === 'product' ? 'Sản Phẩm' :
                   key === 'sold' ? 'Đã Bán' : key}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentReport.data.map((row, index) => (
              <tr key={index} style={{ borderBottom: '1px solid #dee2e6' }}>
                {Object.values(row).map((value, cellIndex) => (
                  <td key={cellIndex} style={{ padding: '12px' }}>
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#d4edda', borderRadius: '5px', border: '1px solid #c3e6cb' }}>
        <strong>💡 Ghi chú:</strong> Đây là dữ liệu demo để minh họa tính năng báo cáo trong ứng dụng.
      </div>
    </div>
  );
}

export default Reports;