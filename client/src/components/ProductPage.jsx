import React from 'react';

const ProductPage = () => {
  const product = {
    title: 'Product Name',
    description: 'This is a great product that you will love!',
    price: '$99.99',
    image: 'https://via.placeholder.com/600x400',
    sizes: ['S', 'M', 'L', 'XL'],
  };

  const recommendedProducts = [
    {
      id: 1,
      title: 'Recommended Product 1',
      price: '$49.99',
      image: 'https://via.placeholder.com/150x100',
    },
    {
      id: 2,
      title: 'Recommended Product 2',
      price: '$59.99',
      image: 'https://via.placeholder.com/150x100',
    },
    {
      id: 3,
      title: 'Recommended Product 3',
      price: '$69.99',
      image: 'https://via.placeholder.com/150x100',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex justify-center">
          <img
            src={product.image}
            alt={product.title}
            className="rounded-lg shadow-lg"
          />
        </div>
        <div>
          <h1 className="text-4xl font-bold mb-4">{product.title}</h1>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <div className="text-2xl font-bold mb-4">{product.price}</div>
          <div className="mb-4">
            <span className="block font-semibold mb-2">Size:</span>
            <div className="flex gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100 transition"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition">
            Add to Cart
          </button>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">You May Also Like</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recommendedProducts.map((product) => (
            <div key={product.id} className="border border-gray-200 p-4 rounded-lg shadow-sm">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-40 object-cover mb-4 rounded-lg"
              />
              <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
              <div className="text-gray-700">{product.price}</div>
              <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
