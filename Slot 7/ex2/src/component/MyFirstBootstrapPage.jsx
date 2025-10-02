import React from "react";

export default function MyFirstBootstrapPage() {
  return (
    <div className="bg-light py-5 text-center">
      <h2 className="fw-bold mb-5">My First Bootstrap Page</h2>

      <div className="container">
        <div className="row justify-content-center">
          {/* HTML5 Logo */}
          <div className="col-4 col-md-2">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/6/61/HTML5_logo_and_wordmark.svg"
              alt="HTML5"
              className="img-fluid"
            />
          </div>

          {/* CSS3 Logo */}
          <div className="col-4 col-md-2">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/d/d5/CSS3_logo_and_wordmark.svg"
              alt="CSS3"
              className="img-fluid"
            />
          </div>

          {/* Bootstrap Logo */}
          <div className="col-4 col-md-2">
            <img
              src="https://getbootstrap.com/docs/5.0/assets/brand/bootstrap-logo-shadow.png"
              alt="Bootstrap"
              className="img-fluid"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
