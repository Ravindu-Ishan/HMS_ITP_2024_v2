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
import InventoryProductCreate from './pages/Inventory/InventoryProductCreate';
import InventoryProductEdit from './pages/Inventory/InventoryProductEdit';
import InventoryProductMain from './pages/Inventory/InventoryProductMain';
import InventorySupplierCreate from './pages/Inventory/InventorySupplierCreate';
import InventorySupplierEdit from './pages/Inventory/InventorySupplierEdit';
import InventorySupplierMain from './pages/Inventory/InventorySupplierMain';
import RestockRequestView from './pages/Inventory/RestockRequestView';
import RestockRequestAdd from './pages/Inventory/RestockRequestAdd';


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
        designatedRoute = "/user";
        break;
      case 'financial manager':
        designatedRoute = "/finances";
        break;
      default:
        designatedRoute = "/user";
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
        <Route path="/branch" element={user ? <BranchesMain /> : <Navigate to="/" />} />
        <Route path="/user" element={user ? <UserProfile /> : <Navigate to="/" />} />
            <Route path="/productmain" exact element={<InventoryProductMain />} />
            <Route path="/productcreate" element={<InventoryProductCreate />} />
            <Route path="/productedit/:id" element={<InventoryProductEdit />} />
            <Route path="/suppliercreate" element={<InventorySupplierCreate />} />
            <Route path="/supplieredit/:id" element={<InventorySupplierEdit />} />
            <Route path="/suppliermain" exact element={<InventorySupplierMain />} />
            <Route path="/RestockView" exact element={<RestockRequestView />} />
            <Route path="/RestockAdd" exact element={<RestockRequestAdd />} />

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