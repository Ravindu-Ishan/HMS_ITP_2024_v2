import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function TopNavInventory({ smid }) {

  const location = useLocation();

  // Function to determine if a link is selected
  const isSelected = (path) => {
    return location.pathname.includes(path);
  };

  return (
    <div className="navarea flex justify-center py-5  ">
      <nav className="gap-6 bg-white rounded-3xl flex shadow-md">
        <div className={isSelected("/productmain") ? " rounded-3xl p-10 text-lg font-semibold hover:bg-gray-50 hover:text-gray-700 rounded-r-3xl text-white bg-gradient-to-r from-green-300 to-green-500" : "rounded-3xl p-10 text-lg font-semibold text-gray-500 hover:bg-gray-50 hover:text-gray-700 "}>
          <Link to={`/productmain`}>Product Details</Link>
        </div>

        <div className="rounded-3xl p-10 text-lg font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-700">
          <Link to={"/suppliermain"}>Supplier Details</Link>
        </div>
        <div className="rounded-3xl p-10 text-lg font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-700">
          <Link to={"/RestockView"}>Restock Details</Link>
        </div>
        <div className=" rounded-3xl p-10 text-lg font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-700">
          <Link to={"/"}>Report Generation</Link>
        </div>
      </nav>
    </div>
  );
}

export default TopNavInventory;
