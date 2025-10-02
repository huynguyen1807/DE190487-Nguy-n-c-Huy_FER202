import React from "react";
import MenuCard from "./MenuCard";

export default function MenuSection({ list }) {
  return (
    <section className="py-5" style={{ background: "#2f2f2f" }}>
      <div className="container">
        <h3 className="text-white mb-4">Our Menu</h3>
        <div className="row g-4">
          {list.map(item => (
            <div className="col-12 col-sm-6 col-lg-3" key={item.id}>
              <MenuCard item={item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
