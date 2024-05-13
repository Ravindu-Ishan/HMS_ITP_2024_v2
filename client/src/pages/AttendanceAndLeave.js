import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import { useStaffAuthContext } from '../hooks/useStaffAuthContext';
import { jwtDecode } from "jwt-decode";

// Import components here
import EmptyNavArea from "../components/EmptyNavArea";
import TopNavStaff from "../components/TopNavStaff";

// Import icons here
import { RiEdit2Fill } from "react-icons/ri";
import { FaSearch } from "react-icons/fa";

const AttendanceAndLeave = () => {
    const { user } = useStaffAuthContext();
    // Get user id from token
    let smid;
    if (user) {
        const userInfo = jwtDecode(JSON.stringify(user));
        smid = userInfo.smid;
    }

    const [posts, setPosts] = useState([]); // Posts array state
    const navigate = useNavigate(); // Navigate state
    const [search, setSearch] = useState(getTodayDate()); // Search state initialized with today's date

    // Method to retrieve shifts
    const retrievePosts = () => {
        axios.get(`/shift/getonly/${smid}`).then(res => {
            setPosts(res.data.data);
        }).catch((error) => {
            console.log("Error fetching staff details:", error);
        });
    };

    useEffect(() => {
        retrievePosts();
    }, []);

    // Get today's full date
    const getTodayDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = (today.getMonth() + 1).toString().padStart(2, '0');
        const day = today.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    return (
        <>
            <div className="navarea">
                <TopNavStaff smid={smid} />
            </div>

            <main>
                {/* Date input field with today's date */}
                <input
                    type="date"
                    className="border p-2 rounded-md mb-4"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    max={getTodayDate()} // Set max date to today's date
                />

                {/* Data display table */}
                <div className="overflow-x-auto sm:rounded-lg tablestyle">
                    <table className="w-full text-sm border-separate border-spacing-x-0 border-spacing-y-2 text-gray-500 ">
                        <thead className="text-xs text-gray-700 uppercase bg-white">
                            <tr>
                                <th className="p-3">#</th>
                                <th className="p-3">Schedule Time</th>
                                <th className="p-3">Schedule Date</th>
                                <th className="p-3">Location</th>
                                <th className="p-3">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {posts.filter((shift) => {
                                return search.toLowerCase() === '' ?
                                    shift :
                                    shift.ScheduleDate.includes(search)
                            }).map((shift, index) => (
                                <tr className="text-gray-600 bg-white hover:bg-gray-200 hover:text-black" key={shift._id}>
                                    <td className="text-center py-2 px-4">
                                        <Link to={`/shift/${shift._id}`}>{index + 1}</Link>
                                    </td>
                                    <td className="text-center py-2 px-4">{shift.ScheduleTime}</td>
                                    <td className="text-center py-2 px-4">{shift.ScheduleDate}</td>
                                    <td className="text-center py-2 px-4">{shift.Location}</td>
                                    <td>
                                        <div class="flex space-x-4">
                                            <Link className="text-blue-700" to={`/shift/edit/${shift._id}`}>
                                                <i className="fas fa-edit"></i>&nbsp;Edit
                                            </Link>
                                        </div>
                                    </td>
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
