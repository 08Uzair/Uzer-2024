import React from "react";
import { Gallery } from "../components/Gallery";
import { ProductCard } from "../components/Products";
import Top from "../components/Top";
import { Footer } from "../components/Footer";
import Label from "../components/Scroll";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <div>
    <Navbar/>
      <Gallery />
      <ProductCard />
      <Top />
      <ProductCard />
      <Label />
      <Footer/>
    </div>
  );
};

export default Home;
