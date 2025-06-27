import React, { useEffect, useState } from "react";
import { getUsers, signIn } from "../redux/actions/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = { email, password };
      await dispatch(signIn(user));
      navigate("/");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600">
      <div className="bg-white p-10 rounded-lg shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Admin Panel Login
        </h1>

        <SignInForm
          handleSignIn={handleSignIn}
          setEmail={setEmail}
          setPassword={setPassword}
          loading={loading}
        />
      </div>
    </div>
  );
};

const SignInForm = ({ handleSignIn, setEmail, setPassword, loading }) => {
  const [btnTextIndex, setBtnTextIndex] = useState(0);

  useEffect(() => {
    let interval;
    if (loading) {
      interval = setInterval(() => {
        setBtnTextIndex((prev) => {
          if (prev < btnStages.length - 1) {
            return prev + 1;
          } else {
            clearInterval(interval);
            return prev;
          }
        });
      }, 2000);
    } else {
      setBtnTextIndex(0);
    }
    return () => clearInterval(interval);
  }, [loading]);

  return (
    <form onSubmit={handleSignIn} className="space-y-4">
      <div>
        <label className="block text-gray-700 mb-1">Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <label className="block text-gray-700 mb-1">Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
      >
        {loading ? btnStages[btnTextIndex] : "Sign In"}
      </button>
      <div className="text-right mt-2">
        <a href="#" className="text-sm text-blue-500 hover:underline">
          Forgot Password?
        </a>
      </div>
    </form>
  );
};

export default Auth;
