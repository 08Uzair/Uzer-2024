import React from "react";
import { useNavigate } from "react-router-dom";

export function Gallery() {
  const data = [
    {
      imageLink:
        "https://res.cloudinary.com/dyphiefiy/image/upload/v1749191526/d206a3878426867065cc3bb64bf41e6eb9892d9e_avwqxl.webp",
      text: "T-Shirts",
      path: "/allProducts?category=T-Shirts",
      delay: 1,
    },
    {
      imageLink:
        "https://res.cloudinary.com/dyphiefiy/image/upload/v1749191641/pexels-photo-297933_tbtrxp.jpg",
      text: "Shirts",
      path: "/allProducts?category=Shirts",
      delay: 3,
    },
    {
      imageLink:
        "https://res.cloudinary.com/dyphiefiy/image/upload/v1749191677/pexels-photo-1598507_nih1k7.jpg",
      text: "Jeans",
      path: "/allProducts?category=Jeans",
      delay: 5,
    },
    {
      imageLink:
        "https://res.cloudinary.com/dyphiefiy/image/upload/v1749191710/istockphoto-1340904443-612x612_ndkv57.jpg",
      text: "Hoodies",
      path: "/allProducts?category=Hoodies",
      delay: 7,
    },
    {
      imageLink:
        "https://res.cloudinary.com/dyphiefiy/image/upload/v1749191739/pexels-photo-12246169_xe4eob.webp",
      text: "Polo Shirts",
      path: "/allProducts?category=Polo",
      delay: 11,
    },
    {
      imageLink:
        "https://res.cloudinary.com/dyphiefiy/image/upload/v1749191769/pexels-photo-298863_no0qj3.jpg",
      text: "Formal Dress",
      path: "/allProducts?category=Formal Dress",
      delay: 13,
    },
  ];

  const navigate = useNavigate();

  function handleClick(path) {
    navigate(path);
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-12 px-4 md:px-8">
      {data.map(({ imageLink, text, path, delay }, index) => (
        <div
          key={index}
          onClick={() => handleClick(path)}
          style={{ "--animation-delay": `${delay}s` }}
          className="relative cursor-pointer overflow-hidden rounded-3xl shadow-xl group transform transition-transform hover:scale-105 backdrop-blur-lg bg-white/60 border border-gray-200 hover:border-blue-300"
        >
          <img
            src={imageLink}
            alt={text}
            className="h-56 sm:h-64 md:h-72 w-full object-cover rounded-3xl transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-tr from-black/50 to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl">
            <span className="text-white text-xl font-bold drop-shadow-lg">
              {text}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Gallery;
