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

import StaffReport from './pages/StaffReport';
import InventoryProductCreate from './pages/Inventory/InventoryProductCreate';
import InventoryProductEdit from './pages/Inventory/InventoryProductEdit';
import InventoryProductMain from './pages/Inventory/InventoryProductMain';
import InventorySupplierCreate from './pages/Inventory/InventorySupplierCreate';
import InventorySupplierEdit from './pages/Inventory/InventorySupplierEdit';
import InventorySupplierMain from './pages/Inventory/InventorySupplierMain';
import RestockRequestView from './pages/Inventory/RestockRequestView';
import RestockRequestAdd from './pages/Inventory/RestockRequestAdd';


import ShiftMain from "./pages/ShiftMain";
import CreateShift from "./pages/CreateShift";
import EditShift from './pages/EditShift';
import AttendanceAndLeave from './pages/AttendanceAndLeave';
import ShiftDetails from './pages/ShiftDetails';
import Leaves from './pages/Leaves';
import UserShiftView from './pages/UserShiftView';
import UserLeavesView from './pages/UserLeavesView';
import AttendanceReport from './pages/AttendanceReport';
import CreateLeave from './pages/CreateLeave';
import EditLeave from './pages/EditLeave';


import StaffQualifications from "./pages/StaffQualifications"
import UserQualifications from './pages/UserQualifications';
import AttendanceMarkingPage from './pages/AttendanceMarking';

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
      case 'front deskOfficer':
        designatedRoute = "/appointmentHome"
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

        {/*B K R I SASMIN*/}
        <Route path="/staff" element={user ? <StaffMain /> : <Navigate to="/" />} />
        <Route path="/staff/profile/:id" element={user ? <StaffProfile /> : <Navigate to="/" />} />
        <Route path="/staff/qualifications/:id" element={user ? <StaffQualifications /> : <Navigate to="/" />} />
        <Route path="/branch" element={user ? <BranchesMain /> : <Navigate to="/" />} />
        <Route path="/staff/report" element={user ? <StaffReport /> : <Navigate to="/" />} />

        {/*S.H.K Bulathgama*/}
        <Route path="/productmain" exact element={<InventoryProductMain />} />
        <Route path="/productcreate" element={<InventoryProductCreate />} />
        <Route path="/productedit/:id" element={<InventoryProductEdit />} />
        <Route path="/suppliercreate" element={<InventorySupplierCreate />} />
        <Route path="/supplieredit/:id" element={<InventorySupplierEdit />} />
        <Route path="/suppliermain" exact element={<InventorySupplierMain />} />
        <Route path="/RestockView" exact element={<RestockRequestView />} />
        <Route path="/RestockAdd" exact element={<RestockRequestAdd />} />

        <Route path="/user/profile" element={user ? <UserProfile /> : <Navigate to="/" />} />
        <Route path="/user/qualifications" element={user ? <UserQualifications /> : <Navigate to="/" />} />

        <Route path="/user/myAppointments" element={user ? <DoctorView /> : <Navigate to="/" />} />


        {/*Lithara*/}
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


        {/*Praveen*/}
        <Route path="/wardHome" element={user ? <Ward_Home /> : <Navigate to="/" />} />
        <Route path="/wardAdd" element={user ? <Ward_Create /> : <Navigate to="/" />} />
        <Route path="/wardEdit/:id" element={user ? <Ward_Edit /> : <Navigate to="/" />} />
        <Route path="/wardDetails/:id" element={user ? <Ward_Details /> : <Navigate to="/" />} />
        <Route path="/beds" element={user ? <Bed_Home /> : <Navigate to="/" />} />
        <Route path="/addBed" element={user ? <Bed_Create /> : <Navigate to="/" />} />
        <Route path="/editBed/:id" element={user ? <Bed_Edit /> : <Navigate to="/" />} />
        <Route path="/bedDetails/:id" element={user ? <Bed_Details /> : <Navigate to="/" />} />

        {/*Gihani*/}
        <Route path="/patienthome" element={<PatientHome />} />
        <Route path="/addpatient" element={<CreatePatient />} />
        <Route path="/editpatient/:id" element={<EditPatient />} />
        <Route path="/patient/:id" element={<PatientDetails />} />
        <Route path="/reportHistory" element={<Summary />} />
        {/*<Route path="/reportApp" element={<ReportApp />} />*/}
        <Route path="/prescriptionsHome" element={<PrescriptionsHome />} />
        <Route path="/createPrescriptions" element={<CreatePrescriptions />} />
        <Route path="/editPrescriptions/:id" element={<EditPrescriptions />} />
        <Route path="/prescription/:id" element={<PrescriptionsDetails />} />
        <Route path="/labsReports" element={<LabReports />} />

        {/*Iruni*/}
        <Route path="/shift/shiftsof/:smid" element={user ? <ShiftMain /> : <Navigate to="/" />} />
        <Route path="/shift/create/:smid" element={user ? <CreateShift /> : <Navigate to="/" />} />
        <Route path='/shift/edit/:id' element={user ? <EditShift /> : <Navigate to="/" />} />
        <Route path='/attendence/main' element={user ? <AttendanceAndLeave /> : <Navigate to="/" />} />
        <Route path='/shift/:id' element={user ? <ShiftDetails /> : <Navigate to="/" />} />
        <Route path='/attendence/leaves' element={user ? <Leaves /> : <Navigate to="/" />} />
        <Route path='/user/userShifts' element={user ? <UserShiftView /> : <Navigate to="/" />} />
        <Route path='/user/userLeaves' element={user ? <UserLeavesView /> : <Navigate to="/" />} />
        <Route path='/attendence/attendanceReport' element={user ? <AttendanceReport /> : <Navigate to="/" />} />
        <Route path='/user/userLeaves/create/:smid' element={user ? <CreateLeave /> : <Navigate to="/" />} />
        <Route path='/user/userLeaves/edit/:id' element={user ? <EditLeave /> : <Navigate to="/" />} />
        <Route path='/user/attendencemark' element={user ? <AttendanceMarkingPage /> : <Navigate to="/" />} />

      </Route>
    </Routes>
  );
}

export default App;


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