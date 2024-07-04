import React, { useEffect, useState } from "react";
import { getUsers, signUp, signin } from "../redux/actions/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const Auth = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);
  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const user = {
        email,
        password,
      };
      
      console.log(user);
      await dispatch(signin(user));
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 shadow-md w-full max-w-md">
        <div className="flex justify-center mb-8">
          <button
            onClick={() => setIsSignIn(true)}
            className={`px-4 py-2 text-lg font-semibold ${
              isSignIn ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
            }`}
          >
            Sign In
          </button>
        </div>
        <SignInForm
          handleSignIn={handleSignIn}
          setEmail={setEmail}
          setPassword={setPassword}
        />
      </div>
    </div>
  );
};

const SignInForm = ({ handleSignIn, setEmail, setPassword }) => (
  <form onSubmit={handleSignIn}>
    <div className="mb-4">
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor="email"
      >
        Email
      </label>
      <input
        className="shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="email"
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
    </div>
    <div className="mb-4">
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor="password"
      >
        Password
      </label>
      <input
        className="shadow appearance-none border w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
        id="password"
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>
    <div className="flex items-center justify-between">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline"
        type="submit"
      >
        Sign In
      </button>
      <a
        className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
        href="#"
      >
        Forgot Password?
      </a>
    </div>
  </form>
);

export default Auth;
