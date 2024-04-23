import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import { useStaffAuthContext } from '../hooks/useStaffAuthContext';
import { jwtDecode } from "jwt-decode";


//import components here
import EmptyNavArea from "../components/EmptyNavArea";
import TopNavStaff from "../components/TopNavStaff";


//import icons here
import { RiEdit2Fill } from "react-icons/ri";
import { FaSearch } from "react-icons/fa";

const ShiftMain = () => {

    const { smid } = useParams(); //get url parameters 

    const [posts, setPosts] = useState([]); //posts array state

    const navigate = useNavigate(); //navigate state

    const [search, setSearch] = useState(""); //search state

    //method to retrieve shifts
    const retrievePosts = () => {

        axios.get(`/shift/getonly/${smid}`).then(res => {

            setPosts(res.data.data);

        }).catch((error) => {
            console.log("Error fetching staff details:", error);
        });
    }

    //method to delete shift
    const onDelete = (id) => {
        axios.delete(`/shift/delete/${id}`).then((res) => {
            alert("Deleted Successfully");
            retrievePosts();
        })
    }



    useEffect(() => {
        retrievePosts();
    }, []);



    return (
        <>
            <div className="navarea">
                <TopNavStaff smid={smid} />
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
                </div>

                {/*------------data display table--------------- */}
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
                                    shift.Location.includes(search) ||
                                    shift.ScheduleTime.includes(search) ||
                                    shift.ScheduleDate.includes(search)
                            }).map((shift, index) => (
                                <tr key={shift._id}>
                                    <td>
                                        <Link to={`/shift/${shift._id}`}> {index + 1}</Link>
                                    </td>
                                    <td>{shift.ScheduleTime}</td>
                                    <td>{shift.ScheduleDate}</td>
                                    <td>{shift.Location}</td>

                                    <td>
                                        <div class="flex space-x-4">
                                            <Link className=" text-blue-700 " to={`/shift/edit/${shift._id}`}>
                                                <i className="fas fa-edit"></i>&nbsp;Edit
                                            </Link>
                                            <button className=" text-blue-700 " href="#" onClick={() => onDelete(shift._id)}>
                                                <i className="fas fa-trash-alt"></i>&nbsp;Delete
                                            </button>  &nbsp;
                                        </div>
                                    </td>
                                </tr>

                            ))}
                        </tbody>
                    </table>

                    <button type="button"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => navigate(`/shift/create/${smid}`)}>
                        Create New
                    </button>

                </div>
            </main >
        </>
    );
};

export default ShiftMain;
