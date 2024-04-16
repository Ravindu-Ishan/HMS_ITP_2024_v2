import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function TopNavStaff({ smid }) {

  const [isOpen, setOpen] = useState(true); //side bar open close state
  const [rootLayout, setLayoutStyle] = useState("root-layout"); //layout style css state
  const location = useLocation();

  const staffID = smid;

  // Function to determine if a link is selected
  const isSelected = (path) => {
    return location.pathname.includes(path);
  };

  return (
    <div className="navarea flex justify-center py-5  ">
      <nav className="gap-6 bg-white rounded-3xl flex max-w-min shadow-md">
        <div className={isSelected("/staff") ? " rounded-3xl p-10 text-lg font-semibold hover:bg-gray-50 hover:text-gray-700 rounded-r-3xl text-white bg-gradient-to-r from-green-300 to-green-500" : "rounded-3xl p-10 text-lg font-semibold text-white hover:bg-gray-50 hover:text-gray-700 "}>
          <Link to={`/staff/profile/${smid}`}>Profile</Link>
        </div>

        <div className="rounded-3xl p-10 text-lg font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-700">
          <Link to={`/test/testroute/${smid}`}>Profile</Link>
        </div>
        <div className="rounded-3xl p-10 text-lg font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-700">
          <Link to={"/"}>Profile</Link>
        </div>
        <div className={isSelected("/shift") ? " rounded-3xl p-10 text-lg font-semibold hover:bg-gray-50 hover:text-gray-700 rounded-r-3xl text-white bg-gradient-to-r from-green-300 to-green-500" : "rounded-3xl p-10 text-lg font-semibold text-white hover:bg-gray-50 hover:text-gray-700 "}>
          <Link to={`/shift/shiftsof/${smid}`}>Shifts</Link>
        </div>
      </nav>
    </div>
  );
}

export default TopNavStaff;
