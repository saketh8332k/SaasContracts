// src/components/Topbar.jsx
import React, { useContext, useState, useRef, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";

const Topbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 shadow-md p-4 flex justify-between items-center rounded-b-xl">
      <span className="text-lg font-semibold text-indigo-700">Hello, {user.username}</span>
      <div className="flex items-center space-x-4">

        {/* Profile dropdown */}
        <div className="relative" ref={dropdownRef}>
          <div onClick={toggleDropdown} className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center cursor-pointer hover:bg-indigo-200 hover:shadow-lg transition-all duration-200">
            <svg className="w-6 h-6 text-indigo-700" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 4a4 4 0 110 8 4 4 0 010-8zm0 12c-2.67 0-5.33 1.34-5.33 2v1.33A1.34 1.34 0 007.34 20h9.33c.74 0 1.33-.6 1.33-1.34V18c0-.66-2.67-2-5.34-2z" clipRule="evenodd" />
            </svg>
          </div>

          {isOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg shadow-lg transition-all duration-200">
              <button
                onClick={() => {
                  alert("Edit Profile clicked");
                  setIsOpen(false);
                }}
                className="w-full text-left px-4 py-2 hover:bg-indigo-50 text-indigo-700 transition-colors duration-200"
              >
                Edit Profile
              </button>
              <button
                onClick={() => logout()}
                className="w-full text-left px-4 py-2 hover:bg-indigo-50 text-red-500 transition-colors duration-200"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Topbar;
