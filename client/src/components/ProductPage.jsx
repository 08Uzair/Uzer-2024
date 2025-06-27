import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { getProductByID, getProducts } from "../redux/actions/products";
import { useNavigate, useParams } from "react-router-dom";
import { createCartProducts } from "../redux/actions/cart";
import Loader from "../utility/Loader";
import { NavLink } from "react-router-dom";
import { Footer } from "./Footer";

export default function ProductPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const singleProduct = useSelector((state) => state.products.singleProduct);
  console.log(singleProduct, "This are single Product");
  const allProducts = useSelector(
    (state) => state?.products?.products.products
  );
  console.log(allProducts, "This are all Products");
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    dispatch(getProductByID(id));
    dispatch(getProducts());
    const profile = JSON.parse(localStorage.getItem("profile"))?.result;
    setUserData(profile);
    window.scrollTo(0, 0);
  }, [dispatch, id]);

  const handleAddToCart = (productId) => {
    if (!userData) {
      navigate("/auth");
      return;
    }
    dispatch(createCartProducts({ product: productId, user: userData._id }));
  };

  const renderStars = (rating) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <svg
          key={i}
          className={`w-5 h-5 ${
            i < rating ? "text-yellow-400" : "text-gray-300"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            d="M9.049 2.927a1 1 0 011.902 0l1.28 4.151a1 1 0 00.95.69h4.387a1 
            1 0 01.593 1.807l-3.542 2.646a1 1 
            0 00-.364 1.118l1.28 4.151a1 
            1 0 01-1.451 1.118l-3.542-2.646a1 
            1 0 00-1.176 0l-3.542 2.646a1 
            1 0 01-1.451-1.118l1.28-4.151a1 
            1 0 00-.364-1.118L2.05 9.575a1 
            1 0 01.593-1.807h4.387a1 1 
            0 00.95-.69l1.28-4.151z"
          />
        </svg>
      ));
  };

  if (!singleProduct) return <Loader />;
  const truncateString = (input, length) =>
    input?.length > length ? input.slice(0, length) + "..." : input;

  return (
    <>
      <Navbar />

      <section className="min-h-[100vh] flex items-center justify-center bg-gradient-to-br from-blue-50 to-white ">
        <div className="max-w-7xl w-full bg-white/70 backdrop-blur-lg shadow-2xl rounded-2xl p-8 md:p-12 flex flex-col md:flex-row gap-10">
          <div className="flex-1 flex items-center justify-center">
            <img
              src={singleProduct?.image}
              alt="Product"
              className="rounded-xl object-cover w-full max-h-[500px]"
            />
          </div>

          <div className="flex-1 flex flex-col justify-center">
            <h1 className="text-4xl font-bold mb-4 text-gray-800">
              {singleProduct?.name}
            </h1>
            <p className="text-gray-700 mb-6 text-base">
              {singleProduct?.description}
            </p>

            <div className="flex items-center mb-4">
              {renderStars(singleProduct?.rank)}
              <span className="ml-2 text-gray-500 text-sm">
                {singleProduct?.reviews} reviews
              </span>
            </div>

            <div className="text-4xl font-bold text-gray-900 mb-8">
              ₹ {singleProduct?.price}
            </div>

            <button
              onClick={() => handleAddToCart(singleProduct?._id)}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-8">
          Recommended Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {allProducts?.slice(0, 4)?.map((item, index) => (
            <div
              key={index}
              className="group bg-white border border-gray-200 rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition duration-300 flex flex-col"
            >
              <NavLink to={`/singleProduct/${item._id}`}>
                <div className="h-48 sm:h-52 md:h-56 overflow-hidden">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    src={item.image}
                    alt={item.name}
                  />
                </div>
              </NavLink>

              <div className="p-4 flex flex-col justify-between flex-1">
                <div>
                  <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-1">
                    {truncateString(item.name, 40)}
                  </h2>
                  <p className="text-gray-500 text-sm">
                    {truncateString(item.description, 60)}
                  </p>
                  <p className="flex items-center justify-start">
                    {renderStars(item.rank)}
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-md sm:text-lg font-bold text-green-600 bg-green-100 px-2 py-1 rounded-full">
                    ₹ {item.price}
                  </span>
                  <button
                    onClick={() => handleAddToCart(item._id)}
                    className="bg-indigo-600 text-white px-3 sm:px-4 py-2 rounded-lg text-sm hover:bg-indigo-700 transition"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}
