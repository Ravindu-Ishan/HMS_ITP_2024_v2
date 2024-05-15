import { useStaffAuthContext } from '../hooks/useStaffAuthContext';
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";



//import components here
import EmptyNavArea from "../components/EmptyNavArea";
import TopNavUser from "../components/TopNavUser";
import TopNavAttendance from '../components/TopNavAttendance';


//import icons here
import { RiEdit2Fill } from "react-icons/ri";
import { FaSearch } from "react-icons/fa";

const Leaves = () => {

    const { user } = useStaffAuthContext();
    //get user id from token
    let smid;
    if (user) {
        const userInfo = jwtDecode(JSON.stringify(user));
        smid = userInfo.smid;
    }


    const [leaveEntries, setLeaveEntries] = useState([]);  //posts array state

    const navigate = useNavigate(); //navigate state

    const [search, setSearch] = useState(""); //search state

    const [actions, setActions] = useState({}); // state for actions

    //method to retrieve leaves
    const retrieveLeaves = () => {

        axios.get(`/user/userLeaves`).then(res => {

            setLeaveEntries(res.data.existingLeaves);

        }).catch((error) => {
            console.log("Error fetching staff details:", error);
        });
    }


    useEffect(() => {
        retrieveLeaves();
    }, []);

    // Handle change for radio buttons
    const handleActionChange = (leaveId, action) => {
        setActions({
            ...actions,
            [leaveId]: action
        });
    };


    const acceptBtnHandler = (id) => {

        const status = 'Accepted'
        const data = {
            leaveStatus: status
        }

        axios.put(`/user/userLeaves/update/${id}`, data).then(res => {
            retrieveLeaves()
        }).catch((error) => {
            console.log("Error fetching staff details:", error);
        });

    }

    const declineBtnHandler = (id) => {

        const status = 'Declined'
        const data = {
            leaveStatus: status
        }

        axios.put(`/user/userLeaves/update/${id}`, data).then(res => {
            retrieveLeaves()
        }).catch((error) => {
            console.log("Error fetching staff details:", error);
        });
    }


    return (
        <>
            <div className="navarea">
                <TopNavAttendance />
            </div>

            <main>
                <div className="main-container">
                    <div className="flex justify-between sticky top-0 max-w bg-white border border-gray-200 rounded-xl shadow pt-2 px-2">
                        <input
                            className="form-control"
                            type="search"
                            placeholder="Search"
                            name="searchQuery"
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    <div>
                        {/*------------data display table--------------- */}
                        <div className="overflow-x-auto sm:rounded-lg tablestyle">
                            <table className="w-full text-sm border-separate border-spacing-x-0 border-spacing-y-2 text-gray-500 ">
                                <thead className="text-xs text-gray-700 uppercase bg-white">
                                    <tr>
                                        <th className="p-3">#</th>
                                        <th className="p-3">Date</th>
                                        <th className="p-3">Name</th>
                                        <th className="p-3">Leave Type</th>
                                        <th className="p-3">Reason</th>
                                        <th className="p-3">Duration</th>
                                        <th className="p-3">Status</th>
                                        <th className="p-3">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {leaveEntries.filter((leaves) => {
                                        return search.toLowerCase() === '' ?
                                            leaves :
                                            leaves.leaveDate.includes(search) ||
                                            leaves.leaveName.includes(search) ||
                                            leaves.leaveType.includes(search) ||
                                            leaves.leaveReason.includes(search) ||
                                            leaves.leaveDuration.includes(search)
                                    }).map((leaves, index) => (
                                        <tr
                                            className="text-gray-600 bg-white hover:bg-gray-200 hover:text-black"
                                            key={leaves._id}
                                        >
                                            <td className="text-center py-2 px-4">
                                                <Link to={`/user/userLeaves/${leaves._id}`}> {index + 1}</Link>
                                            </td>
                                            <td className="text-center py-2 px-4">{leaves.leaveDate}</td>
                                            <td className="text-center py-2 px-4">{leaves.leaveName}</td>
                                            <td className="text-center py-2 px-4">{leaves.leaveType}</td>
                                            <td className="text-center py-2 px-4">{leaves.leaveReason}</td>
                                            <td className="text-center py-2 px-4">{leaves.leaveDuration}</td>
                                            <td className="text-center py-2 px-4">{leaves.leaveStatus}</td>
                                            <td className="text-center py-2 px-4">
                                                <div className="flex justify-center items-center">
                                                    <button type='button' className="text-blue-500 font-medium px-1" onClick={() => acceptBtnHandler(leaves._id)} >Accept</button>
                                                    <button type='button' onClick={() => declineBtnHandler(leaves._id)} className="text-red-500 font-medium px-5">Decline</button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};
export default Leaves;
