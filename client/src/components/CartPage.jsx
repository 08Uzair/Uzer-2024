import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCartProduct,
  cartProductUpdate,
  getCartProductByUserID,
  CartProductDeletedByUserId,
} from "../redux/actions/cart";
import Navbar from "./Navbar";
import { NavLink, useNavigate } from "react-router-dom";
import { addOrders, createOrder } from "../redux/actions/orders";
import Loader from "../utility/Loader";
import { Footer } from "./Footer";
import EmptyCart from "./EmptyCart";

const CartItems = () => {
  const cartProducts = useSelector((state) => state?.cart);
  // console.log(cartProducts);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [userData, setUserData] = useState();
  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem("profile"))?.result;
    setUserData(profile);
  }, []);

  // console.log(userData);

  useEffect(() => {
    if (cartProducts) {
      setProducts(cartProducts);
      const initialQuantities = {};
      cartProducts.forEach((product) => {
        initialQuantities[product._id] = 1;
      });
      setQuantities(initialQuantities);
    }
  }, [cartProducts]);

  useEffect(() => {
    dispatch(getCartProductByUserID(userData?._id));
  }, [dispatch, userData]);

  const handleDelete = (id) => {
    dispatch(deleteCartProduct(id));
    // window.location.reload();
    // console.log("delete");
  };
  // const handleDeleteAll = () => {
  //   dispatch(userData?._id);
  //   // window.location.reload();
  //   // console.log("delete");
  // };

  const handleIncrease = (id) => {
    setQuantities((prevQuantities) => {
      const newQuantities = { ...prevQuantities };
      const product = products.find((product) => product._id === id);
      if (product?.product?.stocks > newQuantities[id]) {
        newQuantities[id] += 1;
        dispatch(cartProductUpdate(id, { stocks: newQuantities[id] }));
      }
      return newQuantities;
    });
  };

  const handleDecrease = (id) => {
    setQuantities((prevQuantities) => {
      const newQuantities = { ...prevQuantities };
      if (newQuantities[id] > 1) {
        newQuantities[id] -= 1;
        dispatch(cartProductUpdate(id, { stocks: newQuantities[id] }));
      }
      return newQuantities;
    });
  };

  function truncateString(input, length) {
    if (input?.length > length) {
      return input?.slice(0, length) + "...";
    }
    return input;
  }

  const totalQuantity = Object.values(quantities).reduce(
    (acc, qty) => acc + qty,
    0
  );
  const subtotalPrice = products.reduce(
    (acc, product) =>
      acc + product?.product?.price * (quantities[product?._id] || 1),
    0
  );

  const totalPrice = (subtotalPrice + 50).toFixed(2);
  // console.log(products);

  const handleAddOrders = async () => {
    const newOrder = {
      product: products.map((product) => product.product._id), // Ensure correct mapping
      user: userData._id,
      quantity: totalQuantity,
      paymentInfo: {
        id: "payment_id", // Provide actual payment info here
        status: "payment_status", // Provide actual payment status here
        paidAt: new Date().toISOString(), // Provide actual paid date here
        itemsPrice: subtotalPrice.toFixed(2),
        taxPrice: "0", // Set the tax price if applicable
        shippingPrice: "50.00", // The shipping price you've added
        totalPrice: totalPrice,
      },
    };

    try {
      await dispatch(addOrders(newOrder));
      window.scrollTo(0, 0);
      console.log("Added Order:", newOrder);
      navigate("/paymentSucess");
    } catch (error) {
      console.log(error);
    }
  };
  if (!cartProducts) {
    return <Loader />;
  }
  if (cartProducts.length === 0) {
    return <EmptyCart />;
  }
  return (
    <>
      <Navbar total={totalPrice} />
      <div className="pt-20">
        <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
        <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
          <div className="rounded- ">
            {products.map((item, index) => (
              <>
                <div
                  key={index}
                  className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start"
                >
                  <img
                    src={item?.product?.image}
                    alt="product-image"
                    className="w-full rounded-lg sm:w-40"
                  />
                  <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                    <div className="mt-5 sm:mt-0">
                      <h2 className="text-lg font-bold text-gray-900">
                        {truncateString(item?.product?.name, 23)}
                      </h2>
                      <p className="mt-1 text-xs text-gray-700">
                        {item?.product?.size}
                      </p>
                      <p className="mt-1 text-md text-gray-900">
                        {truncateString(item?.product?.description, 150)}
                      </p>
                    </div>
                    <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                      <div className="flex items-center border-gray-100">
                        <button onClick={() => handleDecrease(item._id)}>
                          <span className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50">
                            -
                          </span>
                        </button>
                        <input
                          className="h-6 w-9 border bg-white text-center text-xs outline-none"
                          type="number"
                          readOnly
                          value={quantities[item._id] || 1}
                          min="1"
                          max={item?.product?.stocks}
                        />
                        <button onClick={() => handleIncrease(item._id)}>
                          <span className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50">
                            +
                          </span>
                        </button>
                      </div>
                      <div className="flex items-center space-x-4">
                        <p className="text-sm">
                          ₹ {quantities[item._id] * item?.product?.price}
                        </p>
                        <button onClick={() => handleDelete(item._id)}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ))}
          </div>
          <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
            <div className="mb-2 flex justify-between">
              <p className="text-gray-700">Subtotal</p>
              <p className="text-gray-700">₹ {subtotalPrice.toFixed(2)}</p>
            </div>
            <div className="mb-2 flex justify-between">
              <p className="text-gray-700">Total Quantity</p>
              <p className="text-gray-700">{totalQuantity}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-700">Shipping</p>
              <p className="text-gray-700">₹ 50.00</p>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between">
              <p className="text-lg font-bold">Total</p>
              <div>
                <p className="mb-1 text-lg font-bold">₹ {totalPrice}</p>
                <p className="text-sm text-gray-700">including VAT</p>
              </div>
            </div>
            <NavLink to="/paymentSucess">
              <button
                onClick={handleAddOrders} // Remove the arrow function and parentheses
                className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600"
              >
                Check out
              </button>
            </NavLink>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CartItems;
