import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createProducts } from "../redux/actions/product";
import { getCategory } from "../redux/actions/category";

const CreateCard = () => {
  const dispatch = useDispatch();
  const cat = useSelector((state) => state?.category);
  console.log(cat);
  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    stocks: "",
    price: "",
    color: "",
    size: "",
    discount: "",
    rank: "",
    image: "",
    category: "", // Add category to the formData
  });

  const [page, setPage] = useState(0);

  const formFields = [
    { name: "name", type: "text", label: "Name", required: true },
    {
      name: "description",
      type: "textarea",
      label: "Description",
      required: true,
    },
    { name: "stocks", type: "number", label: "Stocks", required: true },
    { name: "price", type: "number", label: "Price", required: true },
    { name: "color", type: "text", label: "Color" },
    { name: "size", type: "text", label: "Size" },
    { name: "discount", type: "number", label: "Discount" },
    { name: "rank", type: "number", label: "Rank", required: true },
    { name: "image", type: "text", label: "Image URL", required: true },
    { name: "category", type: "dropdown", label: "Category", required: true },
  ];

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    try {
      await dispatch(createProducts(formData));
      navigate("/");
    } catch (error) {
      console.error("There was an error creating the product!", error);
    }
  };

  const nextPage = () => {
    if (page < Math.ceil(formFields.length / 4) - 1) {
      setPage(page + 1);
    }
  };

  const prevPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  const renderFields = () => {
    const startIndex = page * 4;
    const endIndex = startIndex + 4;
    return formFields.slice(startIndex, endIndex).map((field) => (
      <div key={field.name}>
        <label
          htmlFor={field.name}
          className="block text-sm font-medium text-gray-700"
        >
          {field.label}
        </label>
        {field.type === "textarea" ? (
          <textarea
            id={field.name}
            name={field.name}
            value={formData[field.name]}
            onChange={handleChange}
            required={field.required}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          ></textarea>
        ) : field.type === "dropdown" ? (
          <select
            id={field.name}
            name={field.name}
            value={formData[field.name]}
            onChange={handleChange}
            required={field.required}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Select a category</option>
            {cat?.map((item, index) => (
              <option key={index} value={item?._id}>
                {item?.name}
              </option>
            ))}
          </select>
        ) : (
          <input
            type={field.type}
            id={field.name}
            name={field.name}
            value={formData[field.name]}
            onChange={handleChange}
            required={field.required}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        )}
      </div>
    ));
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-24">
      <h2 className="text-2xl font-bold mb-6">Create New Product</h2>
      <form onSubmit={handleCreatePost} className="space-y-4">
        {renderFields()}
        <div className="flex justify-between">
          <button
            type="button"
            onClick={prevPage}
            disabled={page === 0}
            className="px-4 py-2 bg-gray-300 text-gray-700 font-medium text-sm leading-5 rounded-md shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50"
          >
            Previous
          </button>
          <button
            type="button"
            onClick={nextPage}
            disabled={page >= Math.ceil(formFields.length / 4) - 1}
            className="px-4 py-2 bg-gray-300 text-gray-700 font-medium text-sm leading-5 rounded-md shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50"
          >
            Next
          </button>
        </div>
        {page === Math.ceil(formFields.length / 4) - 1 && (
          <button
            type="submit"
            className="w-full px-4 py-2 bg-indigo-600 text-white font-medium text-sm leading-5 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Create Product
          </button>
        )}
      </form>
    </div>
  );
};

export default CreateCard;
