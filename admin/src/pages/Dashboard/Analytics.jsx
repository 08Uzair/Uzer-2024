import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/actions/product";
import { getUsers } from "../../redux/actions/auth";
import { getOrders, getTotal } from "../../redux/actions/orders";
import Loader from "../../utility/Loader";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from "recharts";

const COLORS = ["#60a5fa", "#4ade80", "#facc15", "#f87171", "#a78bfa", "#fb7185"];

const Analytics = () => {
  const dispatch = useDispatch();
  const orders = useSelector((s) => s.orders);
  const totalPriceData = orders?.totalPrice;
  const products = useSelector((s) => s.product.products);
  const users = useSelector((s) => s.authReducer.users);

  useEffect(() => {
    dispatch(getOrders());
    dispatch(getTotal());
    dispatch(getProducts());
    dispatch(getUsers());
  }, [dispatch]);

  if (!orders || !products || !users || !totalPriceData) {
    return <Loader />;
  }

const productChartData = products.map((p) => ({
  name: p.name.length > 15 ? `${p.name.slice(0, 20)}...` : p.name,
  Value: p.price * (p.stocks || 1),
}));


  const userActiveCount = users.filter(u => u.active).length;
  const userInactiveCount = users.length - userActiveCount;
  const userChartData = [
    { name: 'Active Users', Value: userActiveCount },
    { name: 'Inactive Users', Value: userInactiveCount },
  ];

  return (
    <div style={{ width: "85%" }}>
      <div className="min-h-screen p-6 bg-gray-100">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">E‑commerce Analytics</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-lg hover:scale-105 transition">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Product Revenue (Price × Stocks)
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={productChartData}>
                <XAxis
                  dataKey="name"
                  tick={({ x, y, payload }) => (
                    <g transform={`translate(${x},${y + 10})`}>
                      <foreignObject width={60} height={20}>
                        <div className="line-clamp-1 text-xs text-center" style={{ width: '60px' }}>
                          {payload.Value}
                        </div>
                      </foreignObject>
                    </g>
                  )}
                />
                <YAxis />
                <Tooltip />
                <Bar dataKey="Value" fill="#60a5fa" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg hover:scale-105 transition">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              User Activity Status
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={userChartData}
                  dataKey="Value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {userChartData.map((entry, idx) => (
                    <Cell key={idx} fill={COLORS[idx]} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {[
            {
              title: "Total Sales",
              Value: totalPriceData.totalPriceSum,
              svg: (
                <svg className="w-14 h-14 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 15l-5-5h3V5h4v5h3l-5 5z" />
                </svg>
              ),
              gradient: "from-blue-500 to-indigo-600",
            },
            {
              title: "Total Products",
              Value: products.length,
              svg: (
                <svg className="w-14 h-14 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 3h12a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V4a1 1 0 011-1z" />
                </svg>
              ),
              gradient: "from-green-400 to-emerald-600",
            },
            {
              title: "Total Customers",
              Value: users.length,
              svg: (
                <svg className="w-14 h-14 text-purple-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4S14.21 4 12 4 8 5.79 8 8s1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              ),
              gradient: "from-pink-500 to-rose-600",
            },
          ].map((card, idx) => (
            <div
              key={idx}
              className={`bg-gradient-to-r ${card.gradient} text-white p-6 rounded-xl shadow-xl flex items-center hover:scale-105 transition`}
            >
              <div className="flex-grow">
                <h3 className="text-lg font-semibold">{card.title}</h3>
                <p className="text-3xl font-bold mt-2">{card.Value}</p>
              </div>
              {card.svg}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
