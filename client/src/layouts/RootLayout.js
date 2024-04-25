import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

//import hooks
import useLogout from "../hooks/useLogout";


//import icons
import { FaCircleUser } from "react-icons/fa6";
import { IoMenu } from "react-icons/io5";
import { IoMdCloseCircle } from "react-icons/io";
import { FaUserFriends } from "react-icons/fa";
import { FaClipboardList } from "react-icons/fa";
import { FaClipboardUser } from "react-icons/fa6";
import { FaUserInjured } from "react-icons/fa";
import { ImLab } from "react-icons/im";
import { FaBedPulse } from "react-icons/fa6";
import { MdInventory } from "react-icons/md";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { FaBuilding } from "react-icons/fa";
import { RiLogoutBoxFill } from "react-icons/ri";


//main funciton
const RootLayout = () => {

  //logou
  const { logout } = useLogout();

  const handleLogoutbtn = () => {
    logout();
  }

  const [isOpen, setOpen] = useState(true); //side bar open close state
  const [rootLayout, setLayoutStyle] = useState("root-layout"); //layout style css state
  const location = useLocation();

  // Function to determine if a link is selected
  const isSelected = (path) => {
    return location.pathname.includes(path);
  };

  //change state and css function 
  const sidebarState = () => {
    if (isOpen) {
      setOpen(false)
      setLayoutStyle("root-layout-sidebarClosed")
    }
    if (!isOpen) {
      setOpen(true)
      setLayoutStyle("root-layout")
    }
  }


  return (
    <div className={rootLayout} >
      {isOpen ? (

        <aside id="sidebar">
          <div className="overflow-auto hiddenScroll xl:h-full border border-gray-200 mr-2 rounded-tr-3xl drop-shadow-lg bg-white ">
            <div className="sidebar-title">
              <div className="sidebar-brand">MedFlow</div>

              <button className="" onClick={sidebarState}>
                <IoMdCloseCircle className=" text-xl" />
              </button>
            </div>
            <ul className="sidebar-list">
              <Link to="/staff">
                <li className={isSelected("/staff") ? " p-5 rounded-r-3xl text-white bg-gradient-to-r from-green-300 to-green-500" : "sidebar-list-item"}>
                  <FaUserFriends className=" inline-flex mr-5" />
                  Manage Staff
                </li>
              </Link>
              <Link to="/appointment">
                <li className={isSelected("/appointment") ? " p-5 rounded-r-3xl text-white bg-gradient-to-r from-green-300 to-green-500" : "sidebar-list-item"}>
                  <FaClipboardList className=" inline-flex mr-5" />
                  <div className=" inline-flex">
                    Manage Appointments
                  </div>
                </li>
              </Link>
              <Link to="/attendence">
                <li className={isSelected("/attendence") ? " p-5 rounded-r-3xl text-white bg-gradient-to-r from-green-300 to-green-500" : "sidebar-list-item"}>
                  <FaClipboardUser className=" inline-flex mr-5" />
                  <div className=" inline-flex">
                    Manage Attendance and Leave
                  </div>
                </li>
              </Link>
              <Link to="/patient">
                <li className={isSelected("/patient") ? " p-5 rounded-r-3xl text-white bg-gradient-to-r from-green-300 to-green-500" : "sidebar-list-item"}>
                  <FaUserInjured className=" inline-flex mr-5" />
                  <div className=" inline-flex">
                    Manage Patient
                  </div>
                </li>
              </Link>
              <Link to="/laboratory">
                <li className={isSelected("/laboratory") ? " p-5 rounded-r-3xl text-white bg-gradient-to-r from-green-300 to-green-500" : "sidebar-list-item"}>
                  <ImLab className=" inline-flex mr-5" />
                  <div className=" inline-flex">
                    Manage Laboratory
                  </div>
                </li>
              </Link>
              <Link to="/wards">
                <li className={isSelected("/wards") ? " p-5 rounded-r-3xl text-white bg-gradient-to-r from-green-300 to-green-500" : "sidebar-list-item"}>
                  <FaBedPulse className=" inline-flex mr-5" />
                  <div className=" inline-flex">
                    Manage Wards
                  </div>
                </li>
              </Link>
              <Link to="/productmain">
                <li className={isSelected("/inventory") ? " p-5 rounded-r-3xl text-white bg-gradient-to-r from-green-300 to-green-500" : "sidebar-list-item"}>
                  <MdInventory className=" inline-flex mr-5" />
                  <div className=" inline-flex">
                    Manage Inventory
                  </div>
                </li>
              </Link>
              <Link to="/finance">
                <li className={isSelected("/finance") ? " p-5 rounded-r-3xl text-white bg-gradient-to-r from-green-300 to-green-500" : "sidebar-list-item"}>
                  <FaMoneyCheckDollar className=" inline-flex mr-5" />
                  <div className=" inline-flex">
                    Manage Finances
                  </div>
                </li>
              </Link>
              <Link to="/branch">
                <li className={isSelected("/branch") ? " p-5 rounded-r-3xl text-white bg-gradient-to-r from-green-300 to-green-500" : "sidebar-list-item"}>
                  <FaBuilding className=" inline-flex mr-5" />
                  <div className=" inline-flex">
                    Manage Branches
                  </div>
                </li>
              </Link>
            </ul>
            <div className="text-right mt-44 p-5 border-t-2 border-t-[#002f8731]  text-gray-600">
              <button
                onClick={handleLogoutbtn}
                className=""
              >
                <RiLogoutBoxFill className=" inline-flex" />Logout
              </button>
            </div>


          </div>


        </aside>

      ) : (

        <aside className="sidebarbtn">
          <div className="flex justify-center pt-1">
            <button className="text-3xl" onClick={sidebarState}>
              <IoMenu />
            </button>
          </div>

        </aside>
      )
      }

      {/*user profile button*/}

      <div className="user ">
        <div className="bg-white rounded-l-lg shadow-md p-4 mt-5 fixed top-0 right-0 z-50 ">
          <Link to={`user`}>
            <FaCircleUser className="text-4xl" />
          </Link>
        </div>
      </div>

      <Outlet />

      {/*empty gird areas*/}
    </div >
  );
};

export default RootLayout;
