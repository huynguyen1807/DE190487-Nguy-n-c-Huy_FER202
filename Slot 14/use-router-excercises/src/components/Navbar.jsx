import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={{ 
      backgroundColor: '#343a40', 
      padding: '1rem 2rem',
      marginBottom: '2rem'
    }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <h2 style={{ color: 'white', margin: 0 }}>React Router Demo</h2>
        
        <ul style={{ 
          display: 'flex', 
          listStyle: 'none', 
          margin: 0, 
          padding: 0,
          gap: '2rem'
        }}>
          <li>
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                isActive ? 'nav-link active' : 'nav-link'
              }
              style={({ isActive }) => ({
                color: isActive ? '#ffc107' : '#ffffff',
                textDecoration: 'none',
                fontWeight: isActive ? 'bold' : 'normal',
                padding: '0.5rem 1rem',
                borderRadius: '4px',
                backgroundColor: isActive ? 'rgba(255, 193, 7, 0.1)' : 'transparent',
                transition: 'all 0.3s ease'
              })}
            >
              Trang Chủ
            </NavLink>
          </li>
          
          <li>
            <NavLink 
              to="/san-pham"
              className={({ isActive }) => 
                isActive ? 'nav-link active' : 'nav-link'
              }
              style={({ isActive }) => ({
                color: isActive ? '#ffc107' : '#ffffff',
                textDecoration: 'none',
                fontWeight: isActive ? 'bold' : 'normal',
                padding: '0.5rem 1rem',
                borderRadius: '4px',
                backgroundColor: isActive ? 'rgba(255, 193, 7, 0.1)' : 'transparent',
                transition: 'all 0.3s ease'
              })}
            >
              Sản Phẩm
            </NavLink>
          </li>
          
          <li>
            <NavLink 
              to="/lien-he"
              className={({ isActive }) => 
                isActive ? 'nav-link active' : 'nav-link'
              }
              style={({ isActive }) => ({
                color: isActive ? '#ffc107' : '#ffffff',
                textDecoration: 'none',
                fontWeight: isActive ? 'bold' : 'normal',
                padding: '0.5rem 1rem',
                borderRadius: '4px',
                backgroundColor: isActive ? 'rgba(255, 193, 7, 0.1)' : 'transparent',
                transition: 'all 0.3s ease'
              })}
            >
              Liên Hệ
            </NavLink>
          </li>
          
          <li>
            <NavLink 
              to="/dashboard"
              className={({ isActive }) => 
                isActive ? 'nav-link active' : 'nav-link'
              }
              style={({ isActive }) => ({
                color: isActive ? '#ffc107' : '#ffffff',
                textDecoration: 'none',
                fontWeight: isActive ? 'bold' : 'normal',
                padding: '0.5rem 1rem',
                borderRadius: '4px',
                backgroundColor: isActive ? 'rgba(255, 193, 7, 0.1)' : 'transparent',
                transition: 'all 0.3s ease'
              })}
            >
              Dashboard
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;