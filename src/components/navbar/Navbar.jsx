// src/components/Navbar.jsx

import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom"; // If you're using React Router for navigation

const Navbar = () => {
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
          <Link to="/logout">
            {" "}
            <button
              onClick={() => {
                // Handle logout logic here
              }}
              className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
            >
              Logout
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
