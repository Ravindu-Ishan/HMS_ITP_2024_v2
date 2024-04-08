import React, { useEffect, useState } from "react";
import axios from "axios";

//import components here
import LoadingComponent from "../components/LoadingComponent";
import PrimaryBtn from "../components/PrimaryBtn";
import CancelBtn from "../components/CancelBtn";
import ConfirmPopUp from "../components/ConfirmPopUp";


function StaffMoreDetailsTab1({ role, staffNIC }) {

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
    const [regBranch, setRegBranch] = useState('');

    //all branches
    const [branches, setAllBranches] = useState([]);


    //get and display details according to role
    const fetchDetails = () => {
        setLoading(true);
        // if role is doctor  - retrieve data from doctor
        if (rolename === 'doctor') {

            //retreive data from docModel
            axios
                .get(`/getDocDetails/${staffNIC}`)
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
            //retreive data from otherStaff Model
            axios
                .get(`/getOtherStaffDetails/${staffNIC}`)
                .then((response) => {
                    setRegBranch(response.data.branchName); //.data.data because we have two parts, count and data parts in staffRoute.js
                    setLoading(false); //set loading state to false 
                })
                .catch((error) => {
                    console.log("Error fetching details:", error);
                    setLoading(false);
                });

            //stop loading and display form
            setLoading(false);
            isForm2Hidden(false);
        }

        //retrieve any other common data here

    };



    //specialisation create or update  - save button handler (form 1)
    const handleSpSave = () => {

        //rename staffNIC as staff_NIC when sending to save

        if (initialSp.length === 0) {
            //create new doctor details record
            const data = {
                staffNIC,
                specialisation,
            };
            setLoading(true);
            axios
                .post('/doctordetail/create', data)
                .then(() => {
                    setLoading(false);
                    window.location.reload();
                    console.log(staffNIC);
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
                .put(`/updateDocDetail/${staffNIC}`, data)
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





        //create new other staff details record


    }





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


    //save button - update staff details
    const handleSaveClick = () => {


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
                                            className=" w-full py-2 px-4 text-gray-700 leading-tight focus:outline-blue-100 focus:border-1"
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
                                        <input
                                            className=" w-full py-2 px-4 text-gray-700 leading-tight focus:outline-blue-100 focus:border-1"
                                            type="text"
                                            value={'branch1'}
                                            onChange={''}
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
                                            <ConfirmPopUp btntitle={"Save"} onConfirmFunction={handleSaveClick} />
                                        </div>
                                    </div>
                                )}
                        </form >

                    </div >
                </div>
            )}
        </div >


    )

}

export default StaffMoreDetailsTab1