import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

//import pages here
import Login from "./pages/Login";
import StaffMain from "./pages/StaffMain";
import StaffProfile from "./pages/StaffProfile";
import BranchesMain from "./pages/BranchesMain";
import RootLayout from "./layouts/RootLayout";
import UserProfile from "./pages/UserProfile";
import ShiftMain from "./pages/ShiftMain";
import CreateShift from "./pages/CreateShift";
import EditShift from './pages/EditShift';
import AttendanceAndLeave from './pages/AttendanceAndLeave';
import ShiftDetails from './pages/ShiftDetails';
import Leaves from './pages/Leaves';
import ShiftInProfile from './pages/ShiftInProfile';



//import context
import { StaffAuthContextProvider } from './context/StaffAuthContext';


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };
  }

  render() {
    return (
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<Login />} />
          <Route element={<RootLayout />}>
            <Route path="/staff" element={<StaffMain />} />
            <Route path="/staff/profile/:id" element={<StaffProfile />} />
            <Route path="/branch" element={<BranchesMain />} />
            <Route path="/user" element={<UserProfile />} />
            <Route path="/shift/shiftsof/:smid" element={<ShiftMain />} />
            <Route path="/shift/create/:smid" element={<CreateShift />} />
            <Route path='/shift/edit/:id' element={<EditShift />} />
            <Route path='/attendence' element={<AttendanceAndLeave />} />
            <Route path='/shift/:id' element={<ShiftDetails />} />
            <Route path='/leaves' element={<Leaves />} />
            <Route path='/leaves' element={<ShiftInProfile />} />
          
          </Route>

        </Routes>
      </BrowserRouter>
    );
  }

}
