import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUsers, signUp, signin } from "../redux/actions/auth";
import { uploadImageToCloudinary } from "../utility/uploadToCloudinary";
import { toast } from "react-toastify";

const btnStages = [
  "Logging in...",
  "Just 5 sec",
  "You're almost there",
  "Almost done...",
  "Verifying credentials...",
  "Setting things up...",
  "Securing your account...",
  "Just a moment more...",
  "Getting things ready...",
];

const Auth = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [loadingTextIndex, setLoadingTextIndex] = useState(0);
  const [textCycleInterval, setTextCycleInterval] = useState(null);
  const [formData, setFormData] = useState({
    avatar: "",
    fname: "",
    lname: "",
    country: "",
    state: "",
    city: "",
    pinCode: "",
    email: "",
    password: "",
    number: "",
    address1: "",
    address2: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const handleImageUpload = async (file) => {
    try {
      setUploading(true);
      const imageUrl = await uploadImageToCloudinary(file);
      setFormData((prev) => ({ ...prev, avatar: imageUrl }));
    } catch (err) {
      console.error("Image upload failed", err);
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

  const handleDragOver = (e) => e.preventDefault();

  const handleChange = (field) => (e) =>
    setFormData({ ...formData, [field]: e.target.value });

  const startTextCycle = () => {
    setLoadingTextIndex(0);
    const interval = setInterval(() => {
      setLoadingTextIndex((prev) =>
        prev + 1 < btnStages.length ? prev + 1 : 0
      );
    }, 2000);
    setTextCycleInterval(interval);
  };

  const stopTextCycle = () => {
    clearInterval(textCycleInterval);
    setTextCycleInterval(null);
  };

  const handleSignUp = async () => {
    const requiredFields = [
      { key: "avatar", label: "Avatar" },
      { key: "fname", label: "First Name" },
      { key: "lname", label: "Last Name" },
      { key: "country", label: "Country" },
      { key: "state", label: "State" },
      { key: "city", label: "City" },
      { key: "pinCode", label: "Pin Code" },
      { key: "email", label: "Email" },
      { key: "password", label: "Password" },
      { key: "number", label: "Mobile Number" },
      { key: "address1", label: "Address 1" },
    ];

    const emptyField = requiredFields.find(
      (field) => !formData[field.key]?.toString().trim()
    );

    if (emptyField) {
      toast.error(`${emptyField.label} is required`);
      return;
    }

    setLoading(true);
    startTextCycle();
    try {
      await dispatch(signUp(formData));
      window.location.reload();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      stopTextCycle();
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    startTextCycle();
    try {
      await dispatch(
        signin({ email: formData.email, password: formData.password })
      );
      navigate("/");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      stopTextCycle();
    }
  };

  return (
    <div className="w-full h-screen flex flex-col md:flex-row">
      <div className="hidden md:flex md:w-1/2 bg-[#2563eb] flex-col justify-center items-center text-white px-8">
        <h1 className="text-3xl lg:text-5xl font-bold mb-4">
          YOUR GATEWAY TO HASSEL-FREE SHOPPING
        </h1>
        <p className="max-w-md mb-8 text-base lg:text-lg font-bold p-4 border-2 border-white bg-[#0000007d] rounded-[50px]">
          LOGIN OR REGISTER — YOUR CART AWAITS
        </p>
        <img
          src="https://res.cloudinary.com/dyphiefiy/image/upload/v1750936090/man-shopping-online-using-e-commerce-app-3d-illustration-download-in-png-blend-fbx-gltf-file-formats--application-pack-illustrations-5791999_zmdkv8.png"
          alt="icon"
          className="w-2/3 max-w-xs lg:max-w-md object-contain mt-6"
        />
      </div>

      <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-6 sm:px-10">
        <div className="w-full max-w-md">
          <div className="flex justify-center mb-6 space-x-2">
            <button
              onClick={() => setIsSignIn(true)}
              className={`w-1/2 py-3 text-lg rounded-l-3xl font-semibold ${
                isSignIn
                  ? "bg-[#2563eb] text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsSignIn(false)}
              className={`w-1/2 py-3 text-lg rounded-r-3xl font-semibold ${
                !isSignIn
                  ? "bg-[#2563eb] text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              Sign Up
            </button>
          </div>

          {isSignIn ? (
            <SignInForm
              handleSignIn={handleSignIn}
              handleChange={handleChange}
              loading={loading}
              loadingText={btnStages[loadingTextIndex]}
            />
          ) : (
            <SignUpForm
              formData={formData}
              handleChange={handleChange}
              handleSignUp={handleSignUp}
              handleDrop={handleDrop}
              handleDragOver={handleDragOver}
              handleFileSelect={handleFileSelect}
              uploading={uploading}
              loading={loading}
              loadingText={btnStages[loadingTextIndex]}
            />
          )}
        </div>
      </div>
    </div>
  );
};

const Input = ({ type = "text", placeholder, value, onChange }) => (
  <input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className="w-full p-3 rounded-xl border border-gray-300 bg-gray-100 placeholder-gray-700 text-gray-900 shadow-inner focus:ring-2 focus:ring-indigo-300 focus:outline-none transition mb-3"
  />
);

const SignInForm = ({ handleSignIn, handleChange, loading, loadingText }) => (
  <form onSubmit={handleSignIn} className="space-y-5">
    <Input type="email" placeholder="Email" onChange={handleChange("email")} />
    <Input
      type="password"
      placeholder="Password"
      onChange={handleChange("password")}
    />
    <button
      type="submit"
      disabled={loading}
      className="w-full bg-[#2563eb] hover:bg-indigo-600 text-white py-3 rounded-xl font-semibold shadow-md transition"
    >
      {loading ? loadingText : "Sign In"}
    </button>
  </form>
);

const SignUpForm = ({
  formData,
  handleChange,
  handleSignUp,
  handleDrop,
  handleDragOver,
  handleFileSelect,
  uploading,
  loading,
  loadingText,
}) => {
  const [step, setStep] = useState(1);
  const fileInputRef = useRef(null);

  const handleDivClick = () => fileInputRef.current?.click();

  const handleNext = () => setStep(step + 1);

  const renderStepFields = () => {
    switch (step) {
      case 1:
        return (
          <>
            <div
              className="w-full h-32 border-2 border-dashed flex items-center justify-center mb-4 rounded-xl cursor-pointer hover:bg-gray-100"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onClick={handleDivClick}
            >
              {uploading ? (
                <p>Uploading...</p>
              ) : formData.avatar ? (
                <img
                  src={formData.avatar}
                  alt="Avatar"
                  className="h-24 object-contain"
                />
              ) : (
                <p>Drag & Drop Image or Click to Upload</p>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
                ref={fileInputRef}
              />
            </div>
            <Input
              placeholder="First Name"
              value={formData.fname}
              onChange={handleChange("fname")}
            />
            <Input
              placeholder="Last Name"
              value={formData.lname}
              onChange={handleChange("lname")}
            />
          </>
        );
      case 2:
        return (
          <>
            <Input
              placeholder="Country"
              value={formData.country}
              onChange={handleChange("country")}
            />
            <Input
              placeholder="State"
              value={formData.state}
              onChange={handleChange("state")}
            />
            <Input
              placeholder="City"
              value={formData.city}
              onChange={handleChange("city")}
            />
          </>
        );
      case 3:
        return (
          <>
            <Input
              placeholder="Pin Code"
              value={formData.pinCode}
              onChange={handleChange("pinCode")}
            />
            <Input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange("email")}
            />
            <Input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange("password")}
            />
          </>
        );
      case 4:
        return (
          <>
            <Input
              type="number"
              placeholder="Mobile Number"
              value={formData.number}
              onChange={handleChange("number")}
            />
            <Input
              placeholder="Address 1"
              value={formData.address1}
              onChange={handleChange("address1")}
            />
            <Input
              placeholder="Address 2"
              value={formData.address2}
              onChange={handleChange("address2")}
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-5">
      {renderStepFields()}
      <div className="flex justify-between mt-4">
        {step > 1 && (
          <button
            type="button"
            disabled={loading}
            onClick={() => setStep(step - 1)}
            className="px-5 py-2 bg-gray-200 text-gray-800 rounded-xl hover:bg-gray-300"
          >
            Previous
          </button>
        )}
        {step < 4 ? (
          <button
            type="button"
            disabled={loading}
            onClick={handleNext}
            className="ml-auto px-5 py-2 bg-[#2563eb] text-white rounded-xl hover:bg-indigo-600"
          >
            Next
          </button>
        ) : (
          <button
            type="button"
            disabled={loading}
            onClick={handleSignUp}
            className="ml-auto px-5 py-2 bg-[#2563eb] text-white rounded-xl hover:bg-indigo-600"
          >
            {loading ? loadingText : "Sign Up"}
          </button>
        )}
      </div>
    </div>
  );
};

export default Auth;
