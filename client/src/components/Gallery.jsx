import React from "react";

export function Gallery() {
  const data = [
    {
      imageLink:
        "https://tse3.mm.bing.net/th?id=OIP.cbEojlSVctFQ0MVg8DwZvwAAAA&pid=Api&P=0&h=220",
      text: "T-Shirts",
    },
    {
      imageLink:
        "https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg?auto=compress&cs=tinysrgb&w=600",
      text: "Shirts",
    },
    {
      imageLink:
        "https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=600",
      text: "Jeans",
    },
    {
      imageLink:
        "https://media.istockphoto.com/id/1340904443/photo/oversized-hooded-sweatshirt-mockup-for-print.jpg?b=1&s=612x612&w=0&k=20&c=wORyP3A4AaDmYjhCeNKF8I9GX1VXkMepVe4UA54klZw=",
      text: "Hoodies",
    },
    {
      imageLink:
        "https://images.pexels.com/photos/12246169/pexels-photo-12246169.jpeg?auto=compress&cs=tinysrgb&w=600",
      text: "Polo Shirts",
    },
    {
      imageLink:
        "https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?auto=compress&cs=tinysrgb&w=600",
      text: "Formal Dress",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 mt-12 ">
      {data.map(({ imageLink, text }, index) => (
        <div key={index} className="relative group cursor-pointer">
          <img
            className="h-64 w-full max-w-full rounded-lg object-cover object-center"
            src={imageLink}
            alt="gallery-photo"
          />
          <div className="absolute inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg backdrop-filter backdrop-blur">
            <span className="text-white font-bold">{text}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
