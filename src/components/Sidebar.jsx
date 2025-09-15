// src/components/Sidebar.jsx
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const links = [
    {
      name: "Contracts",
      path: "/dashboard",
      icon: (
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2m6 2v-2M9 9V7m6 2V7m-6 6h6" />
        </svg>
      ),
    },
    {
      name: "Insights",
      path: "/insights",
      icon: (
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1 4v4m4-4h-1v-4h-1m1 4v4M7 8h10" />
        </svg>
      ),
    },
    {
      name: "Reports",
      path: "/reports",
      icon: (
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v2h6v-2M9 13v2h6v-2M9 9v2h6V9z" />
        </svg>
      ),
    },
    {
      name: "Settings",
      path: "/settings",
      icon: (
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="w-64 bg-gradient-to-b from-indigo-700 to-indigo-900 text-white h-full p-4 space-y-4 border-r border-indigo-600 rounded-tr-xl rounded-br-xl shadow-lg">
      <h2 className="text-xl font-bold mb-6 text-indigo-200">Dashboard</h2>
      <nav className="flex flex-col space-y-2">
        {links.map((link) => (
          <button
            key={link.name}
            onClick={() => handleNavigate(link.path)}
            className={`flex items-center p-2 rounded hover:bg-indigo-600 transition-colors duration-200 ${
              location.pathname === link.path ? "bg-indigo-600" : ""
            }`}
          >
            {link.icon}
            {link.name}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
