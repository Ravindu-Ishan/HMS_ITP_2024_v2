import React, { useEffect, useState } from "react";
import axios from "axios";

import { useStaffAuthContext } from '../hooks/useStaffAuthContext'; //context hook
import { jwtDecode } from "jwt-decode";

//import components here
import LoadingComponent from "../components/LoadingComponent";
import TopNavUser from "../components/TopNavUser";
import PrimaryBtn from "../components/PrimaryBtn";
import CancelBtn from "../components/CancelBtn";
import ConfirmPopUp from "../components/ConfirmPopUp";
import TabComponent from "../components/TabComponent";

//import tabs here
import UserProfileMoreDetailsTab from "../tabs/UserProfileMoreDetailsTab";
import StaffAccountTab2 from "../tabs/StaffAccountTab2";

//import icons here
import { PiUserCircleFill } from "react-icons/pi";

//main function
const StaffProfile = () => {

  const { user } = useStaffAuthContext();
  const [isDisabled, setIsDisabled] = useState(true); //form activation state


  //get user id from token
  let id;
  if (user) {
    const userInfo = jwtDecode(JSON.stringify(user));
    id = userInfo.smid;
  }

  //create new staff record
  const [staff_NIC, setNIC] = useState("");
  const [staffName, setstaffName] = useState("");
  const [dateOfBirth, setdob] = useState("");
  const [role, setrole] = useState("");

  //loading state
  const [loading, setLoading] = useState(false);


  //button handlers
  //edit button
  const handleEditClick = () => {
    setIsDisabled(false);
  };

  //cancel button
  const handleCancelClick = () => {
    setIsDisabled(true);
    // Fetch staff details again to reset the form fields
    fetchStaffDetails();
  };


  //save button - update staff details
  const handleSaveClick = () => {

    const data = {
      staff_NIC,
      staffName,
      dateOfBirth,
      role,
    };
    setLoading(true);
    axios
      .put(`/update/${id}`, data)
      .then(() => {
        setLoading(false);
        // Reload the page after successful save
        window.location.reload();
      })
      .catch((error) => {
        setLoading(false);
        window.location.reload(); //reset page if save unsuccessful
        alert("An error happened. Please check console");
        console.log("Error saving staff details:", error);
      });



  };
  //get staff member details
  const fetchStaffDetails = () => {

    setLoading(true);
    axios
      .get(`/profile/${id}`)
      .then((response) => {
        setNIC(response.data.staff_NIC);
        setstaffName(response.data.staffName);
        setdob(response.data.dateOfBirth);
        setrole(response.data.role);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error fetching staff details:", error);
        setLoading(false);
      });
  };

  // on page load/reload - use effect
  useEffect(() => {
    fetchStaffDetails();
  }, []);


  const items = [
    {
      title: 'More details',
      content:
        (

          <div>
            <UserProfileMoreDetailsTab role={role} smid={id} />
          </div>

        ),
    },
    {
      title: 'Account',
      content: (
        <div>
          <StaffAccountTab2 smid={id} />
        </div>
      ),
    },
    {
      title: <div className="text-red-500 p-0">Actions</div>,
      content: (
        <div className='border-2 border-blue-400 rounded-lg p-4'>
          <h1 className='text-3xl text-blue-600'>Title Test 3</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores
            aperiam asperiores doloribus velit dolore magnam ex consectetur fugit
            earum illum qui similique architecto dolorum, minima enim quidem
            voluptatibus at nulla deleniti harum! Totam, mollitia quos voluptatem
            deleniti provident obcaecati rerum. amet consectetur adipisicing elit.
            Dolores aperiam asperiores doloribus velit dolore magnam ex
            consectetur fugit earum illum qui similiq
          </p>
        </div>
      ),
    },];

  return (
    <>
      <div className="navarea">
        <TopNavUser smid={id} />
      </div>

      <main>
        <div className="main-container">
          {loading ? (
            <LoadingComponent />
          ) : (
            <div>

              {/*-------------------------------------personal details----------------------------------------------------*/}
              <div className="bg-white border border-gray-200 rounded-[50px] shadow-lg p-10 m-5">
                <div className="text-xl ml-5 mb-5 font-bold text-gray-600">
                  My Profile
                </div>
                <div className="md:flex">
                  <div className="ml-10 mr-20">
                    <PiUserCircleFill className="text-[150px] text-slate-700" />
                  </div>
                  <div className=" flex-grow">
                    <form className="transparentClass">
                      <fieldset disabled={isDisabled}>
                        <div className="md:flex md:items-center ">
                          <div className="md:w-1/5">
                            <label className="block text-gray-600 font-bold md:text-left mb-1 md:mb-0 ">
                              NIC
                            </label>
                          </div>
                          <div className="md:w-2/3">
                            <input
                              className=" w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none disabled:border-0 border-b-2 border-gray-200"
                              type="text"
                              value={staff_NIC}
                              onChange={(e) => setNIC(e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="md:flex md:items-center ">
                          <div className="md:w-1/5">
                            <label className="block text-gray-600 font-bold md:text-left mb-1 md:mb-0 ">
                              Full Name
                            </label>
                          </div>
                          <div className=" md:w-2/3">
                            <input
                              className=" w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none disabled:border-0 border-b-2 border-gray-200"
                              type="text"
                              value={staffName}
                              onChange={(e) => setstaffName(e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="md:flex md:items-center ">
                          <div className=" md:w-1/5">
                            <label className="block text-gray-600 font-bold md:text-left mb-1 md:mb-0 ">
                              Date of Birth
                            </label>
                          </div>
                          <div className="md:w-2/3">
                            <input
                              className=" w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none disabled:border-0 border-b-2 border-gray-200"
                              type="date"
                              value={dateOfBirth}
                              onChange={(e) => setdob(e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="md:flex md:items-center ">
                          <div className="md:w-1/5">
                            <label className="block text-gray-600 font-bold md:text-left mb-1 md:mb-0 ">
                              Role
                            </label>
                          </div>
                          <div className="md:w-2/3">
                            <input
                              className=" w-full py-2 px-4 text-gray-700 leading-tight focus:outline-blue-100 focus:border-1"
                              type="text"
                              value={role}
                              onChange={(e) => setrole(e.target.value)}
                              disabled
                            />
                          </div>
                        </div>
                      </fieldset>

                      {isDisabled ? (
                        <div className="mt-5 text-right">
                          <PrimaryBtn
                            onClick={handleEditClick}
                            btntitle={"Edit"}
                          ></PrimaryBtn>
                        </div>
                      ) : (
                        <div className="mt-5 text-right">
                          <div className=" inline-block">
                            <CancelBtn
                              onClick={handleCancelClick}
                              btntitle={"Cancel"}
                            ></CancelBtn>
                          </div>
                          <div className="inline-block">
                            <ConfirmPopUp btntitle={"Save"} onConfirmFunction={handleSaveClick} />
                          </div>
                        </div>
                      )}
                    </form>
                  </div>
                </div>
              </div>

              {/*-------------------------------------other details----------------------------------------------------*/}


              <div className="max-w bg-white border border-gray-200 rounded-3xl shadow p-10 m-5">
                <div className="card-body">

                  <TabComponent items={items} />

                </div>
              </div>

            </div>
          )}
        </div>
      </main>


    </>
  );
};

export default StaffProfile;
