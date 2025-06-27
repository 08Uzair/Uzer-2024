import { useState, useEffect, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCartProduct,
  cartProductUpdate,
  getCartProductByUserID,
  CartProductDeletedByUserId,
} from "../redux/actions/cart";
import { useNavigate } from "react-router-dom";
import { addOrders } from "../redux/actions/orders";
import Loader from "../utility/Loader";
import Navbar from "./Navbar";
import { Footer } from "./Footer";
import EmptyCart from "./EmptyCart";
import { toast } from "react-toastify";
import { TOAST } from "../utility/constantToast";

const CartItems = () => {
  const cartProducts = useSelector((state) => state?.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [userData, setUserData] = useState();

  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem("profile"))?.result;
    setUserData(profile);
  }, []);

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
    window.scroll(0, 0);
  }, [dispatch, userData]);

  const handleDelete = (id) => {
    dispatch(deleteCartProduct(id));
    toast.success(TOAST.CART.DELETE_CART);
  };

  const handleIncrease = (id) => {
    setQuantities((prev) => {
      const updated = { ...prev };
      const product = products.find((p) => p._id === id);
      if (product?.product?.stocks > updated[id]) {
        updated[id] += 1;
        dispatch(cartProductUpdate(id, { stocks: updated[id] }));
      }
      return updated;
    });
  };

  const handleDecrease = (id) => {
    setQuantities((prev) => {
      const updated = { ...prev };
      if (updated[id] > 1) {
        updated[id] -= 1;
        dispatch(cartProductUpdate(id, { stocks: updated[id] }));
      }
      return updated;
    });
  };

  const truncateString = (input, length) =>
    input?.length > length ? input.slice(0, length) + "..." : input;

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

  const handleAddOrders = async () => {
    const newOrder = {
      product: products.map((p) => p.product._id),
      user: userData._id,
      quantity: totalQuantity,
      paymentInfo: {
        id: "payment_id",
        status: "payment_status",
        paidAt: new Date().toISOString(),
        itemsPrice: subtotalPrice.toFixed(2),
        taxPrice: "0",
        shippingPrice: "50.00",
        totalPrice,
      },
    };
    try {
      await dispatch(addOrders(newOrder));
      // await dispatch(CartProductDeletedByUserId(userData._id));
      window.scrollTo(0, 0);
      navigate("/paymentSucess");
    } catch (error) {
      console.log(error);
    }
  };

  if (!cartProducts) return <Loader />;
  if (cartProducts.length === 0) return <EmptyCart />;

  return (
    <>
      <Navbar total={totalPrice} />
      <div className="pt-8 px-4 md:px-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="md:col-span-2 space-y-6">
            {products.map((item) => (
              <div
                key={item._id}
                className="flex flex-col md:flex-row items-center backdrop-blur-md bg-white/50 rounded-xl shadow-lg hover:shadow-2xl transition p-4 gap-4 border border-gray-200"
              >
                <img
                  src={item?.product?.image}
                  alt="Product"
                  className="w-full md:w-36 h-36 object-cover rounded-lg hover:grayscale transition"
                />

                <div className="flex-1 space-y-2">
                  <h2 className="text-lg font-semibold text-gray-800">
                    {truncateString(item?.product?.name, 23)}
                  </h2>
                  <p className="text-sm text-gray-500">{item?.product?.size}</p>
                  <p className="text-gray-600 text-sm">
                    {truncateString(item?.product?.description, 120)}
                  </p>

                  <div className="flex items-center gap-4 mt-3">
                    <div className="flex border rounded overflow-hidden backdrop-blur-sm bg-white/70">
                      <button
                        onClick={() => handleDecrease(item._id)}
                        className="px-3 py-1 bg-gray-100 hover:bg-blue-500 hover:text-white"
                      >
                        -
                      </button>
                      <input
                        readOnly
                        type="number"
                        value={quantities[item._id] || 1}
                        className="w-10 text-center border-l border-r bg-transparent"
                      />
                      <button
                        onClick={() => handleIncrease(item._id)}
                        className="px-3 py-1 bg-gray-100 hover:bg-blue-500 hover:text-white"
                      >
                        +
                      </button>
                    </div>
                    <p className="text-gray-800 font-medium">
                      ₹ {quantities[item._id] * item?.product?.price}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => handleDelete(item._id)}
                  className="mt-4 md:mt-0 text-red-500 hover:text-red-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>

          {/* Checkout Summary */}
          <div className="sticky top-24 backdrop-blur-lg bg-white/60 border border-gray-200 rounded-xl shadow-lg p-6 space-y-4 h-fit">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>₹ {subtotalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Total Quantity</span>
              <span>{totalQuantity}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span>₹ 50.00</span>
            </div>
            <hr className="border-gray-300" />
            <div className="flex justify-between font-semibold text-gray-800">
              <span>Total</span>
              <span>₹ {totalPrice}</span>
            </div>

            <button
              onClick={handleAddOrders}
              className="w-full mt-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition font-medium"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default memo(CartItems);
