import React, { useEffect, useState } from "react";
import axios from "axios";
import { useStaffAuthContext } from '../hooks/useStaffAuthContext';
import { jwtDecode } from "jwt-decode";
import TopNavAttendance from "../components/TopNavAttendance";

const AttendanceAndLeave = () => {
    const { user } = useStaffAuthContext();
    let smid;
    if (user) {
        const userInfo = jwtDecode(JSON.stringify(user));
        smid = userInfo.smid;
    }

    const [todayShifts, setTodayShifts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        // Set the initial value of the searchQuery to today's date
        const today = new Date().toISOString().slice(0, 10);
        setSearchQuery(today);

        // Fetch today's shifts
        axios.get(`/shift/getonly/${smid}?ScheduleDate=${today}`)
            .then(res => {
                console.log("Today's shifts data:", res.data);
                setTodayShifts(res.data.data);
            })
            .catch(error => {
                console.log("Error fetching today's shifts:", error);
            });
    }, [smid]); // Add smid as a dependency to fetch shifts when it changes

    // Filter shifts based on search query
    const filteredShifts = todayShifts.filter(shift => {
        return shift.ScheduleDate.includes(searchQuery);
    });

    // Validate date format function
    const isValidDate = (dateString) => {
        return /^\d{4}-\d{2}-\d{2}$/.test(dateString);
    };

    // Handle input change
    const handleInputChange = (e) => {
        const inputValue = e.target.value;
        if (isValidDate(inputValue)) {
            setSearchQuery(inputValue);
        } else {
            // Notify the user about the invalid date format
            alert('Please enter a date in the yyyy-mm-dd format.');
        }
    };

    return (
        <>
            <div className="navarea">
                <TopNavAttendance smid={smid} />
            </div>

            <main>
                <h1>Today's Shifts</h1>
                {/* Search bar */}
                <input 
                    type="text" 
                    placeholder="Search by schedule date (yyyy-mm-dd)..." 
                    value={searchQuery}
                    onChange={handleInputChange}
                />
                <table>
                    <thead>
                        <tr>
                            <th>SMID</th>
                            <th>Location</th>
                            <th>Schedule Time</th>
                            <th>Schedule Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredShifts.map(shift => (
                            <tr key={shift._id}>
                                <td>{shift.smid}</td>
                                <td>{shift.Location}</td>
                                <td>{shift.ScheduleTime}</td>
                                <td>{shift.ScheduleDate}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </main>
        </>
    );
};

export default AttendanceAndLeave;
