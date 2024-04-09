import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

//import components here
import LoadingComponent from "../components/LoadingComponent";
import ModelTemplate from "../components/ModelTemplate";
import EmptyNavArea from "../components/EmptyNavArea";
import PrimaryBtn from "../components/PrimaryBtn";
import EditDataModel from "../components/EditDataModel";

//import icons here
import { FaSearch } from "react-icons/fa";

//main function
const Branches = () => {

  //all branch records
  const [branchrecords, setRecords] = useState([]);

  //branch details
  const [branchName, setbranchName] = useState("");
  const [branchLocation, setbranchLocation] = useState("");

  //branch edit details
  const [id, setBranchID] = useState("");

  //search
  const [search, setSearch] = useState("");

  //navigate
  const navigate = useNavigate();

  //loading
  const [loading, setLoading] = useState(false);

  //new branch record button handle
  const handleNewBranchRecord = () => {
    const data = {
      branchName,
      branchLocation,

    };
    setLoading(true);
    axios
      .post("/branchcreate", data)
      .then((response) => {
        setLoading(false);
        setRecords([...branchrecords, response.data]);
        navigate("/branch");
      })
      .catch((error) => {
        setLoading(false);
        alert("An error happened. Please check console");
        console.log(error);
      });
  };

  //edit branch record save click
  const handleSaveClick = () => {

    const data = {
      branchName,
      branchLocation,

    };
    setLoading(true);
    axios
      .put(`/updateBranch/${id}`, data)
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

  //edit branch link button handle 
  const handleEditBranch = (branchID) => {
    axios
      .get(`/getBranchByID/${branchID}`)
      .then((response) => {
        setbranchName(response.data.branchName); //.data.data because we have two parts, count and data parts in staffRoute.js
        setbranchLocation(response.data.branchLocation)
        setBranchID(branchID);

      })
      .catch((error) => {
        console.log("Error fetching staff details:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    setLoading(true); //set loading state to true
    axios
      .get("/branchget")
      .then((response) => {
        setRecords(response.data.data); //.data.data because we have two parts, count and data parts in staffRoute.js
        setLoading(false); //set loading state to false
      })
      .catch((error) => {
        console.log("Error fetching staff details:", error);
        setLoading(false);
      });
  }, []);

  //main page starts here
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
              <div className="flex justify-between sticky top-0 max-w bg-white border border-gray-200 rounded-xl shadow pt-2 px-2">

                <ModelTemplate
                  btntitle={"Create New"}
                  modaltitle={"New Branch"}
                  modalContent={
                    <div className="pt-5">
                      <form className="max-w-sm mx-auto">
                        <div className="relative z-0 w-full mb-5 group">
                          <input
                            type="text"
                            name="floating_nic"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-600 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            value={branchName}
                            onChange={(e) => setbranchName(e.target.value)}
                          />
                          <label
                            for="floating_nic"
                            className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                          >
                            Branch Name :
                          </label>
                        </div>

                        <div className="relative z-0 w-full mb-5 group">
                          <input
                            type="text"
                            name="floating_name"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-600 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            value={branchLocation}
                            onChange={(e) => setbranchLocation(e.target.value)}
                          />
                          <label
                            for="floating_name"
                            className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                          >
                            Branch Address :
                          </label>
                        </div>




                      </form>

                      <div className="text-right">
                        <PrimaryBtn
                          btntitle={"Submit"}
                          onClick={handleNewBranchRecord}
                        ></PrimaryBtn>
                      </div>
                    </div>
                  }
                />

                {/*------------------------------------Search bar---------------------------------*/}
                <div className="mt-2">
                  <div>
                    <form className=' border-b-2 border-b-gray-300'>
                      <input type='text' placeholder='Search' onChange={(e) => setSearch(e.target.value)} className=" focus:outline-none" />
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
                      <th className="p-3">Branch Name</th>
                      <th className="p-3">Branch Address</th>
                      <th className="p-3">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {branchrecords.filter((item) => {
                      return search.toLowerCase() === '' ?
                        item :
                        item.branchName.toLowerCase().includes(search)
                        || item.branchLocation.includes(search)
                    }).map((branch, index) =>
                    (




                      <tr
                        className="text-gray-600 bg-white hover:bg-gray-200 hover:text-black"
                        key={branch._id}
                      >

                        <td className="text-center">{index + 1}</td>
                        <td className="text-center">{branch.branchName}</td>
                        <td className="text-center">{branch.branchLocation}</td>
                        <td className="text-center">
                          <div>
                            <EditDataModel
                              btntitle={"Edit"}
                              buttonFunction={() => handleEditBranch(branch._id)}
                              modaltitle={"New Branch"}
                              modalContent={
                                <div className="pt-5">
                                  <form className="max-w-sm mx-auto">
                                    <div className="relative z-0 w-full mb-5 group">
                                      <input
                                        type="text"
                                        name="floating_nic"
                                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-600 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                        placeholder=" "
                                        value={branchName}
                                        onChange={(e) => setbranchName(e.target.value)}
                                      />
                                      <label
                                        for="floating_nic"
                                        className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                      >
                                        Branch Name :
                                      </label>
                                    </div>

                                    <div className="relative z-0 w-full mb-5 group">
                                      <input
                                        type="text"
                                        name="floating_name"
                                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-600 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                        placeholder=" "
                                        value={branchLocation}
                                        onChange={(e) => setbranchLocation(e.target.value)}
                                      />
                                      <label
                                        for="floating_name"
                                        className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                      >
                                        Branch Location :
                                      </label>
                                    </div>
                                  </form>

                                  <div className="text-right">
                                    <PrimaryBtn
                                      btntitle={"Submit"}
                                      onClick={handleSaveClick}
                                    ></PrimaryBtn>
                                  </div>
                                </div>
                              }
                            />
                          </div>

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

export default Branches;
