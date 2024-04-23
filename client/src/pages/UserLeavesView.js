import { useStaffAuthContext } from '../hooks/useStaffAuthContext';
import { jwtDecode } from "jwt-decode";

//components
import TopNavUser from "../components/TopNavUser";

const UserLeavesView = () => {

    return(
        <>
        <div className="navarea">
        <TopNavUser/>
        </div>
        
        <main>
            <div className="main-container">
    
              <div>hello this is user leaves view page</div>
            </div>
        </main>
        </>
    )
};
export default UserLeavesView;
