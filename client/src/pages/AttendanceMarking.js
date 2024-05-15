import React, { useEffect, useState } from "react";
import axios from "axios";
import { useStaffAuthContext } from '../hooks/useStaffAuthContext';

const AttendanceMarkingPage = () => {
    const { user } = useStaffAuthContext();
    const [attendances, setAttendances] = useState([]);

    useEffect(() => {
        const today = new Date().toISOString().slice(0, 10);
        axios.get(`/attendance/getToday/${user.smid}?date=${today}`)
            .then(res => {
                console.log("Today's attendances data:", res.data);
                setAttendances(res.data);
            })
            .catch(error => {
                console.log("Error fetching today's attendances:", error);
            });
    }, [user.smid]);

    const handleAttendanceChange = (index, checked) => {
        const updatedAttendances = [...attendances];
        updatedAttendances[index].attendance = checked;

        axios.put(`/attendance/${attendances[index]._id}`, updatedAttendances[index])
            .then(res => {
                console.log("Attendance updated successfully:", res.data);
                setAttendances(updatedAttendances);
            })
            .catch(error => {
                console.log("Error updating attendance:", error);
            });
    };

    return (
        <div>
            <h1>Attendance Marking</h1>
            {attendances.map((attendance, index) => (
                <div key={attendance._id}>
                    <h2>{attendance.name}</h2>
                    <form>
                        <div>
                            <label>SMID: {attendance.smid}</label>
                        </div>
                        <div>
                            <label>Location: {attendance.location}</label>
                        </div>
                        <div>
                            <label>Schedule Time: {attendance.scheduleTime}</label>
                        </div>
                        <div>
                            <label>Schedule Date: {attendance.scheduleDate}</label>
                        </div>
                        <div>
                            <label>Arrival Time:</label>
                            <input type="time" value={attendance.arrivalTime} onChange={(e) => console.log(e.target.value)} />
                        </div>
                        <div>
                            <label>Attendance:</label>
                            <input type="checkbox" checked={attendance.attendance} onChange={(e) => handleAttendanceChange(index, e.target.checked)} />
                        </div>
                    </form>
                </div>
            ))}
        </div>
    );
};

export default AttendanceMarkingPage;
