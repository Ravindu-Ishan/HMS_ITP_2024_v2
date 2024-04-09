import React, { useEffect, useState } from "react";
import axios from "axios";

//import components here
import LoadingComponent from "../components/LoadingComponent";
import PrimaryBtn from "../components/PrimaryBtn";
import CancelBtn from "../components/CancelBtn";
import ConfirmPopUp from "../components/ConfirmPopUp";

function StaffMoreDetailsTab1({ role, smid }) {

    //loading state
    const [loading, setLoading] = useState(false);

    //convert role name string letters to lower case
    const rolename = role.toLowerCase();

    //form display states
    const [showForm1, isForm1Hidden] = useState(true);
    const [showForm2, isForm2Hidden] = useState(true);

    const [isDisabled, setIsDisabled] = useState(true); //form activation state

    //doctor details state
    const [specialisation, setSp] = useState('');


    const [initialSp, setIniSp] = useState('');

    //other details state
    const [regBid, setRegBranch] = useState('');
    const [regBname, setRegBname] = useState('');
    const [bid, setBid] = useState('');

    //all branches
    const [branches, setAllBranches] = useState([]);


    //get and display details according to role
    const fetchDetails = () => {

        setLoading(true); //set loading state to true

        // if role is doctor  - retrieve data from doctor
        if (rolename === 'doctor') {

            //retreive data from docModel
            axios
                .get(`/getDocDetails/${smid}`)
                .then((response) => {
                    setSp(response.data.specialisation); //.data.data because we have two parts, count and data parts in staffRoute.js
                    setIniSp(response.data.specialisation);
                    setLoading(false); //set loading state to false 
                })
                .catch((error) => {
                    console.log("Error fetching details:", error);
                    setLoading(false);
                });


            // stop loading and display form
            setLoading(false);
            isForm1Hidden(false);

        }
        if (rolename != 'doctor') {


            //retreive data of staff member from other staff model
            axios
                .get(`/otherstaff/get/${smid}`)
                .then((response) => {

                    setRegBranch(response.data.bid); //set bid to regBid constant

                    const branchID = response.data.bid;

                    if (response != null) {
                        axios.get(`/getBranchByID/${branchID}`)
                            .then((parameter) => {

                                setRegBname(parameter.data.branchName); //set respective branch name
                            })
                            .catch((error) => {
                                console.log("Error fetching details:", error);
                                setLoading(false);
                            });
                    }


                    setLoading(false); //set loading state to false 

                })
                .catch((error) => {
                    console.log("Error fetching details:", error);
                    setLoading(false);
                });



            //retrieve all branch details to propagate allocated branch list

            axios.get("/branchget").then((response) => {

                setAllBranches(response.data.data);
            }).catch((error) => {
                console.log("Error fetching details:", error);
                setLoading(false);

            })

            //stop loading and display form
            setLoading(false);
            isForm2Hidden(false);
        }



    }



    //specialisation create or update  - save button handler (form 1)
    const handleSpSave = () => {

        if (initialSp.length === 0) {
            //create new doctor details record
            const data = {
                smid,
                specialisation,
            };
            setLoading(true);
            axios
                .post('/doctordetail/create', data)
                .then(() => {
                    setLoading(false);
                    window.location.reload();
                })
                .catch((error) => {
                    setLoading(false);
                    window.location.reload();
                    alert("An error happened. Please check console");
                    console.log(error);
                });
        }
        else {

            //always update data if specialisation has a value
            const data = {
                specialisation,
            };

            setLoading(true);
            axios
                .put(`/updateDocDetail/${smid}`, data)
                .then(() => {
                    setLoading(false);
                    // Reload the page after successful save
                    window.location.reload();
                })
                .catch((error) => {
                    setLoading(false);
                    window.location.reload(); //reset page if save unsuccessful
                    alert("An error happened. Please check console");
                    console.log("Error updating details:", error);
                });
        }

    }


    //Branch create or update  - save button handler (form 2)
    const handleBranchSave = () => {


        if (regBid.length === 0) {
            //create new doctor details record
            const data = {
                smid,
                bid,
            };
            setLoading(true);
            axios
                .post('/otherstaff/create', data)
                .then(() => {
                    setLoading(false);
                    window.location.reload();

                })
                .catch((error) => {
                    setLoading(false);
                    window.location.reload();
                    alert("An error happened. Please check console");
                    console.log(error);
                });
        }
        else {

            //always update data if specialisation has a value
            const data = {
                bid,
            };

            setLoading(true);
            axios
                .put(`/otherstaff/update/${smid}`, data)
                .then(() => {
                    setLoading(false);
                    // Reload the page after successful save
                    window.location.reload();
                })
                .catch((error) => {
                    setLoading(false);
                    window.location.reload(); //reset page if save unsuccessful
                    alert("An error happened. Please check console");
                    console.log("Error updating details:", error);
                });
        }

    };



    //button handlers
    //edit button
    const handleEditClick = () => {
        setIsDisabled(false);
    };

    //cancel button
    const handleCancelClick = () => {
        setIsDisabled(true);
        // Fetch staff details again to reset the form fields
        fetchDetails();
    };


    // on page load/reload - use effect
    useEffect(() => {
        fetchDetails();
    }, []);


    return (
        <div>
            {loading ? (
                <LoadingComponent />
            ) : (
                <div>
                    <div className=" flex-grow">
                        {/*-----------------if role == doctor ( form1 ) -----------------------------*/}
                        <form className="transparentClass" hidden={showForm1}>
                            <fieldset disabled={isDisabled}>
                                <div className="md:flex md:items-center ">
                                    <div className="md:w-1/5">
                                        <label className="block text-gray-600 font-bold md:text-left mb-1 md:mb-0 ">
                                            Specialization
                                        </label>
                                    </div>
                                    <div className="md:w-2/3">
                                        <input
                                            className=" w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none disabled:border-0 border-b-2 border-gray-200"
                                            type="text"
                                            value={specialisation}
                                            onChange={(e) => setSp(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </fieldset>

                            {
                                isDisabled ? (
                                    <div className="mt-5 text-right" >
                                        <PrimaryBtn
                                            onClick={handleEditClick}
                                            btntitle={"Edit"}
                                        ></PrimaryBtn>
                                    </div >
                                ) : (
                                    <div className="mt-5 text-right">
                                        <div className=" inline-block">
                                            <CancelBtn
                                                onClick={handleCancelClick}
                                                btntitle={"Cancel"}
                                            ></CancelBtn>
                                        </div>
                                        <div className="inline-block">
                                            <ConfirmPopUp btntitle={"Save"} onConfirmFunction={handleSpSave} />
                                        </div>
                                    </div>
                                )}
                        </form>

                        {/*-----------------if other role-----------------------------*/}
                        <form className="transparentClass" hidden={showForm2}>
                            <fieldset disabled={isDisabled}>
                                <div className="md:flex md:items-center ">
                                    <div className=" md:w-1/5">
                                        <label className="block text-gray-600 font-bold md:text-left mb-1 md:mb-0 ">
                                            Allocated Branch
                                        </label>
                                    </div>
                                    <div className="md:w-2/3">
                                        <select
                                            className=" w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none disabled:border-0 border-b-2 border-gray-200"
                                            defaultValue={regBid}
                                            value={bid}
                                            onChange={(e) => setBid(e.target.value)}
                                        >
                                            <option value={regBid}>{regBname}</option>
                                            <optgroup label="-------------------------------">
                                                {branches.map((branch) => (
                                                    <option key={branch._id} value={branch._id}>{branch.branchName}</option>
                                                ))}
                                            </optgroup>
                                        </select>
                                    </div>
                                </div>

                            </fieldset>

                            {
                                isDisabled ? (
                                    <div className="mt-5 text-right" >
                                        <PrimaryBtn
                                            onClick={handleEditClick}
                                            btntitle={"Edit"}
                                        ></PrimaryBtn>
                                    </div >
                                ) : (
                                    <div className="mt-5 text-right">
                                        <div className=" inline-block">
                                            <CancelBtn
                                                onClick={handleCancelClick}
                                                btntitle={"Cancel"}
                                            ></CancelBtn>
                                        </div>
                                        <div className="inline-block">
                                            <ConfirmPopUp btntitle={"Save"} onConfirmFunction={handleBranchSave} />
                                        </div>
                                    </div>
                                )}
                        </form >

                    </div >
                </div>
            )}
        </div >


    )

};







export default StaffMoreDetailsTab1