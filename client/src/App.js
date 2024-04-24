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


//appointment routes
import EditAppointment from './pages/appointmentComponents/EditAppointment';
import CreateAppointment from './pages/appointmentComponents/CreateAppointment';
import AppointmentHome from './pages/appointmentComponents/AppointmentHome';
import AppointmentDetails from './pages/appointmentComponents/AppointmentDetails';
import NavBar from './pages/appointmentComponents/NavBar';
import ReportGen from './pages/appointmentComponents/ReportGen';
import ReportApp from './pages/appointmentComponents/ReportApp';
import DoctorView from './pages/doctorViewComponent/DoctorView';
import DoctorPatientView from './pages/doctorViewComponent/DoctorPatientView';
import DoctorEdit from './pages/doctorViewComponent/DoctorEdit';
import DoctorAvailability from './pages/availabilityView/DoctorAvailability';
import ServiceAvailability from './pages/availabilityView/ServiceAvailability';
import LabAppointHome from './pages/labAppointments/LabAppointHome';
import LabAppointCreate from './pages/labAppointments/LabAppointCreate';
import LabAppointEdit from './pages/labAppointments/LabAppointEdit';
import LabAppointDetails from './pages/labAppointments/LabAppointDetails';

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

        <Route path="/appointmentHome" element={<AppointmentHome />} />
        <Route path="/createAppointment" element={<CreateAppointment />} />
        <Route path="/editAppointment/:id" element={<EditAppointment />} />
        <Route path="/appointment/:id" element={<AppointmentDetails />} />
        <Route path="/report" element={<ReportGen />}></Route>
        <Route path="/reportApp" element={<ReportApp />}></Route>
        <Route path="/doctorView" element={<DoctorView />}></Route>
        <Route path="/doctorPatientView/:id" element={<DoctorPatientView />}></Route>
        <Route path="/doctorReschedule/:id" element={<DoctorEdit />}></Route>
        <Route path="/doctorAvailability" element={<DoctorAvailability />}></Route>
        <Route path="/serviceAvailability" element={<ServiceAvailability />}></Route>
        <Route path="/labAppointHome" element={<LabAppointHome />} />
        <Route path="/labAppointHome/labAppointCreate" element={<LabAppointCreate />} />
        <Route path="/labAppointHome/labAppointEdit/:id" element={<LabAppointEdit />} />
        <Route path="/labApp/:id" element={<LabAppointDetails />} />
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