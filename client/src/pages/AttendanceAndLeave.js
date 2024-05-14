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
import TopNavAttendance from "../components/TopNavAttendance";

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
    const [search, setSearch] = useState([]); // Search state initialized with today's date

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

    

    return (
        <>
            <div className="navarea">
                <TopNavAttendance smid={smid} />
            </div>

            <main>
                
            </main>
        </>
    );
};

export default AttendanceAndLeave;
