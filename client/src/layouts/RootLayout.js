import React from "react";
import { Link, Outlet } from "react-router-dom";

//import components
import SideBarNav from "../components/SideBarNav";

//import icons
import { FaCircleUser } from "react-icons/fa6";

const RootLayout = () => {
  return (
    <div className="root-layout">
      <SideBarNav></SideBarNav>

      <div className="user ">
        <div className="bg-white rounded-l-lg shadow-md p-4 mt-5 fixed top-0 right-0 z-50 ">
          <Link to={`user`}>
            <FaCircleUser className="text-4xl" />
          </Link>
        </div>
      </div>

      <Outlet />

      {/*empty gird areas*/}
    </div>
  );
};

export default RootLayout;
