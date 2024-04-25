import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";

//import components here
import EmptyNavArea from "../components/EmptyNavArea";
import TopNavAttendance from "../components/TopNavAttendance";

//import icons here
import { RiEdit2Fill } from "react-icons/ri";
import { FaSearch } from "react-icons/fa";

const AttendanceAndLeave = () => {
 
    const [search, setSearch] = useState(""); //search state
    const [posts, setPosts] = useState([]); //posts array state

    useEffect(() => {
       
    }, []);
    

    return (

         <>
         <div className="navarea">
         <TopNavAttendance/>
         </div>

         <main>

            {/*------------data display table--------------- */}
            <div className="overflow-x-auto sm:rounded-lg tablestyle">
             <table className="w-full text-sm border-separate border-spacing-x-0 border-spacing-y-2 text-gray-500 ">
                        <thead className="text-xs text-gray-700 uppercase bg-white">
                            <tr>
                                <th className="p-3">Name</th>
                                <th className="p-3">Location</th>
                                <th className="p-3">Date</th>
                                <th className="p-3">Shift Time</th>
                                <th className="p-3">Arrival Time</th>
                                <th className="p-3">Attendance</th>
                            </tr>
                        </thead>
                        <tbody>
                        {posts.filter((shift) => {
                                return search.toLowerCase() === '' ?
                                    shift :
                                    shift.Location.includes(search) ||
                                    shift.ScheduleTime.includes(search) ||
                                    shift.ScheduleDate.includes(search)
                            }).map((shift, index) => (
                                <tr 
                                className="text-gray-600 bg-white hover:bg-gray-200 hover:text-black"
                                key={shift._id}>

                                    <td className="text-center py-2 px-4">
                                        <Link to={`/shift/${shift._id}`}> {index + 1}</Link>
                                    </td>
                                    <td className="text-center py-2 px-4">{shift.ScheduleTime}</td>
                                    <td className="text-center py-2 px-4">{shift.ScheduleDate}</td>
                                    <td className="text-center py-2 px-4">{shift.Location}</td>
                                </tr>

                            ))}
                        </tbody>
                        
        </table>
        </div>
        </main>
        </>
    );
};

export default AttendanceAndLeave;
