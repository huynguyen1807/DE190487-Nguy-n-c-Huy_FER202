import React from "react"
export default function Footer() {
  return (
<footer className="" style={{ backgroundColor: "orange" }}>
  <div className="container py-4 text-dark">
    <div className="row align-items-center">
      {/* Cột địa chỉ bên trái */}
      <div className="col-md-6 mb-3 mb-md-0">
        <h6 className="fw-bold mb-2">Our Address</h6>
        <p className="mb-1">Khu đô thị FPT Đà Nẵng</p>
        <p className="mb-1">
          <i className="bi bi-telephone-fill me-2"></i> +84 231 1111111
        </p>
        <p className="mb-1">
          <i className="bi bi-printer-fill me-2"></i> +852 8765 4321
        </p>
        <p className="mb-0">
          <i className="bi bi-envelope-fill me-2"></i>
          <a href="mailto:fptudn@fpt.edu.vn" className="text-primary text-decoration-none">
            fptudn@fpt.edu.vn
          </a>
        </p>
      </div>

      {/* Cột mạng xã hội bên phải */}
      <div className="col-md-6 text-md-end text-center">
        <div className="mb-2">
          <a href="#" className="text-dark fs-5 me-3">
            <i className="bi bi-google"></i>
          </a>
          <a href="#" className="text-dark fs-5 me-3">
            <i className="bi bi-facebook"></i>
          </a>
          <a href="#" className="text-dark fs-5 me-3">
            <i className="bi bi-linkedin"></i>
          </a>
          <a href="#" className="text-dark fs-5 me-3">
            <i className="bi bi-twitter"></i>
          </a>
          <a href="#" className="text-dark fs-5">
            <i className="bi bi-envelope"></i>
          </a>
        </div>
        
      </div>
    </div>
  </div>
  <p className="mb-0 d-flex justify-content-center">© Copyright 2023</p>
</footer>
    );
}