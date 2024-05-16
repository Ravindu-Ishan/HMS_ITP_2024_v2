import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import validator from "validator";
import { isOnlySpaces, isOnlyAlphabet, isAlphanumeric } from "../hooks/validations";

//import components here
import LoadingComponent from "../components/LoadingComponent";
import ModelTemplate from "../components/ModelTemplate";
import PrimaryBtn from "../components/PrimaryBtn";
import EmptyNavArea from "../components/EmptyNavArea";

//import icons here
import { RiEdit2Fill } from "react-icons/ri";
import { FaSearch } from "react-icons/fa";

//main function
const StaffMain = () => {
  //create new staff record
  const [pstaff_NIC, setNIC] = useState("");
  const [pstaffName, setstaffName] = useState("");
  const [pdateOfBirth, setdob] = useState("");
  const [prole, setrole] = useState("");

  //form message and valid state
  const [errorMsg, setErrorMsg] = useState('');
  const [valid, setValid] = useState(true);

  //search
  const [search, setSearch] = useState("");

  //navigate
  const navigate = useNavigate();

  //loading
  const [loading, setLoading] = useState(false);

  //set staff records
  const [staffrecords, setRecords] = useState([]);

  //get staff records
  useEffect(() => {
    setLoading(true); //set loading state to true
    axios
      .get("/get")
      .then((response) => {
        setRecords(response.data.data); //.data.data because we have two parts, count and data parts in staffRoute.js
        setLoading(false); //set loading state to false
      })
      .catch((error) => {
        console.log("Error fetching staff details:", error);
        setLoading(false);
      });
  }, []);

  //create new staff record method
  const HandleNewStaffRecord = () => {

    //------front-end validations----------
    let valid = true; //initialize form valid state

    //sanitizations
    const staff_NIC = validator.trim(pstaff_NIC);
    const staffName = validator.trim(pstaffName);
    const dateOfBirth = pdateOfBirth;
    const role = validator.trim(prole);

    //check if all fields are set

    if (validator.isEmpty(staff_NIC) || validator.isEmpty(staffName) || validator.isEmpty(dateOfBirth) || validator.isEmpty(role)) {
      setErrorMsg('Please fill out all fields');
      valid = false
    }
    else if (isOnlyAlphabet(role) == false || isOnlyAlphabet(staffName) == false) {
      setErrorMsg('Full Name and Role cannot have numeric characters');
      valid = false
    }
    else if (!isAlphanumeric(staff_NIC)) {
      setErrorMsg('NIC cannot have special characters')
      valid = false
    }
    else if (isOnlySpaces(staff_NIC) || isOnlySpaces(staffName) || isOnlySpaces(dateOfBirth) || isOnlySpaces(role)) {
      setErrorMsg('Error, unnecessary whitespaces detected in form fields');
      valid = false
    }
    if (valid == true) {
      const data = {
        staff_NIC,
        staffName,
        dateOfBirth,
        role,
      }
      setLoading(true);
      axios
        .post("/create", data)
        .then((response) => {
          alert("Staff member added successfully !")
          setLoading(false);
          setRecords([...staffrecords, response.data]);
          //reset form states
          setErrorMsg('');
          setNIC('');
          setdob('');
          setrole('');
          setstaffName('');
          navigate("/staff");
        })
        .catch((error) => {
          alert("Something went wrong , please check console")
          setLoading(false);
          console.log(error);
        });
    }
  }


  return (
    <>
      <EmptyNavArea></EmptyNavArea>
      <main>
        <div className="main-container">
          {loading ? (
            <LoadingComponent />
          ) : (
            <div>
              {/*------------------------------------Create new entry button, pop up model and search bar card---------------------------------*/}
              <div className="flex sticky top-0 max-w bg-white border border-gray-200 rounded-xl shadow pt-2 px-2">
                <ModelTemplate
                  btntitle={"Create New"}
                  modaltitle={"New Staff Member"}
                  modalContent={
                    <div className="pt-5">
                      <form className="max-w-sm mx-auto">
                        <div className="relative z-0 w-full mb-5 group">
                          <input
                            type="text"
                            name="floating_nic"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-600 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            value={pstaff_NIC}
                            onChange={(e) => setNIC(e.target.value)}
                          />
                          <label
                            for="floating_nic"
                            className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                          >
                            National Identity Card No :
                          </label>
                        </div>

                        <div className="relative z-0 w-full mb-5 group">
                          <input
                            type="text"
                            name="floating_name"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-600 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            value={pstaffName}
                            onChange={(e) => setstaffName(e.target.value)}
                          />
                          <label
                            for="floating_name"
                            className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                          >
                            Full Name
                          </label>
                        </div>

                        <div className="relative z-0 w-full mb-5 group">
                          <input
                            type="date"
                            name="floating_date"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-600 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            value={pdateOfBirth}
                            onChange={(e) => setdob(e.target.value)}
                          />
                          <label
                            for="floating_date"
                            className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                          >
                            Date of Birth :
                          </label>
                        </div>

                        <div className="relative z-0 w-full mb-5 group">
                          <input
                            type="text"
                            name="floating_role"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-600 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            value={prole}
                            onChange={(e) => setrole(e.target.value)}
                          />
                          <label
                            for="floating_role"
                            className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                          >
                            Role/Position :
                          </label>
                        </div>
                      </form>
                      <div>
                        {errorMsg && <div className="text-red-500 text-center"> {errorMsg} </div>}
                      </div>
                      <div className="text-right">
                        <PrimaryBtn
                          btntitle={"Submit"}
                          onClick={HandleNewStaffRecord}
                        ></PrimaryBtn>
                      </div>
                    </div>
                  }
                />

                {/*------------------------------------Generate report button---------------------------------*/}

                <div className="">
                  <Link to="/staff/report"><button className="text-white bg-green-600 hover:bg-green-700  font-medium rounded-full text-sm px-5 py-2.5 text-center">Generate Report</button></Link>
                </div>



                {/*------------------------------------Search bar---------------------------------*/}
                <div className=" mt-2">
                  <div>
                    <form className=' border-b-2 border-b-gray-300'>
                      <input type='text' placeholder='Search' onChange={(e) => setSearch(e.target.value)} className=" absolute inset-y-0 end-0 focus:outline-none" />
                      <span className="absolute inset-y-0 end-0 grid place-content-center px-4 text-gray-500">
                        <FaSearch />
                      </span>
                    </form>
                  </div>
                </div>
              </div>

              {/*------------------------------------Data display table--------------------------------*/}
              <div className="overflow-x-auto sm:rounded-lg tablestyle">
                <table className="w-full text-sm border-separate border-spacing-x-0 border-spacing-y-2 text-gray-500 ">
                  <thead className="text-xs text-gray-700 uppercase bg-white">
                    <tr>
                      <th className="p-3"></th>
                      <th className="p-3">NIC</th>
                      <th className="p-3">Full Name</th>
                      <th className="p-3">Role/Position</th>
                      <th className="p-3">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {staffrecords.filter((item) => {
                      return search.toLowerCase() === '' ?
                        item :
                        item.staffName.toLowerCase().includes(search)
                        || item.staff_NIC.includes(search)
                        || item.role.toLowerCase().includes(search)
                    }).map((staff, index) => (
                      <tr
                        className="text-gray-600 bg-white hover:bg-gray-200 hover:text-black"
                        key={staff._id}
                      >
                        <td className="text-center">{index + 1}</td>
                        <td className="text-center">{staff.staff_NIC}</td>
                        <td>{staff.staffName}</td>
                        <td className="text-center">{staff.role}</td>
                        <td className="text-center">
                          <Link
                            className=" text-blue-700 "
                            to={`profile/${staff._id}`}
                          >
                            <RiEdit2Fill className="inline-block" />
                            <p className="inline-block">Edit</p>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default StaffMain;
