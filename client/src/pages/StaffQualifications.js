import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import firebaseapp from "../firebase";
import { getStorage, ref, uploadBytes, uploadBytesResumable } from "firebase/storage";

//import components here
import LoadingComponent from "../components/LoadingComponent";
import ModelTemplate from "../components/ModelTemplate";
import PrimaryBtn from "../components/PrimaryBtn";
import TopNavStaff from "../components/TopNavStaff";

//import icons here
import { RiEdit2Fill } from "react-icons/ri";
import { FaSearch } from "react-icons/fa";

//main function
const StaffQualifications = () => {

    //get url parameters
    const { id } = useParams();

    //modal states
    const [open, setOpen] = useState(false);

    //functions for model
    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);


    //qualification details states
    const [document, setDocument] = useState(undefined);
    const [docName, setDocName] = useState("");
    const [docDescription, setDocDescription] = useState("");
    const [docPath, setDocPath] = useState("");
    const [uploadPerc, setUploadPerc] = useState(0);

    const uploadFile = (file) => {
        const storage = getStorage(firebaseapp);
        const storageRef = ref(storage, 'qualification/' + file.name);
        const uploadTask = uploadBytesResumable(storageRef, file);
    }

    const handleCancel = () => {
        onCloseModal();

        //delete file from firebase if file was uploaded

        //cancel file upload if uploading

    }

    //search
    const [search, setSearch] = useState("");

    //navigate
    const navigate = useNavigate();

    //loading
    const [loading, setLoading] = useState(false);

    //set staff records
    const [qualifications, setQualifications] = useState([]);


    // 'file' comes from the Blob or File API
    uploadBytes(storageRef, file).then((snapshot) => {
        console.log('Uploaded a blob or file!');
    });

    //get staff records
    useEffect(() => {
        setLoading(true); //set loading state to true
        axios
            .get("/get/qualifications")
            .then((response) => {
                setQualifications(response.data.data); //.data.data because we have two parts, count and data parts in staffRoute.js
                setLoading(false); //set loading state to false
            })
            .catch((error) => {
                console.log("Error fetching qualifications:", error);
                setLoading(false);
            });
    }, []);

    //create new staff record method
    const handleNewFile = (e) => {
        e.preventDefault();
        const data = {
            docName,
            docDescription,
            docPath,
        };
        setLoading(true);
        axios
            .post("/upload/qualification", data)
            .then((response) => {
                setLoading(false);
                setQualifications([...qualifications, response.data]);
                navigate("/qualifications");
            })
            .catch((error) => {
                setLoading(false);
                alert("An error happened. Please check console");
                console.log(error);
            });
    };

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
                            {/*------------------------------------Create new qualification button, pop up model and search bar card---------------------------------*/}
                            <div className="flex justify-between sticky top-0 max-w bg-white border border-gray-200 rounded-xl shadow pt-2 px-2">

                                <div>
                                    <button
                                        onClick={onOpenModal}
                                        type="button"
                                        className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2"
                                    >
                                        Create New
                                    </button>

                                    <Modal
                                        open={open}
                                        onClose={onCloseModal}
                                        showCloseIcon={false}
                                        closeOnEsc={false}
                                        classNames={{
                                            overlay: "customOverlay",
                                            modal: "customModal",
                                        }}
                                        closeOnOverlayClick={false}
                                        center={true}
                                        aria-labelledby="my-modal-title"
                                        aria-describedby="my-modal-description"
                                    >
                                        <h2 id="my-modal-title">Add New Qualification</h2>


                                        <div className="pt-5">
                                            <form className="max-w-sm mx-auto" action="/profile" encType="multipart/form-data">

                                                <div className="relative z-0 w-full mb-5 group">
                                                    <input
                                                        type="text"
                                                        name="docName"
                                                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-600 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                                        placeholder=" "
                                                        value={docName}
                                                        onChange={(e) => setDocName(e.target.value)}
                                                    />
                                                    <label
                                                        htmlFor="docName"
                                                        className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                                    >
                                                        Qualification name:
                                                    </label>
                                                </div>

                                                <div className="relative z-0 w-full mb-5 group">
                                                    <input
                                                        type="text"
                                                        name="docDescription"
                                                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-600 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                                        placeholder=" "
                                                        value={docName}
                                                        onChange={(e) => setDocDescription(e.target.value)}
                                                    />
                                                    <label
                                                        htmlFor="docDescription"
                                                        className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                                    >
                                                        Qualification Description:
                                                    </label>
                                                </div>

                                                <div className="relative z-0 w-full mb-5 group">
                                                    <input type="file" name="qualification-file" className="bg-none" accept=".pdf" value={document} onChange={(e) => setDocument(e.target.value)} />
                                                </div>


                                                <div className="text-right">
                                                    <CancelBtn
                                                        btntitle={"Cancel"}
                                                        onClick={handleCancel}
                                                    ></CancelBtn>
                                                    <PrimaryBtn
                                                        btntitle={"Submit"}
                                                        onClick={handleNewFile}
                                                    ></PrimaryBtn>
                                                </div>
                                            </form>
                                        </div>

                                    </Modal>
                                </div>























                                {/*------------------------------------Search bar---------------------------------*/}
                                <div className="mt-2">
                                    <div>
                                        <form className=' border-b-2 border-b-gray-300'>
                                            <input type='text' placeholder='Search' onChange={(e) => setSearch(e.target.value)} className=" focus:outline-none" />
                                            <span className="absolute inset-y-0 end-0 grid place-content-center px-4 text-gray-500">
                                                <FaSearch />
                                            </span>
                                        </form>
                                    </div>
                                </div>
                            </div>

                            {/*------------------------------------Data display table--------------------------------*/}
                            <div className="overflow-x-auto sm:rounded-lg tablestyle">
                                <table className="w-full text-sm border-separate border-spacing-x-0 border-spacing-y-2 text-gray-500 ">
                                    <thead className="text-xs text-gray-700 uppercase bg-white">
                                        <tr>
                                            <th className="p-3"></th>
                                            <th className="p-3">NIC</th>
                                            <th className="p-3">Full Name</th>
                                            <th className="p-3">Role/Position</th>
                                            <th className="p-3">Action</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {qualifications.filter((item) => {
                                            return search.toLowerCase() === '' ?
                                                item :
                                                item.staffName.toLowerCase().includes(search)
                                                || item.staff_NIC.includes(search)
                                                || item.role.toLowerCase().includes(search)
                                        }).map((staff, index) => (
                                            <tr
                                                className="text-gray-600 bg-white hover:bg-gray-200 hover:text-black"
                                                key={staff._id}
                                            >
                                                <td className="text-center">{index + 1}</td>
                                                <td className="text-center">{staff.staff_NIC}</td>
                                                <td>{staff.staffName}</td>
                                                <td className="text-center">{staff.role}</td>
                                                <td className="text-center">
                                                    <Link
                                                        className=" text-blue-700 "
                                                        to={`profile/${staff._id}`}
                                                    >
                                                        <RiEdit2Fill className="inline-block" />
                                                        <p className="inline-block">Edit</p>
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </>
    );
};

export default StaffQualifications;