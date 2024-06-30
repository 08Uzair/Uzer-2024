import React, { useState, useEffect, useRef } from "react";

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
    <div className="flex flex-wrap justify-center py-8">
      {logos.map((item, index) => (
        <div key={index} className="m-4 ml-12 mr-12">
          <img
            src={item}
            className="h-24 w-auto grayscale hover:grayscale-0 transition-all cursor-pointer"
          />
        </div>
      ))}
    </div>
  );
};

export default Label;
