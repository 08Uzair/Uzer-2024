import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createProducts } from "../redux/actions/product";
import { getCategory } from "../redux/actions/category";
import { uploadImageToCloudinary } from "../utility/uploadToCloudinary";

const CreateCard = () => {
  const dispatch = useDispatch();
  const cat = useSelector((state) => state?.category);
  const navigate = useNavigate();

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
    category: "",
  });

  const [step, setStep] = useState(1);
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (file) => {
    try {
      setUploading(true);
      const data = await uploadImageToCloudinary(file);
      setFormData((prev) => ({
        ...prev,
        image: data,
      }));
    } catch (error) {
      console.error("Image upload failed", error);
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleImageUpload(file);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) handleImageUpload(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    try {
      if (!formData.image) {
        alert("Please upload an image before submitting.");
        return;
      }
      await dispatch(createProducts(formData));
      navigate("/");
    } catch (error) {
      console.error("There was an error creating the product!", error);
    }
  };

  return (
    <div className="w-full h-screen bg-[#dfdfdf] flex items-center justify-center">
      <div className="max-w-[50%] w-[90%] mx-auto p-6 bg-white shadow-xl border-2 border-gray-100 rounded-lg mt-24">
        
        {/* Back Button */}
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mb-4 px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
        >
          ← Back
        </button>

        <h2 className="text-2xl font-bold mb-6">Create New Product</h2>
        
        <form onSubmit={handleCreatePost} className="space-y-4">
          {step === 1 && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border-2 border-gray-400 rounded-md shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  name="description"
                  required
                  value={formData.description}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border-2 border-gray-400 rounded-md shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Stocks</label>
                <input
                  type="number"
                  name="stocks"
                  required
                  value={formData.stocks}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border-2 border-gray-400 rounded-md shadow-sm"
                />
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">Price</label>
                <input
                  type="number"
                  name="price"
                  required
                  value={formData.price}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border-2 border-gray-400 rounded-md shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Color</label>
                <input
                  type="text"
                  name="color"
                  value={formData.color}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border-2 border-gray-400 rounded-md shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Size</label>
                <input
                  type="text"
                  name="size"
                  value={formData.size}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border-2 border-gray-400 rounded-md shadow-sm"
                />
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">Discount</label>
                <input
                  type="number"
                  name="discount"
                  value={formData.discount}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border-2 border-gray-400 rounded-md shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Rank</label>
                <input
                  type="number"
                  name="rank"
                  required
                  value={formData.rank}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border-2 border-gray-400 rounded-md shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Product Image</label>
                <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  className="mt-1 flex items-center justify-center w-full h-40 border-2 border-dashed border-gray-400 rounded-md cursor-pointer hover:border-indigo-500 transition"
                  onClick={() => document.getElementById("fileInput").click()}
                >
                  {uploading ? (
                    <span className="text-gray-500">Uploading...</span>
                  ) : formData.image ? (
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="h-full object-contain"
                    />
                  ) : (
                    <span className="text-gray-500">
                      Drag & drop image or click to upload
                    </span>
                  )}
                  <input
                    id="fileInput"
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleFileSelect}
                  />
                </div>
              </div>
            </>
          )}

          {step === 4 && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <select
                name="category"
                required
                value={formData.category}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border-2 border-gray-400 rounded-md shadow-sm"
              >
                <option value="">Select a category</option>
                {cat?.map((item, index) => (
                  <option key={index} value={item?._id}>
                    {item?.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="flex justify-between mt-6">
            {step > 1 && (
              <button
                type="button"
                onClick={handlePrev}
                className="px-4 py-2 bg-gray-300 text-black rounded-md"
              >
                Previous
              </button>
            )}
            {step < 4 ? (
              <button
                type="button"
                onClick={handleNext}
                className="ml-auto px-4 py-2 bg-indigo-600 text-white rounded-md"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="ml-auto px-4 py-2 bg-green-600 text-white rounded-md"
              >
                Create Product
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCard;
