import React from "react";

export default function BookingForm() {
  return (
    <section className="py-5 bg-dark text-white">
      <div className="container">
        <h3 className="text-center mb-4">Book Your Table</h3>

        <form className="row g-3">
          <div className="col-md-4">
            <input className="form-control" placeholder="Your Name *" required />
          </div>
          <div className="col-md-4">
            <input type="email" className="form-control" placeholder="Your Email *" required />
          </div>
          <div className="col-md-4">
            <select className="form-select">
              <option>Select a Service</option>
              <option>Dine-in</option>
              <option>Take away</option>
              <option>Delivery</option>
            </select>
          </div>

          <div className="col-12">
            <textarea className="form-control" rows="5" placeholder="Please write your comment"></textarea>
          </div>

          <div className="col-12 justify-content-center d-flex">
            <button type="submit" className="btn btn-warning fw-semibold ">
              Send Message
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
