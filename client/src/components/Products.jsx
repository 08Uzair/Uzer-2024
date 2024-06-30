import React from "react";
import { NavLink } from "react-router-dom";

export function ProductCard() {
  const product = [
    {
      image:
        "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YWlycG9kc3xlbnwwfHwwfHx8MA%3D%3D",
      name: "Product Name",
      price: "$25.00",
      description: "This is a brief description of the product.",
      brands: ["Brand A", "Brand B", "Brand C"],
    },
  ];

  return (
    <>
      {product.map((item, index) => {
        return (
          <>
            <h1 className="text-3xl	font-bold  mb-12 mt-12 text-center w-full ">
              Products
            </h1>
            <NavLink to={'/singleProduct'}>
            <div className="max-w-sm rounded overflow-hidden shadow-lg p-4 bg-white m-12">
              <img
                className="w-full h-48 object-cover"
                src={item.image}
                alt={item.name}
              />
              <div className="py-4">
                <div className="font-bold text-xl mb-2">{item.name}</div>
                <p className="text-gray-700 text-base">{item.description}</p>
              </div>
              <div className="flex items-center justify-between py-4">
                <span className="text-2xl font-bold text-gray-900">
                  {item.price}
                </span>
                <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700">
                  Add to Cart
                </button>
              </div>
            </div>
            </NavLink>
          
          </>
        );
      })}
    </>
  );
}
