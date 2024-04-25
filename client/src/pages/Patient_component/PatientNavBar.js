import React, { Component } from 'react';


export default class PatientNavBar extends Component {

  render() {
    return (
        <nav className="navbar navbar-expand-lg body-tertiary" style={{backgroundColor:'#add8e6'}}>
        <div className="container-fluid">
          
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/">Manage Patient</a>

              </li>
              <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/patient/:id">Patient Info</a>

              </li>
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/prescriptionsHome">Prescriptions</a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/labsReports">Lab Reports</a>
              </li>
              
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}


