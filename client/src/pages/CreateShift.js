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

                <main>
                    <div className="main-container">
                        <div className="col-md-8 mt-4 mx-auto">
                            <h1 className="h3 mb-3 font-weight-normal">Create new shift</h1>
                            <form className="needs-validation" noValidate>

                                <div className="form-group">
                                    <label htmlFor="Time">Schedule Time</label>
                                    <input
                                        type="time"
                                        className="form-control"
                                        id="Time"
                                        name="Time"
                                        value={ScheduleTime}
                                        onChange={(e) => setScheduleTime(e.target.value)}
                                        placeholder="Enter Time"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="Date">Schedule Date</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="Date"
                                        name="Date"
                                        value={ScheduleDate}
                                        onChange={(e) => setScheduleDate(e.target.value)}
                                        placeholder="Enter Date"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="Location">Location</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="Location"
                                        name="Location"
                                        value={Location}
                                        onChange={(e) => setLocation(e.target.value)}
                                        placeholder="Enter Location"
                                    />
                                </div>

                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit" onClick={onSubmit}>
                                    <i className="far fa-check-square"></i>
                                    &nbsp; Save
                                </button>
                                {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}
                            </form>
                        </div>

                    </div>
                </main>
            </>

        );
     
}
 

export default CreateShift;
