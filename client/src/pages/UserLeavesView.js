import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import { useStaffAuthContext } from '../hooks/useStaffAuthContext';
import { jwtDecode } from "jwt-decode";


//import components here
import EmptyNavArea from "../components/EmptyNavArea";
import TopNavUser from "../components/TopNavUser";


//import icons here
import { RiEdit2Fill } from "react-icons/ri";
import { FaSearch } from "react-icons/fa";

const UserLeavesView = () => {

    const { user } = useStaffAuthContext();
    //get user id from token
    let smid;
    if (user) {
    const userInfo = jwtDecode(JSON.stringify(user));
    smid = userInfo.smid;
    }

    

    const [leaveEntries, setLeaveEntries] = useState([]); //posts array state

    const navigate = useNavigate(); //navigate state

    const [search, setSearch] = useState(""); //search state

    //method to retrieve leaves
    const retrieveLeaves = () => {

       

        axios.get(`/user/userLeaves/getonly/${smid}`).then(res => {

          setLeaveEntries(res.data.data);

        }).catch((error) => {
            console.log("Error fetching staff details:", error);
        });
    }

    //method to delete leaves
    const onDelete = (id) => {
        axios.delete(`/user/userLeaves/delete/${id}`).then((res) => {
            alert("Deleted Successfully");
            retrieveLeaves();
        })
    }



    useEffect(() => {
      retrieveLeaves();
    }, []);



    return (
        <>
             <div className="navarea">
                <TopNavUser />
            </div>

            <main>
                
                {/*----------------------------search bar----------------------------------- */}
                    <div className="flex justify-between sticky top-0 max-w bg-white border border-gray-200 rounded-xl shadow pt-2 px-2">
                    <button type="button"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2"
                        onClick={() => navigate(`/user/userLeaves/create/${smid}`)}>
                        Create New
                    </button>  
                        <input
                            className="form-control"
                            type="search"
                            placeholder="Search"
                            name="searchQuery"
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

               

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
                                <th className="p-3">Action</th>
                                <th className="p-3">Status</th>
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
                                 key={leaves._id}>

                                    <td className="text-center py-2 px-4">
                                        <Link to={`/user/userLeaves/${leaves._id}`}> {index + 1}</Link>
                                    </td>
                                    <td className="text-center py-2 px-4">{leaves.leaveDate}</td>
                                    <td className="text-center py-2 px-4">{leaves.leaveName}</td>
                                    <td className="text-center py-2 px-4">{leaves.leaveType}</td>
                                    <td className="text-center py-2 px-4">{leaves.leaveReason}</td>
                                    <td className="text-center py-2 px-4">{leaves.leaveDuration}</td>

                                    <td>
                                        <div class="flex space-x-4">
                                            <Link className=" text-blue-700 " to={`/user/userLeaves/edit/${leaves._id}`}>
                                                <i className="fas fa-edit"></i>&nbsp;Edit
                                            </Link>
                                            <button className=" text-blue-700 " href="#" onClick={() => onDelete(leaves._id)}>
                                                <i className="fas fa-trash-alt"></i>&nbsp;Delete
                                            </button>  &nbsp;
                                        </div>
                                    </td>
                                    
                                </tr>

                            ))}
                        </tbody>
                    </table>
                    
                </div>
            </main >
        </>
    );
};

export default UserLeavesView;
