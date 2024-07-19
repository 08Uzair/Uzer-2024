import React, { useEffect, useState } from "react";
import { getUsers, signUp, signin } from "../redux/actions/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const Auth = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [avatar, setAvatar] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [number, setNumber] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);
  const handelSignUp = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const newUser = {
        avatar,
        fname,
        lname,
        country,
        state,
        city,
        pinCode,
        email,
        password,
        number,
        address1,
        address2,
      };
      await dispatch(signUp(newUser));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    } finally {
      setLoading(false);
    }

    window.location.reload();
  };
  const handleSignIn = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const user = {
        email,
        password,
      };
      console.log(user);
      await dispatch(signin(user));

      navigate("/");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center">
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
          <button
            onClick={() => setIsSignIn(false)}
            className={`px-4 py-2 text-lg font-semibold ${
              !isSignIn ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
            }`}
          >
            Sign Up
          </button>
        </div>
        {isSignIn ? (
          <SignInForm
            handleSignIn={handleSignIn}
            setEmail={setEmail}
            setPassword={setPassword}
            loading={loading}
          />
        ) : (
          <SignUpForm
            handelSignUp={handelSignUp}
            avatar={avatar}
            setAvatar={setAvatar}
            lname={lname}
            setLname={setLname}
            fname={fname}
            setFname={setFname}
            country={country}
            setCountry={setCountry}
            state={state}
            setState={setState}
            city={city}
            setCity={setCity}
            pinCode={pinCode}
            setPinCode={setPinCode}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            number={number}
            setNumber={setNumber}
            address1={address1}
            setAddress1={setAddress1}
            address2={address2}
            setAddress2={setAddress2}
            loading={loading}
          />
        )}
      </div>
    </div>
  );
};

const SignInForm = ({ handleSignIn, setEmail, setPassword, loading }) => (
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
        disabled={loading}
      >
        {loading ? "Signing in..." : "Signin"}
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

const SignUpForm = ({
  handelSignUp,
  avatar,
  setAvatar,
  lname,
  setLname,
  setFname,
  fname,
  setCountry,
  country,
  setState,
  state,
  setCity,
  city,
  setPinCode,
  pinCode,
  setEmail,
  email,
  setPassword,
  password,
  setNumber,
  number,
  setAddress1,
  address1,
  setAddress2,
  address2,
  loading,
}) => {
  const [step, setStep] = useState(1);

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handelSignUp(e);
      }}
    >
      {step === 1 && (
        <>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Profile Avatar
            </label>
            <input
              className="shadow appearance-none border w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Image Url"
              onChange={(e) => setAvatar(e.target.value)}
              value={avatar}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              First Name
            </label>
            <input
              className="shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="First Name"
              onChange={(e) => setFname(e.target.value)}
              value={fname}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Last Name
            </label>
            <input
              className="shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Last Name"
              onChange={(e) => setLname(e.target.value)}
              value={lname}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline"
              type="button"
              onClick={nextStep}
            >
              Next
            </button>
          </div>
        </>
      )}
      {step === 2 && (
        <>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Country
            </label>
            <input
              className="shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Country"
              onChange={(e) => setCountry(e.target.value)}
              value={country}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              State
            </label>
            <input
              className="shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="State"
              onChange={(e) => setState(e.target.value)}
              value={state}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              City
            </label>
            <input
              className="shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="City"
              onChange={(e) => setCity(e.target.value)}
              value={city}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline"
              type="button"
              onClick={prevStep}
            >
              Previous
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline"
              type="button"
              onClick={nextStep}
            >
              Next
            </button>
          </div>
        </>
      )}
      {step === 3 && (
        <>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Pin-Code
            </label>
            <input
              className="shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="Number"
              placeholder="Pin-Code"
              onChange={(e) => setPinCode(e.target.value)}
              value={pinCode}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              className="shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              className="shadow appearance-none border w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline"
              type="button"
              onClick={prevStep}
            >
              Previous
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline"
              type="button"
              onClick={nextStep}
            >
              Next
            </button>
          </div>
        </>
      )}
      {step === 4 && (
        <>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Mobile Number
            </label>
            <input
              className="shadow appearance-none border w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              type="number"
              placeholder="Number"
              onChange={(e) => setNumber(e.target.value)}
              value={number}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Address-1
            </label>
            <input
              className="shadow appearance-none border w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Address-1"
              onChange={(e) => setAddress1(e.target.value)}
              value={address1}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Address-2
            </label>
            <input
              className="shadow appearance-none border w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Address-2"
              onChange={(e) => setAddress2(e.target.value)}
              value={address2}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline"
              type="button"
              onClick={prevStep}
            >
              Previous
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline"
              type="submit"
              disabled={loading}
            >
              {loading ? "Signing up..." : "Signup"}
            </button>
          </div>
        </>
      )}
    </form>
  );
};

export default Auth;
