import React from "react";
import { Gallery } from "../components/Gallery";
import Top from "../components/Top";
import { Footer } from "../components/Footer";
import Label from "../components/Scroll";
import Navbar from "../components/Navbar";
import { ProductCard1 } from "../components/Products1";
import { ProductCard2 } from "../components/Product2";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="m-8">
        <Gallery />
        <ProductCard2 />
        <Top />
        <ProductCard1 />
        <Label />
        <Footer />
      </div>
    </>
  );
};

export default Home;
