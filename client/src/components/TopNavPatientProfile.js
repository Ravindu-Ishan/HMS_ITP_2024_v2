import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function TopNavPatientProfile({ smid }) {

  const location = useLocation();

  // Function to determine if a link is selected
  const isSelected = (path) => {
    return location.pathname.includes(path);
  };

  return (
    <div className="navarea flex justify-center py-5  ">
      <nav className="gap-6 bg-white rounded-3xl flex shadow-md">
        <div className={isSelected("/patienthome") ? " rounded-3xl p-10 text-lg font-semibold hover:bg-gray-50 hover:text-gray-700 rounded-r-3xl text-white bg-gradient-to-r from-green-300 to-green-500" : "rounded-3xl p-10 text-lg font-semibold text-gray-500 hover:bg-gray-50 hover:text-gray-700 "}>
          <Link className="" to={`/patient/${smid}`}>Patient Info</Link>
        </div>
        
        <div className={isSelected("/prescriptionsHome") ? " rounded-3xl p-10 text-lg font-semibold hover:bg-gray-50 hover:text-gray-700 rounded-r-3xl text-white bg-gradient-to-r from-green-300 to-green-500" : "rounded-3xl p-10 text-lg font-semibold text-gray-500 hover:bg-gray-50 hover:text-gray-700 "}>
          <Link className="" to={"/prescriptionsHome"}>Prescriptions</Link>
  </div>
        <div className={isSelected("/labsReports") ? " rounded-3xl p-10 text-lg font-semibold hover:bg-gray-50 hover:text-gray-700 rounded-r-3xl text-white bg-gradient-to-r from-green-300 to-green-500" : "rounded-3xl p-10 text-lg font-semibold text-gray-500 hover:bg-gray-50 hover:text-gray-700 "}>
          <Link to={"/labsReports"}>Lab Reports</Link>
        </div>
      </nav>
    </div>
  );
}

export default TopNavPatientProfile;
