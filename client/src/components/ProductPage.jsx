import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { getProductByID } from "../redux/actions/products";
import { useParams } from "react-router-dom";
import { createCartProducts } from "../redux/actions/cart";
import Loader from "../utility/Loader";
// import Recomended from "./Recomended";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const singleProduct = useSelector((state) => state?.products?.[0]);
  console.log(singleProduct);

  useEffect(() => {
    dispatch(getProductByID(id));
  }, [dispatch, id]);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < Math.floor(rating)) {
        stars.push(
          <svg
            key={i}
            className="w-6 h-6 text-yellow-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9.049 2.927a1 1 0 011.902 0l1.28 4.151a1 1 0 00.95.69h4.387a1 1 0 01.593 1.807l-3.542 2.646a1 1 0 00-.364 1.118l1.28 4.151a1 1 0 01-1.451 1.118l-3.542-2.646a1 1 0 00-1.176 0l-3.542 2.646a1 1 0 01-1.451-1.118l1.28-4.151a1 1 0 00-.364-1.118L2.05 9.575a1 1 0 01.593-1.807h4.387a1 1 0 00.95-.69l1.28-4.151z" />
          </svg>
        );
      } else if (i < rating) {
        stars.push(
          <svg
            key={i}
            className="w-6 h-6 text-yellow-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9.049 2.927a1 1 0 011.902 0l1.28 4.151a1 1 0 00.95.69h4.387a1 1 0 01.593 1.807l-3.542 2.646a1 1 0 00-.364 1.118l1.28 4.151a1 1 0 01-1.451 1.118l-3.542-2.646a1 1 0 00-1.176 0l-3.542 2.646a1 1 0 01-1.451-1.118l1.28-4.151a1 1 0 00-.364-1.118L2.05 9.575a1 1 0 01.593-1.807h4.387a1 1 0 00.95-.69l1.28-4.151z" />
          </svg>
        );
      } else {
        stars.push(
          <svg
            key={i}
            className="w-6 h-6 text-gray-200"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9.049 2.927a1 1 0 011.902 0l1.28 4.151a1 1 0 00.95.69h4.387a1 1 0 01.593 1.807l-3.542 2.646a1 1 0 00-.364 1.118l1.28 4.151a1 1 0 01-1.451 1.118l-3.542-2.646a1 1 0 00-1.176 0l-3.542 2.646a1 1 0 01-1.451-1.118l1.28-4.151a1 1 0 00-.364-1.118L2.05 9.575a1 1 0 01.593-1.807h4.387a1 1 0 00.95-.69l1.28-4.151z" />
          </svg>
        );
      }
    }
    return stars;
  };
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem("profile"))?.result;
    setUserData(profile);
  }, []);
  const handleAddToCart = async (productId) => {
    if (!userData) {
      toast.error("User not found");
      return;
    }

    const newProduct = {
      product: productId,
      user: userData._id,
    };

    try {
      dispatch(createCartProducts(newProduct));
    } catch (error) {
      console.log(error);
    }
  };
if(!singleProduct){
  return <Loader/> ;
}
  return (
    <>
      <Navbar />
      <div>
        <div className="w-full mx-auto mt-10 p-5  rounded-lg shadow-lg">
          <div className="flex flex-col md:flex-row justify-center items-center">
            <div className="w-80">
              <img
                className="rounded-lg object-cover "
                src={singleProduct?.image}
                alt="singleProduct"
              />
            </div>
            <div className="md:w-1/2 md:pl-8 mt-4 md:mt-0">
              <h1 className="text-2xl font-bold mb-2">{singleProduct?.name}</h1>
              <p className="text-gray-700 mb-4">{singleProduct?.description}</p>
              <div className="flex items-center">
                {renderStars(singleProduct?.rank)}
                <span className="ml-2 text-gray-600">
                  {singleProduct?.reviews}
                </span>
              </div>
              <div className="text-3xl font-bold text-gray-900 mt-4">
                ₹ {singleProduct?.price}
              </div>
              <button
                className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
                onClick={() => handleAddToCart(singleProduct._id)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
