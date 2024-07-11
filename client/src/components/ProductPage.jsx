import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { getProductByID } from "../redux/actions/products";
import { useParams } from "react-router-dom";
// import Recomended from "./Recomended";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const singleProduct = useSelector((state) => state?.products?.[0]);
  useEffect(() => {
    dispatch(getProductByID(id));
  }, [dispatch, id]);
  // console.log(singleProduct);

  const reviews = { href: "#", average: singleProduct?.rank, totalCount: 117 };

  return (
    <>
      <Navbar />
      <div className="bg-white">
        <div className="pt-6 ">
          {/* Product info */}
          <div className="flex items-center justify-center">
            <img
              style={{ width: "18.5rem", height: "21rem" }}
              src={singleProduct?.image}
            />
          </div>
          <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                {singleProduct?.name}
              </h1>
            </div>

            {/* Options */}
            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="sr-only">singleProduct information</h2>
              <p className="text-3xl tracking-tight text-gray-900">
                ₹ {singleProduct?.price}
              </p>

              {/* Reviews */}
              <div className="mt-6">
                <h3 className="sr-only">Reviews</h3>
                <div className="flex items-center">
                  <div className="flex items">
                    {[0, 1, 2, 3, 4]?.map((rating) => (
                      <i
                        key={rating}
                        className={classNames(
                          reviews?.average > rating
                            ? "bx bxs-star text-gray-900"
                            : "bx bx-star text-gray-200",
                          "h-5 w-5 flex-shrink-0"
                        )}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <p className="sr-only">{reviews?.average} out of 5 stars</p>
                  <a
                    href={reviews?.href}
                    className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    {reviews?.totalCount} reviews
                  </a>
                </div>
              </div>

              <form className="mt-10">
                {/* Colors */}
                <div>
                  <h3 className="text-sm font-medium text-gray-900">
                    Color: {singleProduct?.color?.toUpperCase()}
                  </h3>
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      border: "1px solid black",
                      borderRadius: "50%",
                      background: singleProduct?.color || "transparent",
                    }}
                  ></div>
                </div>

                <button
                  type="submit"
                  className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Add to bag
                </button>
              </form>
            </div>

            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
              {/* Description and details */}
              <div>
                <h3 className="sr-only">Description</h3>

                <div className="space-y-6">
                  <p className="text-base text-gray-900">
                    {singleProduct?.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <Recomended /> */}
    </>
  );
}
