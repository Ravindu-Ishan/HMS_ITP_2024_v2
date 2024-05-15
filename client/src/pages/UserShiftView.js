import { useStaffAuthContext } from '../hooks/useStaffAuthContext';
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";



//import components here
import EmptyNavArea from "../components/EmptyNavArea";
import TopNavUser from "../components/TopNavUser";


//import icons here
import { RiEdit2Fill } from "react-icons/ri";
import { FaSearch } from "react-icons/fa";

const UserShiftView = () => {

    const { user } = useStaffAuthContext();
    //get user id from token
    let smid;
    if (user) {
    const userInfo = jwtDecode(JSON.stringify(user));
    smid = userInfo.smid;
  }


   

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



    useEffect(() => {
        retrievePosts();
    }, []);



    return (
        <>
            <div className="navarea">
                <TopNavUser />
            </div>

            <main>
                <div className="main-container">
                    {/*-----------------search bar-------------------*/}
                    <div className="flex justify-between sticky top-0 max-w-sm bg-white border border-gray-200 rounded-xl shadow pt-2 px-2 ml-auto">



                    <div className="ml-auto">
                        <input
                            className="form-control"
                            type="search"
                            placeholder="Search"
                            name="searchQuery"
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        </div>
                    </div>

                    <div>

                     {/*------------data display table--------------- */}
                     <div className="overflow-x-auto sm:rounded-lg tablestyle">
                    <table className="w-full text-sm border-separate border-spacing-x-0 border-spacing-y-2 text-gray-500 ">
                        <thead className="text-xs text-gray-700 uppercase bg-white">
                                    <tr>
                                        <th className="p-3">#</th>
                                        <th className="p-3">Schedule Time</th>
                                        <th className="p-3">Schedule Date</th>
                                        <th className="p-3">Location</th>

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

                                        <tr className="text-gray-600 bg-white hover:bg-gray-200 hover:text-black"
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
                    </div >
                </div>
            </main >
        </>
    );
};

export default UserShiftView;
