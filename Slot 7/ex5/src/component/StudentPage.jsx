import React from "react";
import img from "../img/image.png";
import img1 from "../img/student2.png";
import img2 from "../img/student3.png";
import img3 from "../img/student4.png";


const orange = "#F38F31"; // màu nền cam
const orangelight = "#EACDAD"; // màu nền cam nhạt
export default function StudentsPage() {
  const students = [
    {
      id: "DE161082",
      name: "Nguyễn Hữu Quốc Khánh",
      campus: "Đà Nẵng",
      img: img,
    },
    {
      id: "DE160377",
      name: "Choy Vinh Thức",
      campus: "Quảng Nam",
      img: img1,
    },
    {
      id: "DE160547",
      name: "Đỗ Nguyên Phúc",
      campus: "Quảng Nam",
      img: img2,
    },
    {
      id: "DE170049",
      name: "Lê Hoàng Minh",
      campus: "Đà Nẵng",
      img: img3,
    },
  ];

  return (
    <div className="min-vh-100 d-flex flex-column bg-light">
      {/* Header */}
      <header style={{ backgroundColor: orangelight }}>
  <div className="container py-2 d-flex justify-content-between align-items-center flex-wrap">
    
    {/* Nhóm bên trái */}
    <div className="d-flex align-items-center">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/6/68/Logo_FPT_Education.png"
        alt="FPT Logo"
        height={50}
        className="me-2"
      />
      <div className="linkherh">
        <a href="#" className="text-orange fw-semibold me-3 text-decoration-none">
          Trang chủ
        </a>
        <a href="#" className="text-orange fw-semibold me-3 text-decoration-none">
          Giảng viên
        </a>
        <a href="#" className="text-orange fw-semibold me-3 text-decoration-none">
          Tuyển sinh
        </a>
        <a href="#" className="text-orange fw-semibold text-decoration-none">
          Sinh viên
        </a>
      </div>
    </div>

    {/* Nhóm bên phải */}
    <div className="d-flex align-items-center mt-2 mt-md-0">
  <label htmlFor="searchBox" className="me-2 mb-0 fw-semibold">
    Search
  </label>
  <input
    id="searchBox"
    type="text"
    placeholder="Search..."
    className="form-control form-control-sm"
    style={{ width: "200px" }}
  />
</div>

  </div>
</header>

      {/* Banner */}
      <div style={{ backgroundColor: orange }}>
  <div className="container text-center py-4">
    <img
      src="https://vinkai.com/uploads/dich-vu/2021_06/screen-shot-2021-05-24-at-12.36.27-pm-910x603_1.png"
      alt="FPT Students"
      className="img-fluid rounded shadow w-100 h-auto"
      style={{ maxHeight: "400px", objectFit: "cover" }}
    />
  </div>
</div>

      {/* Breadcrumb */}
      <div className="container py-3">
        <small className="text-muted">
          <a href="#" className="text-decoration-none text-orange">Home</a> / Students
        </small>
      </div>
      {/*Student Details*/}
      <main className="container flex-grow-1">
  <h2 className="text-center fw-bold mb-4">Students Detail</h2>
  <div className="row g-4">
    {students.map((st, i) => (
      <div className="col-12 col-sm-6 col-md-6" key={i}>
        <div className="card h-100 text-center shadow-sm">
          <img
  src={st.img}
  alt={st.name}
  className="w-100"
  style={{
    aspectRatio: "16/9",
    objectFit: "cover",
    borderTopLeftRadius: "8px",
    borderTopRightRadius: "8px"
  }}
/>
          <div className="card-body">
            <h6 className="fw-bold">{st.name}</h6>
            <p className="text-muted mb-1">{st.id}</p>
            <p className="text-muted mb-2">{st.campus}</p>

            <div className="d-flex justify-content-center gap-2 mb-2">
              <div>
                <input type="radio" name={`status-${st.id}`} id={`abs-${st.id}`} />
                <label htmlFor={`abs-${st.id}`} className="ms-1">
                  Absent
                </label>
              </div>
              <div>
                <input type="radio" name={`status-${st.id}`} id={`pre-${st.id}`} />
                <label htmlFor={`pre-${st.id}`} className="ms-1">
                  Present
                </label>
              </div>
            </div>

            <button className="btn btn-warning btn-sm fw-semibold text-white">
              Submit
            </button>
          </div>
        </div>
      </div>
    ))}
  </div>
</main>



      {/* Footer */}
      <footer className="mt-5" style={{ backgroundColor: orange }}>
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

    </div>
  );
}
