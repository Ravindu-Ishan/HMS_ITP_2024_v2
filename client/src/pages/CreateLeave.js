/*import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import EmptyNavArea from "../components/EmptyNavArea";
import { useStaffAuthContext } from '../hooks/useStaffAuthContext';
import { jwtDecode } from "jwt-decode";



const CreateLeave = () => {

    const { user } = useStaffAuthContext();
    //get user id from token
    let smid;
    if (user) {
    const userInfo = jwtDecode(JSON.stringify(user));
    smid = userInfo.smid;
    }

    
    const navigate = useNavigate();

    
    const [leaveDate, setleaveDate] = useState("");
    const [leaveName, setleaveName] = useState("");
    const [leaveType, setleaveType] = useState("");
    const [leaveReason, setleaveReason] = useState("");
    const [leaveDuration, setleaveDuration] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    
  
  
    const onSubmit = async (e) => {
        
        e.preventDefault();

        //validations
        if (!leaveDate || !leaveName || !leaveType || !leaveReason || !leaveDuration) {
            setErrorMessage("Please fill out all fields.");
            return;
        };

        
     
        const data = {

            smid: smid,
            leaveDate: leaveDate,
            leaveName: leaveName,
            leaveType: leaveType,
            leaveReason: leaveReason,
            leaveDuration: leaveDuration,

        };
           
        try {
            const res = await axios.post("/user/userLeaves/save", data); // Adjust the URL
            if (res.data.success) {
                alert("leave created successfully!");
                navigate(-1);
            } else {
                throw new Error(res.data.error || "Failed to create leave");
            }
        } /*catch (error) {
            console.error("Error creating leave:", error);
            setErrorMessage( "Failed to create leave" );
        }catch (error) {
            console.error("Error creating leave:", error);
            setErrorMessage("Failed to create leave");
        }
    };

    
    

        useEffect(() => {
         
        }, []);
        */


import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import EmptyNavArea from "../components/EmptyNavArea";
import { useStaffAuthContext } from '../hooks/useStaffAuthContext';
import { jwtDecode } from "jwt-decode";

const CreateLeave = () => {

    const { user } = useStaffAuthContext();
    //get user id from token
    let smid;
    if (user) {
        const userInfo = jwtDecode(JSON.stringify(user));
        smid = userInfo.smid;
    }

    
    const navigate = useNavigate();


    const [leaveDate, setleaveDate] = useState("");
    const [leaveName, setleaveName] = useState("");
    const [leaveType, setleaveType] = useState("");
    const [leaveReason, setleaveReason] = useState("");
    const [leaveDuration, setleaveDuration] = useState("");
    const [errorMessage, setErrorMessage] = useState("");



    const onSubmit = async (e) => {

        e.preventDefault();

        //validations
        if (!leaveDate || !leaveName || !leaveType || !leaveReason || !leaveDuration) {
            setErrorMessage("Please fill out all fields.");
            return;
        };


        const data = {

            smid: smid,
            leaveDate: leaveDate,
            leaveName: leaveName,
            leaveType: leaveType,
            leaveReason: leaveReason,
            leaveDuration: leaveDuration,

        };

        try {
            const res = await axios.post("/user/userLeaves/save", data); // Adjust the URL
            if (res.data.success) {
                alert("leave created successfully!");
                navigate(-1);
            } else {
                throw new Error(res.data.error || "Failed to create leave");
            }
        } catch (error) {
            console.error("Error creating leave:", error);
            setErrorMessage("Failed to create leave");
        }
       
    };

    useEffect(() => {

    }, []);

        return (
            <>

                <EmptyNavArea />

                <main >
                    <div className="max-w-md mx-auto">
                        
                            <h1 className="text-lg font-bold mb-3">Create new leave</h1>
                            <form className="needs-validation" noValidate>

                                <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="schedule-time">
                                 Leave Date
                                </label>
                                    <input
                                        type="date"
                                        className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                        id="Date"
                                        name="LeaveDate"
                                        value={leaveDate}
                                        onChange={(e) => setleaveDate(e.target.value)}
                                        placeholder="Enter Date"
                                    />
                                </div>
                                <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="schedule-time">
                                Name
                                </label>
                                    <input
                                        type="text"
                                        className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                        id="text"
                                        name="leaveName"
                                        value={leaveName}
                                        onChange={(e) => setleaveName(e.target.value)}
                                        placeholder="Enter Name"
                                    />
                                </div>
                                <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="schedule-time">
                                Leave Type
                                </label>
                                    <input
                                        type="text"
                                        className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                        id="text"
                                        name="leaveType"
                                        value={leaveType}
                                        onChange={(e) => setleaveType(e.target.value)}
                                        placeholder="Enter Leave Type"
                                    />
                                </div>
                                <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="schedule-time">
                                Reason
                                </label>
                                    <input
                                        type="text"
                                        className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                        id="text"
                                        name="leaveReason"
                                        value={leaveReason}
                                        onChange={(e) => setleaveReason(e.target.value)}
                                        placeholder="Enter Reason"
                                    />
                                </div>
                                <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="schedule-time">
                                Duration
                                </label>
                                    <input
                                        type="text"
                                        className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                        id="text"
                                        name="leaveDuration"
                                        value={leaveDuration}
                                        onChange={(e) => setleaveDuration(e.target.value)}
                                        placeholder="Enter Leave Duration"
                                    />
                                </div>
                                <div className="mb-6 text-center">
                                <button className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2" 
                                type="submit" 
                                onClick={onSubmit}
                                >
                                    <i className="far fa-check-square"></i>
                                    <span className="ml-2">Save</span>
                                </button>
                            </div>
                                {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}
                            </form>
                        

                    </div>
                </main>
            </>

        );
     
}
 

export default CreateLeave;
