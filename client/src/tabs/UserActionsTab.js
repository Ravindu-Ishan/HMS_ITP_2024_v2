import React, { useEffect, useState } from 'react'
import axios from "axios";
import { Modal } from "react-responsive-modal";

import { useStaffAuthContext } from '../hooks/useStaffAuthContext'; //context hook
import { jwtDecode } from "jwt-decode";


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


function UserActionsTab() {

    const { user } = useStaffAuthContext();
    const [isDisabled, setIsDisabled] = useState(true); //form activation state


    //get user id from token
    let id;
    if (user) {
        const userInfo = jwtDecode(JSON.stringify(user));
        id = userInfo.smid;
    }

    //passwordState
    const [previousPassword, setPreviousPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    //password message state
    const [message, setMessage] = useState("");


    //password show icon1
    const [type1, setType1] = useState('password');
    const [icon1, setIcon1] = useState(FaEyeSlash);

    //password show icon2
    const [type2, setType2] = useState('password');
    const [icon2, setIcon2] = useState(FaEyeSlash);

    //password show icon3
    const [type3, setType3] = useState('password');
    const [icon3, setIcon3] = useState(FaEyeSlash);

    //model open close state
    const [modelState1, setModelOpen1] = useState(false);

    //loading state
    const [loading, setLoading] = useState(false);

    //show password toggle
    const handleshowPassToggle1 = () => {
        if (type1 === 'password') {
            setIcon1(FaEye);
            setType1('text')
        } else {
            setIcon1(FaEyeSlash)
            setType1('password')
        }
    }

    //show password toggle
    const handleshowPassToggle2 = () => {
        if (type2 === 'password') {
            setIcon2(FaEye);
            setType2('text')
        } else {
            setIcon2(FaEyeSlash)
            setType2('password')
        }
    }

    //show password toggle
    const handleshowPassToggle3 = () => {
        if (type3 === 'password') {
            setIcon3(FaEye);
            setType3('text')
        } else {
            setIcon3(FaEyeSlash)
            setType3('password')
        }
    }

    const ResetPassBtnHandler = () => {
        setModelOpen1(true);
    }

    //reset password confirm handler
    const onPasswordChangeConfirm = (e) => {
        e.preventDefault();
        setLoading(true);


        if (newPassword != confirmPassword) {
            setMessage("Passwords do not match");
            setLoading(false)
        }
        if (newPassword == confirmPassword) {
            const data1 = {
                previousPassword,
            }
            axios.post(`/account/password/compare/${id}`, data1).then((response) => {
                if (response.data) {
                    const data2 = {
                        newPassword,
                    }
                    axios.put(`/account/updatepassword/${id}`, data2).then((response) => {
                        alert(response.data.message);
                        setLoading(false);
                        closeModal1();
                    }).catch((error) => {
                        alert("Something went wrong, please check console")
                        setLoading(false)
                        console.log(error)
                    });
                }
                if (!response.data) {
                    setMessage("Previous Password is incorrect");
                    setLoading(false)
                }
            }).catch((error) => {
                alert("Something went wrong, please check console")
                setLoading(false)
                console.log(error)
            });


        }

    }

    const closeModal1 = () => {
        setModelOpen1(false);
        setConfirmPassword('');
        setPreviousPassword('');
        setNewPassword('');
        setMessage('');
    }


    return (
        <>
            <div>
                <div className='inline-flex text-gray-500 hover:text-gray-800'>
                    <button className='inline-flex' onClick={ResetPassBtnHandler}>
                        <RiLockPasswordFill className='mr-2 mt-1' /><p className='text-lg font-medium'>Change Account Password</p>
                    </button>
                </div>
            </div>

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
                            <h2 id="my-modal-title">Change Account Password</h2>
                            <div className='p-20'>
                                <form className='max-w'>
                                    <div className="z-0 w-full mb-5">
                                        <div className="flex-row" >

                                            <div className="flex pb-5">
                                                <label
                                                    className="inline-flex text-gray-600 font-bold md:text-left">
                                                    Previous Password:
                                                </label>

                                                <div className="flex items-center justify-center md:w-2/3">
                                                    <input
                                                        className=" w-full px-5 text-gray-700 leading-tight focus:outline-none disabled:border-0 border-b-2 border-gray-200"
                                                        type={type1}
                                                        value={previousPassword}
                                                        onChange={(e) => setPreviousPassword(e.target.value)}
                                                        required={true}
                                                    />
                                                    <div>
                                                        <button type="button" onClick={handleshowPassToggle1}>
                                                            {icon1}
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex pb-5">
                                                <label
                                                    className="mr-9 inline-flex text-gray-600 font-bold md:text-left ">
                                                    New Password:
                                                </label>

                                                <div className="flex items-center justify-center md:w-2/3">
                                                    <input
                                                        className=" w-full px-5 text-gray-700 leading-tight focus:outline-none disabled:border-0 border-b-2 border-gray-200"
                                                        type={type2}
                                                        value={newPassword}
                                                        onChange={(e) => setNewPassword(e.target.value)}
                                                        required={true}
                                                    />
                                                    <div>
                                                        <button type="button" onClick={handleshowPassToggle2}>
                                                            {icon2}
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex pb-5">
                                                <label
                                                    className="mr-1 inline-flex text-gray-600 font-bold md:text-left ">
                                                    Confirm Password:
                                                </label>

                                                <div className=" flex items-center justify-center md:w-2/3">
                                                    <input
                                                        className=" w-full px-5 text-gray-700 leading-tight focus:outline-none disabled:border-0 border-b-2 border-gray-200"
                                                        type={type3}
                                                        value={confirmPassword}
                                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                                        required={true}
                                                    />
                                                    <div>
                                                        <button type="button" onClick={handleshowPassToggle3}>
                                                            {icon3}
                                                        </button>
                                                    </div>
                                                </div>

                                            </div>
                                            {message && <div className='px-14 text-red-500 text-right font-medium'>{message}</div>}
                                        </div>
                                    </div>
                                    <div className='flex justify-end'>
                                        <CancelBtn onClick={closeModal1} btntitle={"Cancel"} />
                                        <PrimaryBtn onClick={(e) => onPasswordChangeConfirm(e)} btntitle={'Change'} />
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

export default UserActionsTab