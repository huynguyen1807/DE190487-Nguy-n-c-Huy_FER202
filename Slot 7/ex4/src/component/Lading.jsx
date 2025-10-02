// src/FPTLanding.jsx
import React from 'react';

// Màu cam theo ảnh mẫu
const ORANGE = '#ee9330'; // bạn có thể chỉnh nếu muốn đậm/nhạt hơn

export default function Landing() {
  return (
    <div className="min-vh-100 d-flex flex-column">
      {/* Header cam + logo */}
      <header style={{ backgroundColor: ORANGE }}>
        <div className="container py-3">
          <div className="d-flex justify-content-center">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/6/68/Logo_FPT_Education.png"
              alt="FPT University"
              className="img-fluid bg-secondary-subtle"
              style={{ maxHeight: 120, objectFit: 'contain' }}
            />
            
          </div>
          {/* Nav (nằm trên nền cam) */}
        <nav className="border-top">
          <div className="container py-2">
            <ul className="nav justify-content-center">
              <li className="nav-item">
                <a className="nav-link text-white fw-semibold px-3" href="#home">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white fw-semibold px-3" href="#about">About</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white fw-semibold px-3" href="#contact">Contact</a>
              </li>
            </ul>
          </div>
        </nav>
        </div>

        
      </header>

      {/* Nội dung */}
      <main className="flex-grow-1 py-5">
        <section id="about" className="py-4 bg-white">
          <div className="container text-center">
            <h2 className="fw-bold mb-3">About</h2>
            <p className="text-muted mb-0">
              This is the about section of the website.
            </p>
          </div>
        </section>

        <section id="contact" className="py-4 bg-white">
          <div className="container text-center">
            <h2 className="fw-bold mb-3">Contact</h2>
            <p className="text-muted mb-0">
              For any inquiries, please contact us at <a href="mailto:example@example.com">example@example.com</a>.
            </p>
          </div>
        </section>
      </main>

      {/* Footer cam */}
      <footer style={{ backgroundColor: ORANGE }}>
        <div className="container py-3">
          <p className="mb-0 text-center text-white">
            © 2023 Website. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}