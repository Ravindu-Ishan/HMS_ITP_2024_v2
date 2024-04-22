import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";

//import components here
import EmptyNavArea from "../components/EmptyNavArea";


//import icons here
import { RiEdit2Fill } from "react-icons/ri";
import { FaSearch } from "react-icons/fa";

const AttendanceAndLeave = () => {
 

    

    return (

        
        <table className="table table-hover" style={{ marginTop: '40px' }}>
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Location</th>
                                <th scope="col">Date</th>
                                <th scope="col">Shift Time</th>
                                <th scope="col">Arrival Time</th>
                                <th scope="col">Attendance</th>
                            </tr>
                        </thead>
        </table>
    );
};

export default AttendanceAndLeave;
