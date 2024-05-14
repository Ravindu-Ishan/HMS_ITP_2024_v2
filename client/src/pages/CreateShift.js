import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import EmptyNavArea from "../components/EmptyNavArea";



const CreateShift = () => {

    const { smid } = useParams(); //get url parameters
    const navigate = useNavigate();

    
    const [Location, setLocation] = useState("");
    const [ScheduleTime, setScheduleTime] = useState("");
    const [ScheduleDate, setScheduleDate] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    
  
  
    const onSubmit = async (e) => {
        
        e.preventDefault();

        //validations
        if (!Location || !ScheduleTime || !ScheduleDate) {
            setErrorMessage("Please fill out all fields.");
            return;
        };

        
        if (!/^\d+$/.test(Location)) {
            setErrorMessage("Please fill out the Location field with only numbers.");
            return;
        };
     
        const data = {

            smid: smid,
            Location: Location,
            ScheduleTime: ScheduleTime,
            ScheduleDate: ScheduleDate,

        };
           
        try {
            const res = await axios.post("/shift/save", data); // Adjust the URL
            if (res.data.success) {
                alert("shift created successfully!");
                navigate(-1);
            } else {
                throw new Error(res.data.error || "Failed to create shift");
            }
        } catch (error) {
            console.error("Error creating shift:", error);
            this.setState({ errorMessage: error.message || "Failed to create shift" });
        }
    };

    
    

        useEffect(() => {
            
        }, []);

        return (
            <>

                <EmptyNavArea />

                <main >
                    <div className="max-w-md mx-auto">
                        
                            <h1 className="text-lg font-bold mb-3">Create new shift</h1>
                            <form className="needs-validation" noValidate>

                                <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="schedule-time">
                                 Schedule Time
                                </label>
                                    <input
                                        type="time"
                                        className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                        id="Time"
                                        name="Time"
                                        value={ScheduleTime}
                                        onChange={(e) => setScheduleTime(e.target.value)}
                                        placeholder="Enter Time"
                                    />
                                </div>
                                <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="schedule-time">
                                Schedule Date
                                </label>
                                    <input
                                        type="date"
                                        className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                        id="Date"
                                        name="Date"
                                        value={ScheduleDate}
                                        onChange={(e) => setScheduleDate(e.target.value)}
                                        placeholder="Enter Date"
                                    />
                                </div>
                                <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="schedule-time">
                                Location
                                </label>
                                    <input
                                        type="text"
                                        className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                        id="Location"
                                        name="Location"
                                        value={Location}
                                        onChange={(e) => setLocation(e.target.value)}
                                        placeholder="Enter Location"
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
 

export default CreateShift;
