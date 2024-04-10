import React, { useEffect, useState } from "react";
import axios from "axios";

//import components here
import LoadingComponent from "../components/LoadingComponent";
import PrimaryBtn from "../components/PrimaryBtn";
import CancelBtn from "../components/CancelBtn";
import ConfirmPopUp from "../components/ConfirmPopUp";

//import icons here
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";



function StaffAccountTab2({ smid }) {

    const [isDisabled, setIsDisabled] = useState(true); //form activation state

    //account availability
    const [hasAccount, setHasAccount] = useState(null);


    //account details states
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    //form hidden state
    const [isHidden, setHidden] = useState(true); //ini state = true

    //loading state
    const [loading, setLoading] = useState(false);

    //password input
    const [showPassword, setShowPassword] = useState(false);
    const [passwordDisabled, setPasswordDisabled] = useState(false);

    const [type, setType] = useState('password');
    const [icon, setIcon] = useState(FaEyeSlash);

    //create account button state
    const [isButtonHidden, setButtonHidden] = useState(true); // ini state = true

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

    const handleCreateAccount = () => {
        setHidden(false);
        setButtonHidden(true);
        setIsDisabled(false);
    }

    //button handlers
    //edit button
    const handleEditClick = () => {
        setIsDisabled(false);
    };

    //cancel button
    const handleCancelClick = () => {
        setIsDisabled(true);
        fetchDetails(); // Fetch staff details again to reset the form states
    };

    //save button - update staff details
    const handleSaveClick = () => {
        setLoading(true);
        if (!hasAccount) {
            const data = {
                smid,
                username,
                password,
                email
            };
            axios
                .post(`/account/create`, data)
                .then(() => {
                    setLoading(false);
                    // Reload the page after successful save
                    fetchDetails();
                })
                .catch((error) => {
                    setLoading(false);
                    fetchDetails(); //reset page if save unsuccessful
                    alert("An error happened. Please check console");
                    console.log("Error saving staff details:", error);
                });
        }
        if (hasAccount) {
            const data = {
                username,
                email
            };

            axios
                .put(`/account/update/${smid}`, data)
                .then(() => {
                    setLoading(false);
                    // Reload the page after successful save
                    window.location.reload();
                })
                .catch((error) => {
                    setLoading(false);
                    window.location.reload(); //reset page if save unsuccessful
                    alert("An error happened. Please check console");
                    console.log("Error saving staff details:", error);
                });
        }

    }


    const fetchDetails = () => {
        setLoading(true);
        //retrieve account details
        axios.get(`/account/get/${smid}`)
            .then((response) => {

                //if account data is available = user has an acocunt
                if (response.data !== null) {

                    //update constant states
                    setUsername(response.data.username);
                    setPassword(response.data.password);
                    setEmail(response.data.email);

                    //display account form and details
                    setHidden(false); //unhide form 
                    setButtonHidden(true); //hide button
                    setHasAccount(true); //has account state true
                    setShowPassword(false); //hide password input area
                    setPasswordDisabled(true); //disable the password field
                }
                else {
                    //if account data is available = user has an acocunt

                    setButtonHidden(false); //enable account creation button
                    setHidden(true); //hide the form first
                    setHasAccount(false); // has no acocunt : value = false
                    setShowPassword(true); //show the password field
                    setPasswordDisabled(false); //enable the password field
                }
                setLoading(false) //stop loading
            })
            .catch((error) => {
                setLoading(false);
                console.log("Error retreiving details:", error);
            });
    }


    //on page load and refresh
    useEffect(() => {
        fetchDetails();
    }, []);


    return (

        <div>
            {loading ? (
                <LoadingComponent />
            ) : (
                <div>
                    {/*----------------create account button-------------*/}
                    <button type="button"
                        hidden={isButtonHidden}
                        onClick={handleCreateAccount}
                        className="py-5 text-gray-700 hover:animate-pulse hover:font-semibold hover:text-gray-800  " >
                        Click here to Create Login Account for User
                    </button>
                    {/*----------------account form-------------*/}
                    <form className="transparentClass " hidden={isHidden}>
                        <fieldset disabled={isDisabled}>
                            <div className="md:flex md:items-center ">
                                <div className="md:w-1/5">
                                    <label className="block text-gray-600 font-bold md:text-left mb-1 md:mb-0 ">
                                        Email
                                    </label>
                                </div>
                                <div className="md:w-2/3">
                                    <input
                                        className=" w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none disabled:border-0 border-b-2 border-gray-200"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}

                                    />
                                </div>
                            </div>

                            <div className="md:flex md:items-center ">
                                <div className="md:w-1/5">
                                    <label className="block text-gray-600 font-bold md:text-left mb-1 md:mb-0 ">
                                        Username
                                    </label>
                                </div>
                                <div className=" md:w-2/3">
                                    <input
                                        className=" w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none disabled:border-0 border-b-2 border-gray-200"
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}

                                    />
                                </div>
                            </div>

                            {showPassword ? (
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
                                            disabled={passwordDisabled}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}

                                        />
                                        <button type="button" onClick={handleshowPassToggle}>
                                            {icon}
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div>
                                </div>
                            )
                            }

                        </fieldset>

                        {isDisabled ? (
                            <div className="mt-5 text-right">
                                <PrimaryBtn
                                    onClick={handleEditClick}
                                    btntitle={"Edit"}
                                ></PrimaryBtn>
                            </div>
                        ) : (
                            <div className="mt-5 text-right">
                                <div className=" inline-block">
                                    <CancelBtn
                                        onClick={handleCancelClick}
                                        btntitle={"Cancel"}
                                    ></CancelBtn>
                                </div>
                                <div className="inline-block">
                                    <ConfirmPopUp btntitle={"Save"} onConfirmFunction={handleSaveClick} />
                                </div>
                            </div>
                        )}
                    </form>

                </div>
            )
            }
        </div>

    )
}

export default StaffAccountTab2

