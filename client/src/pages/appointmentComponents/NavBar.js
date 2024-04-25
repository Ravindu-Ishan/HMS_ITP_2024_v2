import React, { Component } from 'react';

export default class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
        posts:[]
    };
  }

  render() {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/appointmentHome">Home</a>
              </li>

              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/report">Generate Report</a>
              </li>

              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/doctorView">Doctor View</a>
              </li>

              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/doctorAvailability">Doctor Availability</a>
              </li>

              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/serviceAvailability">Services Availability</a>
              </li>

              {/* <li class="nav-item">
                <a class="nav-link" href="#">Pricing</a>
              </li>
              <li class="nav-item">
                <a class="nav-link disabled" aria-disabled="true">Disabled</a>
              </li> */}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

//export default MyComponent;