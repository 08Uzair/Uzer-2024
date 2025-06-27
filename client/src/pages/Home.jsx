import React, { lazy, Suspense } from "react";
const ProductCard1 = lazy(() => import("../components/Products1.jsx"));
const ProductCard2 = lazy(() => import("../components/Product2.jsx"));
const Gallery = lazy(() => import("../components/Gallery.jsx"));
const Top = lazy(() => import("../components/Top.jsx"));
const Label = lazy(() => import("../components/Scroll.jsx"));
import Loader from "../utility/Loader";
import Navbar from "../components/Navbar.jsx";
import { Footer } from "../components/Footer.jsx";
const Home = () => {
  return (
    <>
      <Navbar />
      <div className="m-8">
        <Suspense fallback={<Loader />}>
          <Gallery />
          <ProductCard2 />
          <Top />
          <ProductCard1 />
          <Label />
        </Suspense>
        <Footer />
      </div>
    </>
  );
};

export default Home;
