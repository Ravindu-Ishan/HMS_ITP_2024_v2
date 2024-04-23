import React, { useState } from 'react'
import axios from "axios";
import { Modal } from "react-responsive-modal";

//import components here
import LoadingComponent from "../components/LoadingComponent";
import PrimaryBtn from "../components/PrimaryBtn";
import CancelBtn from "../components/CancelBtn";
import ConfirmPopUp from "../components/ConfirmPopUp";
import ModelTemplate from "../components/ModelTemplate";

//import icons
import { MdDelete } from "react-icons/md";
import { TiUserDelete } from "react-icons/ti";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";


function StaffActionsTab3({ smid }) {

    //id
    const { id } = smid;

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


    //
    const onPasswordResetConfirm = () => {
        setLoading(true);
        const data = {
            newPassword
        }
        axios.put(`/account/updatepassword/${id}`, data).then((response) => {
            alert(response.data.message);
            setLoading(false)
        }).catch((error) => {
            setLoading(false)
            console.log(error)
        });


    }



    const ResetPassBtnHandler = () => {
        setModelOpen1(true);
    }

    const DeleteAccBtnHandler = () => {
        setModelOpen2(true);
    }
    const DeleteMemberBtnHandler = () => {
        setModelOpen2(true);
    }

    const closeModal1 = () => {
        setModelOpen1(false);
        setNewPassword('');
    }




    return (

        <>
            <div>
                <ul>
                    <li>
                        <div className='inline-flex text-gray-500 hover:text-gray-800'>
                            <button className='inline-flex' onClick={ResetPassBtnHandler}>
                                <RiLockPasswordFill className='mr-2 mt-1' /><p className='text-lg font-medium'>Reset Account Password</p>
                            </button>
                        </div>
                    </li>
                    <li>
                        <div className='inline-flex text-red-400 hover:text-red-600'>
                            <button className='inline-flex'>
                                <TiUserDelete className='mr-2 mt-1 text-lg' /><p className='text-lg font-medium'>Delete Login Account Only</p>
                            </button>
                        </div>
                    </li> <li>
                        <div className='inline-flex text-red-400 hover:text-red-600'>
                            <button className='inline-flex'>
                                <MdDelete className='mr-2 mt-1 text-lg' /><p className='text-lg font-medium'>Delete Staff Memeber</p>
                            </button>
                        </div>
                    </li>
                </ul>

            </div>


            <div>
                <Modal open={modelState1} onClose={closeModal1}
                    classNames={{
                        overlay: "customOverlay",
                        modal: "customModal",
                    }}
                    closeOnOverlayClick={false}
                    center={true}>

                    {loading ? (
                        <LoadingComponent />
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


        </>

    )
}

export default StaffActionsTab3