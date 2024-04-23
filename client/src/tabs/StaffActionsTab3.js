import React, { useState } from 'react'
import axios from "axios";
import { Modal } from "react-responsive-modal";

//import components here
import LoadingComponent from "../components/LoadingComponent";
import PrimaryBtn from "../components/PrimaryBtn";
import CancelBtn from "../components/CancelBtn";

//import icons
import { MdDelete } from "react-icons/md";
import { TiUserDelete } from "react-icons/ti";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";


function StaffActionsTab3({ smid }) {

    //id
    const id = smid;

    //model open close state
    const [modelState1, setModelOpen1] = useState(false);
    const [modelState2, setModelOpen2] = useState(false);
    const [modelState3, setModelOpen3] = useState(false);

    //loading state
    const [loading, setLoading] = useState(false);

    //passwordState
    const [newPassword, setNewPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    //password show icon
    const [type, setType] = useState('password');
    const [icon, setIcon] = useState(FaEyeSlash);



    //show password toggle
    const handleshowPassToggle = () => {
        if (type === 'password') {
            setIcon(FaEye);
            setType('text')
        } else {
            setIcon(FaEyeSlash)
            setType('password')
        }
    }


    const ResetPassBtnHandler = () => {
        axios.get(`/account/available/${id}`).then((response) => {
            if (response.data == false) {
                alert("There is no user account for the current staff profile. Please create one.");
            }
            else {
                setModelOpen1(true);
            }
        }).catch((error) => {
            console.log(error);
        })


    }

    const DeleteAccBtnHandler = () => {
        axios.get(`/account/available/${id}`).then((response) => {
            if (response.data == false) {
                alert("There is no user account for the current staff profile. Please create one.");
            }
            else {
                setModelOpen2(true);
            }
        }).catch((error) => {
            console.log(error);
        })

    }

    //reset password confirm handler
    const onPasswordResetConfirm = () => {
        setLoading(true);
        const data = {
            newPassword,
        }
        axios.put(`/account/updatepassword/${id}`, data).then((response) => {
            alert(response.data.message);
            setLoading(false);
            closeModal1();
        }).catch((error) => {
            alert("Something went wrong, please check console")
            setLoading(false)
            console.log(error)
        });


    }

    //delete user account handler
    const accountDeleteConfirm = () => {
        setLoading(true);
        axios.delete(`/account/delete/${id}`).then((response) => {
            alert(response.data.message);
            setLoading(false);
            closeModal2();
            window.location.reload();
        }).catch((error) => {
            alert("Something went wrong, please check console")
            setLoading(false)
            console.log(error)
        });

    }


    const DeleteMemberBtnHandler = () => {
        setModelOpen3(true);
    }

    const closeModal1 = () => {
        setModelOpen1(false);
        setNewPassword('');
    }

    const closeModal2 = () => {
        setModelOpen2(false);
    }


    return (

        <div>
            <ul>
                <div>
                    <li>
                        <div className='inline-flex text-gray-500 hover:text-gray-800'>
                            <button className='inline-flex' onClick={ResetPassBtnHandler}>
                                <RiLockPasswordFill className='mr-2 mt-1' /><p className='text-lg font-medium'>Reset Account Password</p>
                            </button>
                        </div>
                    </li>
                    <li>
                        <div className='inline-flex text-red-400 hover:text-red-600'>
                            <button className='inline-flex' onClick={DeleteAccBtnHandler}>
                                <TiUserDelete className='mr-2 mt-1 text-lg' /><p className='text-lg font-medium'>Delete Login Account Only</p>
                            </button>
                        </div>
                    </li>
                </div >
                <li>
                    <div className='inline-flex text-red-400 hover:text-red-600'>
                        <button className='inline-flex'>
                            <MdDelete className='mr-2 mt-1 text-lg' /><p className='text-lg font-medium'>Delete Staff Memeber</p>
                        </button>
                    </div>
                </li>
            </ul >



            {/*Password Reset Modal*/}

            <div>
                <Modal open={modelState1} onClose={closeModal1}
                    classNames={{
                        overlay: "customOverlay",
                        modal: "customModal",
                    }}
                    closeOnOverlayClick={false}
                    center={true}>

                    {loading ? (
                        <div className='p-20'>
                            <LoadingComponent />
                        </div>
                    ) : (
                        <div>
                            <h2 id="my-modal-title">Reset Account Password</h2>
                            <div className='p-20'>
                                <form className='max-w mx-auto'>
                                    <div className="relative z-0 w-full mb-5 group">
                                        <div className="md:flex md:items-center" >
                                            <div className=" md:w-1/5">
                                                <label
                                                    className="block text-gray-600 font-bold md:text-left mb-1 md:mb-0 ">
                                                    Password
                                                </label>
                                            </div>
                                            <div className=" relative flex items-center justify-center md:w-2/3">
                                                <input
                                                    className=" w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none disabled:border-0 border-b-2 border-gray-200"
                                                    type={type}
                                                    value={newPassword}
                                                    onChange={(e) => setNewPassword(e.target.value)}

                                                />
                                                <button type="button" onClick={handleshowPassToggle}>
                                                    {icon}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='flex justify-end'>
                                        <CancelBtn onClick={closeModal1} btntitle={"Cancel"} />
                                        <PrimaryBtn onClick={onPasswordResetConfirm} btntitle={'Reset'} />
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </Modal>

            </div>

            {/*Account Delete Modal*/}

            <div >
                <Modal
                    open={modelState2}
                    onClose={closeModal2}
                    classNames={{
                        overlay: "customOverlay",
                        modal: "customModal",
                    }}
                    closeOnOverlayClick={false}
                    center={true}
                    aria-labelledby="my-modal-title"
                    aria-describedby="my-modal-description"
                >
                    <div className="p-4 md:p-5 text-center">
                        <svg className="mx-auto mb-4 text-gray-400 w-12 h-12" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        <h3 className="mb-5 text-lg font-normal text-gray-700">This action will delete the user account related this Staff Member, doing so will remove access to the system from the user. Their information will still be available. Do you wish to continue ?</h3>

                        <div className=" inline-flex">
                            <div className="mr-2">
                                <button type="button" onClick={accountDeleteConfirm} className="py-2.5 px-5 text-sm font-medium rounded-3xl text-white focus:outline-none bg-blue-700  hover:bg-blue-800">
                                    Yes, Confirm
                                </button>
                            </div>
                            <div>
                                <button type="button" onClick={closeModal2} className=" py-2.5 px-5 text-sm font-medium rounded-3xl text-white bg-red-600 hover:bg-red-800   ">
                                    No, Cancel
                                </button>
                            </div>
                        </div>

                    </div>
                </Modal>
            </div >


        </div>

    )
}

export default StaffActionsTab3