import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

//import pages here
import Login from "./pages/Login";
import StaffMain from "./pages/StaffMain";
import StaffProfile from "./pages/StaffProfile";
import BranchesMain from "./pages/BranchesMain";
import RootLayout from "./layouts/RootLayout";
import UserProfile from "./pages/UserProfile";


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
          <StaffAuthContextProvider>
            <Route path="/" element={<Login />} />
            <Route element={<RootLayout />}>
              <Route path="/staff" element={<StaffMain />} />
              <Route path="/staff/profile/:id" element={<StaffProfile />} />
              <Route path="/branch" element={<BranchesMain />} />
              <Route path="/user" element={<UserProfile />} />
            </Route>
          </StaffAuthContextProvider>
        </Routes>
      </BrowserRouter>
    );
  }

}
