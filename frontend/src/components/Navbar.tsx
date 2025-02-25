import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="border-b bg-white shadow">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="text-xl font-bold">
          Django React Boilerplate
        </Link>
        <div className="flex gap-4">
          <Link to="/" className="text-gray-600 hover:text-gray-900">
            Home
          </Link>
          <Link to="/about" className="text-gray-600 hover:text-gray-900">
            About
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
