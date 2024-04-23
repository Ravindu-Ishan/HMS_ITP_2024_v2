import { useStaffAuthContext } from '../hooks/useStaffAuthContext';
import { jwtDecode } from "jwt-decode";

//components
import TopNavUser from "../components/TopNavUser";
import TopNavAttendance from '../components/TopNavAttendance';

const AttendanceReport = () => {

    return(
        <>
        <div className="navarea">
         <TopNavAttendance/>
         </div>
    
        <div>hello this is  attendance report page</div>
        </>
    )
};
export default AttendanceReport;


