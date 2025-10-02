import React from "react";

export default function Hero() {
  return (
    <header id="home">
      <div
        className="position-relative w-100 rounded overflow-hidden"
        style={{
          height: "360px",
          backgroundImage:
            'url("https://fornopiombo.com/cdn/shop/articles/How-to-Make-Neapolitan-Pizza-At-Home.jpg?v=1654552141")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* overlay tối nhẹ để chữ nổi bật */}
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            backgroundColor: "rgba(0,0,0,0.4)",
          }}
        ></div>

        {/* Nội dung chữ căn giữa trong ảnh */}
        <div
          className="position-absolute top-50 start-50 translate-middle text-center text-white"
          style={{ zIndex: 2 }}
        >
          <h2 className="display-6 fw-semibold">Neapolitan Pizza</h2>
          <p className="text-white-50 mb-0">
            If you are looking for traditional Italian pizza, the Neapolitan is the best option!
          </p>
        </div>
      </div>
    </header>
  );
}
