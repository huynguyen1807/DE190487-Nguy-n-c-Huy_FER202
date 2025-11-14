import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

function DashboardLayout() {
  return (
    <div style={{ display: 'flex', minHeight: '400px' }}>
      {/* Sidebar Navigation */}
      <nav style={{ 
        width: '200px', 
        backgroundColor: '#f8f9fa', 
        padding: '20px',
        borderRight: '1px solid #dee2e6'
      }}>
        <h3>Dashboard</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li style={{ marginBottom: '10px' }}>
            <NavLink 
              to="/dashboard"
              end
              className={({ isActive }) => 
                isActive ? 'dashboard-nav-active' : 'dashboard-nav'
              }
              style={{ textDecoration: 'none', padding: '8px 12px', display: 'block' }}
            >
              Trang Chủ Dashboard
            </NavLink>
          </li>
          <li style={{ marginBottom: '10px' }}>
            <NavLink 
              to="/dashboard/settings"
              className={({ isActive }) => 
                isActive ? 'dashboard-nav-active' : 'dashboard-nav'
              }
              style={{ textDecoration: 'none', padding: '8px 12px', display: 'block' }}
            >
              Cài Đặt
            </NavLink>
          </li>
          <li style={{ marginBottom: '10px' }}>
            <NavLink 
              to="/dashboard/reports"
              className={({ isActive }) => 
                isActive ? 'dashboard-nav-active' : 'dashboard-nav'
              }
              style={{ textDecoration: 'none', padding: '8px 12px', display: 'block' }}
            >
              Báo Cáo
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* Main Content Area */}
      <div style={{ flex: 1, padding: '20px' }}>
        <Outlet />
      </div>
    </div>
  );
}

export default DashboardLayout;