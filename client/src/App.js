import React, { Component } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useStaffAuthContext } from './hooks/useStaffAuthContext';

//import pages here
import Login from "./pages/Login";
import StaffMain from "./pages/StaffMain";
import StaffProfile from "./pages/StaffProfile";
import BranchesMain from "./pages/BranchesMain";
import RootLayout from "./layouts/RootLayout";
import UserProfile from "./pages/UserProfile";


function App() {

  const { user } = useStaffAuthContext();


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<RootLayout />}>
          <Route path="/staff" element={<StaffMain />} />
          <Route path="/staff/profile/:id" element={<StaffProfile />} />
          <Route path="/branch" element={<BranchesMain />} />
          <Route path="/user" element={<UserProfile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App


