import React from "react";

// Array of brand logo URLs
const logos = [
  "https://s.yimg.com/fz/api/res/1.2/bJg5qnc0iygSvtVUq.7wGg--~C/YXBwaWQ9c3JjaGRkO2ZpPWZpdDtoPTI0MDtxPTgwO3c9MzMy/https://s.yimg.com/zb/imgv1/7474a016-1742-3543-b3b7-679f8bd7d852/t_500x300",
  "https://tse4.mm.bing.net/th?id=OIP.iEGhNT1ZnkCSoZ2DNzuKdAHaHa&pid=Api&P=0&h=220",
  "https://tse3.mm.bing.net/th?id=OIP.FOySANQ-aZSwKBMNvNqC8QHaHa&pid=Api&P=0&h=220",
  "https://tse3.mm.bing.net/th?id=OIP.RelrezgrPZgEfNMcphpVRgHaHa&pid=Api&P=0&h=220",
  "https://tse1.mm.bing.net/th?id=OIP.jOOi1xYNTdtjIi4WxV46JAHaG_&pid=Api&P=0&h=220",
  // Add more logos as needed
];

const Label = () => {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-gray-800">
          TOP TRUSTED BRANDS
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
          {logos.map((logo, index) => (
            <div
              key={index}
              className="p-4 bg-gray-50 rounded-xl shadow hover:shadow-md transition-all cursor-pointer"
            >
              <img
                src={logo}
                alt={`Brand ${index + 1}`}
                className="h-16 sm:h-20 w-auto grayscale hover:grayscale-0 transition duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Label;
