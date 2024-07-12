import React, { useEffect, useRef } from "react";
import Chart from "chart.js";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/actions/product";
import { getUsers } from "../../redux/actions/auth";
import { getOrders } from "../../redux/actions/orders";

const setupSalesChart = (ctx) => {
  new Chart(ctx, {
    type: "line",
    data: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
      datasets: [
        {
          label: "Sales",
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          backgroundColor: "rgba(75,192,192,0.6)",
          borderColor: "rgba(75,192,192,1)",
        },
      ],
    },
  });
};

const setupProductChart = (ctx) => {
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Product A", "Product B", "Product C", "Product D"],
      datasets: [
        {
          label: "Product Performance",
          data: [300, 50, 100, 40],
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
          hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
        },
      ],
    },
  });
};

const setupUserChart = (ctx) => {
  new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Active Users", "Inactive Users"],
      datasets: [
        {
          data: [300, 50],
          backgroundColor: ["#FF6384", "#36A2EB"],
          hoverBackgroundColor: ["#FF6384", "#36A2EB"],
        },
      ],
    },
  });
};

const Analytics = () => {
  const salesChartRef = useRef(null);
  const productChartRef = useRef(null);
  const userChartRef = useRef(null);
  const dispatch = useDispatch();

  const data = useSelector((state) => state?.orders);
  console.log(data);
  useEffect(() => {
    dispatch(getOrders());
    window.scrollTo(0, 0);
  }, [dispatch]);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  const productData = useSelector((state) => state?.product?.products);
  const userData = useSelector((state) => state?.authReducer?.users);
  useEffect(() => {
    dispatch(getUsers());
    window.scrollTo(0, 0);
  }, [dispatch]);
  useEffect(() => {
    const salesCtx = salesChartRef.current.getContext("2d");
    const productCtx = productChartRef.current.getContext("2d");
    const userCtx = userChartRef.current.getContext("2d");

    setupSalesChart(salesCtx);
    setupProductChart(productCtx);
    setupUserChart(userCtx);
  }, []);

  return (
    <div style={{ width: "85%" }}>
      <div className="min-h-screen p-6 bg-gray-100">
        <h2 className="text-3xl font-bold mb-6">E-commerce Analytics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Sales Trends</h3>
            <canvas ref={salesChartRef}></canvas>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Product Performance</h3>
            <canvas ref={productChartRef}></canvas>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">User Activity</h3>
            <canvas ref={userChartRef}></canvas>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          <div className="bg-white p-4 rounded-lg shadow-lg flex items-center">
            <div className="flex-grow">
              <h3 className="text-xl font-semibold">Total Sales</h3>
              <p className="text-2xl">$123,456</p>
            </div>
            <img
              style={{ width: "22%" }}
              src="http://clipart-library.com/images_k/dollar-sign-silhouette/dollar-sign-silhouette-11.png"
            />
          </div>
          <div className="bg-white p-4 rounded-lg shadow-lg flex items-center">
            <div className="flex-grow">
              <h3 className="text-xl font-semibold">Total Products</h3>
              <p className="text-2xl">{productData?.length}</p>
            </div>
            <img
              style={{ width: "34%" }}
              src="https://vectorified.com/images/product-icon-png-5.png"
            />
          </div>
          <div className="bg-white p-4 rounded-lg shadow-lg flex items-center">
            <div className="flex-grow">
              <h3 className="text-xl font-semibold">Total Customers</h3>
              <p className="text-2xl">{userData?.length}</p>
            </div>
            <img
              style={{ width: "35%" }}
              src="https://cdn4.iconfinder.com/data/icons/project-management-72/70/group__team__management__employees_-1024.png"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
