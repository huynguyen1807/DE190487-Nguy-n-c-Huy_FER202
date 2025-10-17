import React from "react";
import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import MenuSection from "./Components/MenuSection";
import BookingForm from "./Components/BookingForm";
import Footer from "./Components/Footer";
import { pizzas } from "./data/pizzas";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <MenuSection list={pizzas} />
      <BookingForm />
      <Footer />
    </>
  );
}

export default App;
