import React from "react";

export default function MenuCard({ item }) {
  const { title, price, oldPrice, img, tag } = item;
  return (
    <div className="card h-100 shadow-sm">
      <div className="position-relative">
        {tag && (
          <span className="badge bg-warning text-dark position-absolute top-0 start-0 m-2">
            {tag}
          </span>
        )}
        <img
          src={img}
          alt={title}
          className="card-img-top"
          style={{ height: 180, objectFit: "cover" }}
        />
      </div>
      <div className="card-body d-flex flex-column">
        <h6 className="fw-semibold">{title}</h6>
        <div className="mb-3">
          {oldPrice && (
            <span className="text-decoration-line-through me-2 text-muted">
              ${oldPrice.toFixed(2)}
            </span>
          )}
          <span className="fw-bold text-warning">${price.toFixed(2)}</span>
        </div>
        <button className="btn btn-dark mt-auto">Buy</button>
      </div>
    </div>
  );
}
