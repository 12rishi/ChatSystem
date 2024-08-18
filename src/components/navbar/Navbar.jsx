// src/components/Navbar.jsx

import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom"; // If you're using React Router for navigation
import { persistor } from "../../../store/store";

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("jsonToken");
    localStorage.removeItem("authState");
    persistor.purge();
    navigate("/login");
  };
  const { id } = useSelector((store) => store.auth);
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">MyApp</div>
        <div className="space-x-4">
          <Link
            to={`/?id=${id}`}
            className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
          >
            Home
          </Link>
          <Link
            to={`/editprofile?id=${id}`}
            className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
          >
            Edit Profile
          </Link>

          <button
            onClick={handleLogout}
            className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
