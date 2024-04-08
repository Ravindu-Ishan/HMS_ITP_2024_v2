import React, { useEffect, useState } from "react";
import axios from "axios";


//import components here
import LoadingComponent from "../components/LoadingComponent";
import PrimaryBtn from "../components/PrimaryBtn";
import EmptyNavArea from "../components/EmptyNavArea";

//import icons here
import { RiEdit2Fill } from "react-icons/ri";



//main function
const StaffMain = () => {
  return (
    <>
      <EmptyNavArea></EmptyNavArea>
      <main>
        <div className="main-container">hello user</div>
      </main>
    </>
  );
};

export default StaffMain;
