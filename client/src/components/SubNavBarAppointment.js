import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function TopNavAppointment({ smid }) {

  const location = useLocation();

  // Function to determine if a link is selected
  const isSelected = (path) => {
    return location.pathname.includes(path);
  };

  return (
    <div className="navarea flex justify-center py-3  ">
      <nav className="gap-6 bg-white rounded-3xl flex shadow-md">
        <div className={isSelected("/appointmentHome") ? "rounded-3xl p-6 text-lg font-semibold hover:bg-gray-50 hover:text-gray-700 rounded-r-3xl text-white bg-gradient-to-r from-yellow-300 to-yellow-500" : "rounded-3xl p-6 text-lg font-semibold text-gray-500 hover:bg-gray-50 hover:text-gray-700 "}>
          <Link className="" to={`/appointmentHome`}>Appointments</Link>
        </div>
        <div className={isSelected("labAppointHome") ? "rounded-3xl p-6 text-lg font-semibold hover:bg-gray-50 hover:text-gray-700 rounded-r-3xl text-white bg-gradient-to-r from-yellow-300 to-yellow-500" : "rounded-3xl p-6 text-lg font-semibold text-gray-500 hover:bg-gray-50 hover:text-gray-700 "}>
          <Link to={"/labAppointHome"}>Lab Appointments</Link>
        </div>
        {/* <div className={isSelected("doctorView") ? "rounded-3xl p-10 text-lg font-semibold hover:bg-gray-50 hover:text-gray-700 rounded-r-3xl text-white bg-gradient-to-r from-green-300 to-green-500" : "rounded-3xl p-10 text-lg font-semibold text-gray-500 hover:bg-gray-50 hover:text-gray-700 "}>
          <Link to={"/doctorView"}>Doctor View</Link>
        </div>         */}
      </nav>
    </div>
  );
}

export default TopNavAppointment;
