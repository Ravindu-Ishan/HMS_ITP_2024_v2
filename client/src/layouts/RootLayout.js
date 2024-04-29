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

//import images
import brandLogo from "../images/brandLogo.png"


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
              <div className="sidebar-brand inline-flex"><img src={brandLogo} alt="brand logo" width={60} className="mr-2" /><div className="mt-2">MedFlow</div></div>


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
              <Link to="/appointmentHome">
                <li className={isSelected("/appointmentHome") ? " p-5 rounded-r-3xl text-white bg-gradient-to-r from-green-300 to-green-500" : "sidebar-list-item"}>
                  <FaClipboardList className="inline-flex mr-5" />
                  <div className="inline-flex">
                    Manage Appointments
                  </div>
                </li>
              </Link>
              <Link to="/attendence/main">
                <li className={isSelected("/attendence") ? " p-5 rounded-r-3xl text-white bg-gradient-to-r from-green-300 to-green-500" : "sidebar-list-item"}>
                  <FaClipboardUser className=" inline-flex mr-5" />
                  <div className=" inline-flex">
                    Attendance and Leave
                  </div>
                </li>
              </Link>
              <Link to="/patient">
                <li className={isSelected("/patient") ? " p-5 rounded-r-3xl text-white bg-gradient-to-r from-green-300 to-green-500" : "sidebar-list-item"}>
                  <FaUserInjured className=" inline-flex mr-5" />
                  <div className=" inline-flex">
                    Manage Patients
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

              <li>
                <details className="group [&_summary::-webkit-details-marker]:hidden">
                  <summary className={isSelected(" /inventory") ? "flex p-5 rounded-r-3xl text-white bg-gradient-to-r from-green-300 to-green-500" : "flex sidebar-list-item"}>
                    <MdInventory className=" inline-flex mr-5" />
                    <div className=" inline-flex">
                      Inventory Management
                    </div>

                    <span className="ml-2 shrink-0 transition duration-300 group-open:-rotate-180">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  </summary>

                  <ul className="mt-1 pl-10">
                    <Link to="/inventory">
                      <li className={isSelected("/inventory") ? "p-3 text-sm text-[#002F87] font-semibold " : " hover:bg-gray-300 hover:rounded-2xl p-3 text-sm text-[#002F87]"}>
                        <MdInventory className=" inline-flex mr-5" />
                        <div className=" inline-flex">
                          Manage Inventory
                        </div>
                      </li>
                    </Link>

                    <Link to="/inventory">
                      <li className={isSelected("/restock") ? "p-3 text-sm text-[#002F87] font-semibold " : "hover:bg-gray-300 hover:rounded-2xl p-3 text-sm text-[#002F87]"}>
                        <MdInventory className=" inline-flex mr-5" />
                        <div className=" inline-flex">
                          Restock Requests
                        </div>
                      </li>
                    </Link>

                  </ul>
                </details>
              </li>

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
            <div className="text-right mt-44 p-5 border-t-2 border-t-[#002f8731]  text-gray-500 font-semibold hover:text-gray-800" >
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
          <button className="text-3xl" onClick={sidebarState}>
            <div className="bg-white rounded-r-lg shadow-md p-4 mt-5 fixed top-0 left-0 z-50 hover:border-y-2 hover:border-r-2 hover:border-green-200">
              <IoMenu />
            </div>
          </button>
        </aside>
      )
      }

      {/*user profile button*/}

      <div className="user">
        <Link to="/user/profile">
          <div className="bg-white rounded-l-lg shadow-md p-4 mt-5 fixed top-0 right-0 z-50 hover:border-y-2 hover:border-l-2 hover:border-green-200 ">
            <FaCircleUser className="text-3xl" />
          </div>
        </Link>
      </div>

      <Outlet />

      {/*empty gird areas*/}
    </div >
  );
};

export default RootLayout;
