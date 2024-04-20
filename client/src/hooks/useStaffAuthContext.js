import { StaffAuthContext } from "../context/StaffAuthContext";
import { useContext } from "react";



const useStaffAuthContext = () => {

    const context = useContext(StaffAuthContext)

    if (!context) {
        throw Error('useStaffAuthContext must be used inside an StaffAuthContext provider')
    }

    return context
}

export default useStaffAuthContext