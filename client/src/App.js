import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useStaffAuthContext } from './hooks/useStaffAuthContext';
import { jwtDecode } from "jwt-decode";

//import pages here
import Login from "./pages/Login";
import StaffMain from "./pages/StaffMain";
import StaffProfile from "./pages/StaffProfile";
import BranchesMain from "./pages/BranchesMain";
import RootLayout from "./layouts/RootLayout";
import UserProfile from "./pages/UserProfile";
import StaffQualifications from "./pages/StaffQualifications"
import UserQualifications from './pages/UserQualifications';

//ward component
import Ward_Home from './pages/Ward_components/Ward_Home';
import Ward_Details from './pages/Ward_components/Ward_Details';
import Ward_Create from './pages/Ward_components/Ward_Create';
import Ward_Edit from './pages/Ward_components/Ward_Edit';
//bed component
import Bed_Home from './pages/Bed_componenets/Bed_Home';
import Bed_Details from './pages/Bed_componenets/Bed_Details';
import Bed_Create from './pages/Bed_componenets/Bed_Create';
import Bed_Edit from './pages/Bed_componenets/Bed_Edit';

function App() {

  const { user } = useStaffAuthContext();

  let designatedRoute = '/';

  const location = useLocation();

  //on reaload
  useEffect(() => {
    // Save the current path every time it changes
    if (user != null) {
      localStorage.setItem('lastPath', location.pathname + location.search);
    }
  }, [location]);

  //set route according to role
  if (user) {
    const userInfo = jwtDecode(JSON.stringify(user));
    const userRole = userInfo.role.toLowerCase();

    switch (userRole) {
      case 'branch manager':
        designatedRoute = "/branch";
        break;
      case 'hr manager':
        designatedRoute = "/staff";
        break;
      case 'ward manager':
        designatedRoute = "/ward";
        break;
      case 'lab technician':
        designatedRoute = "/lab";
        break;
      case 'doctor':
        designatedRoute = "/user/profile";
        break;
      case 'financial manager':
        designatedRoute = "/finances";
        break;
      default:
        designatedRoute = "/user/profile";
        break;
    }

  }


  let gotoRoute;
  let lastPath = localStorage.getItem('lastPath'); //Retrieve the last path from localStorage

  if (lastPath) {
    gotoRoute = lastPath; // if exists use it as route when user is logged in
  }
  else if (lastPath == '/') {
    gotoRoute = designatedRoute; //if lastPath was saved as the login by change
  }
  else {
    gotoRoute = designatedRoute; //else use the designated Route
  }

  //routes go below
  return (
    <Routes>
      <Route path="/" element={!user ? <Login /> : <Navigate to={gotoRoute} />} />
      <Route element={<RootLayout />}>
        <Route path="/staff" element={user ? <StaffMain /> : <Navigate to="/" />} />
        <Route path="/staff/profile/:id" element={user ? <StaffProfile /> : <Navigate to="/" />} />
        <Route path="/staff/qualifications/:id" element={user ? <StaffQualifications /> : <Navigate to="/" />} />
        <Route path="/branch" element={user ? <BranchesMain /> : <Navigate to="/" />} />
        <Route path="/user/profile" element={user ? <UserProfile /> : <Navigate to="/" />} />
        <Route path="/user/qualifications" element={user ? <UserQualifications /> : <Navigate to="/" />} />

        <Route path="/wardHome" element={<Ward_Home />} />
        <Route path="/wardAdd" element={<Ward_Create />} />
        <Route path="/wardEdit/:id" element={<Ward_Edit />} />
        <Route path="/wardDetails/:id" element={<Ward_Details />} />
        <Route path="/beds" element={<Bed_Home />} />
        <Route path="/addBed" element={<Bed_Create />} />
        <Route path="/editBed/:id" element={<Bed_Edit />} />
        <Route path="/bedDetails/:id" element={<Bed_Details />} />

      </Route>
    </Routes>
  );
}

export default App


/*
Above code implements dynamic navigation where the user is navigated to their respective section
according to their set user role. 

LastPath - if the user is logged in , refreshing any page will in default will send users
back to the original designated route. Instead, if the user is logged in , save path to storage,
use saved path in storage for current route.

Note: Remove path data from storage on logout.

Issue : What happens when token expires ?
User must be logged out and path data must be destroyed.

*/