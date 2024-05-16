import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useReactToPrint } from 'react-to-print';

//import components here
import LoadingComponent from "../components/LoadingComponent";
import EmptyNavArea from "../components/EmptyNavArea";

const StaffReport = () => {

    const contentToPrint = useRef(null);
    const handlePrint = useReactToPrint({
        documentTitle: "Print This Document",
        onBeforePrint: () => console.log("before printing..."),
        onAfterPrint: () => console.log("after printing..."),
        removeAfterPrint: true,
    });


    //loading
    const [loading, setLoading] = useState(false);

    //data
    const [staffCount, setStaffCount] = useState('')
    const [accountCount, setAccountCount] = useState('')
    const [otherStaffCount, setOtherStaffCount] = useState('')
    const [roleCountData, setRoleCountData] = useState([])

    //get staff records
    useEffect(() => {
        setLoading(true); //set loading state to true
        const staffCountRq = axios.get('/getStaffCount')
        const accountCountRq = axios.get('/getAccountCount')
        const otherStaffCountRq = axios.get('/getOtherStaffCount')
        const roleCountRq = axios.get('/getroleCount')

        Promise.all([staffCountRq, accountCountRq, otherStaffCountRq, roleCountRq]).then((response) => {

            setStaffCount(response[0].data.count)
            setAccountCount(response[1].data.count)
            setOtherStaffCount(response[2].data.count)
            setRoleCountData(response[3].data.data)
            setLoading(false)

        }).catch((error) => {
            console.log("Error fetching staff details:", error);
            setLoading(false);
        });

    }, []);


    return (
        <>
            <EmptyNavArea></EmptyNavArea>
            <main>
                <div className="main-container">
                    {loading ? (
                        <LoadingComponent />
                    ) :
                        (
                            <div>
                                <div ref={contentToPrint}>
                                    <div className="flex justify-around sticky font-bold text-xl top-0 max-w bg-white border border-gray-200 rounded-xl shadow py-5 mx-5 mb-10">Staff Report - Staff Summary</div>

                                    <div className=" flex justify-between bg-white border border-gray-200 rounded-[50px] shadow-lg p-10 m-5 max-w-4xl">

                                        <div className="">
                                            <p className="p-1 text-lg">Total Staff Count (All branches) : {staffCount} </p>
                                            <p className="p-1 text-lg">Total User Accounts created : {accountCount} </p>
                                            <p className="p-1 text-lg">Total Other Staff Count : {otherStaffCount} </p>
                                        </div>
                                        <div className="text-lg">
                                            <table className="divide-y divide-gray-500">
                                                <thead>
                                                    <tr>
                                                        <th className="text-left">Role</th>
                                                        <th className="text-center">Member Count</th>
                                                    </tr>
                                                </thead>
                                                <tbody>

                                                </tbody>
                                                {roleCountData.map((role) => (
                                                    <tr key={role.Role}>
                                                        <td className="text-left">{role.Role}</td>
                                                        <td className="text-center">{role.Count}</td>
                                                    </tr>

                                                ))}
                                            </table>
                                        </div>

                                    </div>
                                </div>
                                <div className="text-right m-5">
                                    <button className="px-6 py-2.5 rounded-full text-white text-sm tracking-wider font-semibold border-none outline-none bg-blue-600 hover:bg-blue-700 active:bg-blue-600" onClick={() => {
                                        handlePrint(null, () => contentToPrint.current);
                                    }}>
                                        Save report to device
                                    </button>
                                </div>
                            </div>
                        )}
                </div>
            </main>
        </>


    )
}

export default StaffReport