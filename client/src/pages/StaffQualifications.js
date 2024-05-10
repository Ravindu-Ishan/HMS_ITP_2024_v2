import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import firebaseapp from "../firebase";
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { Modal } from "react-responsive-modal";

//import components here
import LoadingComponent from "../components/LoadingComponent";
import TopNavStaff from "../components/TopNavStaff";


//import icons here
import { AiFillEye } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";

//main function
const StaffQualifications = () => {

    //get url parameters
    const { id } = useParams();

    //search
    const [search, setSearch] = useState("");

    //loading
    const [loading, setLoading] = useState(false);

    //set staff records
    const [qualifications, setQualifications] = useState([]);

    //view button handler
    const handleView = (fileLink) => {
        window.open(fileLink, "_blank");
    }

    //get staff records
    useEffect(() => {
        setLoading(true); //set loading state to true
        axios
            .get(`/qualifications/get/${id}`)
            .then((response) => {
                setQualifications(response.data.data); //.data.data because we have two parts, count and data parts in staffRoute.js
                setLoading(false); //set loading state to false
            })
            .catch((error) => {
                console.log("Error fetching qualifications:", error);
                setLoading(false);
            });
    }, []);


    return (
        <>
            <div className="navarea">
                <TopNavStaff smid={id} />
            </div>
            <main>
                <div className="main-container">
                    {loading ? (
                        <LoadingComponent />
                    ) : (
                        <div>
                            {/*------------------------------------ search bar card---------------------------------*/}
                            <div className="flex justify-between sticky top-0 max-w bg-white border border-gray-200 rounded-xl shadow pt-2 px-5 pb-5 ">


                                {/*------------------------------------Search bar---------------------------------*/}
                                <div className="mt-2 text-gray-500">User Qualifications</div>
                                <div className="mt-2">
                                    <div>
                                        <form className=' border-b-2 border-b-gray-300'>
                                            <input type='text' placeholder='Search' onChange={(e) => setSearch(e.target.value)} className=" focus:outline-none" />

                                            <FaSearch className="inline-flex text-gray-500" />

                                        </form>
                                    </div>
                                </div>
                            </div >

                            {/*------------------------------------Data display table--------------------------------*/}
                            < div className="overflow-x-auto sm:rounded-lg tablestyle" >
                                <table className="w-full text-sm border-separate border-spacing-x-0 border-spacing-y-2 text-gray-500 ">
                                    <thead className="text-xs text-gray-700 uppercase bg-white">
                                        <tr>
                                            <th className="p-3"></th>
                                            <th className="p-3">Qualification</th>
                                            <th className="p-3">Qualification Description</th>
                                            <th className="p-3">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {qualifications.filter((item) => {
                                            return search.toLowerCase() === '' ?
                                                item :
                                                item.docName.toLowerCase().includes(search)
                                                || item.docDescription.includes(search)

                                        }).map((item, index) => (
                                            <tr
                                                className="text-gray-600 bg-white hover:bg-gray-200 hover:text-black"
                                                key={item._id}
                                            >
                                                <td className="text-center">{index + 1}</td>
                                                <td className="text-center">{item.docName}</td>
                                                <td className="text-center">{item.docDescription}</td>
                                                <td className="text-center">
                                                    <button className="ml-2 hover:text-gray-800" onClick={() => handleView(item.docPath)}><AiFillEye className="inline-flex mb-1" />View</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div >
                    )}
                </div >
            </main >
        </>
    );
};

export default StaffQualifications;
