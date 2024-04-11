import React from "react";
import { Link } from "react-router-dom";

function TopNavStaff({ smid }) {



  return (
    <div className="navarea flex justify-center py-5  ">
      <nav className="gap-6 bg-white rounded-3xl flex max-w-min shadow-md">
        <div className="rounded-3xl p-10 text-lg font-semibold text-white hover:bg-gray-50 hover:text-gray-700 bg-gradient-to-r from-green-300 to-green-500">
          <Link to={"/"}>Profile</Link>
        </div>

        <div className="rounded-3xl p-10 text-lg font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-700">
          <Link to={`/test/testroute/${smid}`}>Profile</Link>
        </div>
        <div className="rounded-3xl p-10 text-lg font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-700">
          <Link to={"/"}>Profile</Link>
        </div>
        <div className=" rounded-3xl p-10 text-lg font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-700">
          <Link to={`/shift/shiftsof/${smid}`}>Shifts</Link>
        </div>
      </nav>
    </div>
  );
}

export default TopNavStaff;
