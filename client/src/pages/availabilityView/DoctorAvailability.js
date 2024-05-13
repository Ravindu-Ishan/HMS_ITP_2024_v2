import React, { Component } from 'react';
import axios from 'axios';
import TopNavAppointment from '../../components/TopNavAppointment';

export default class DoctorAvailability extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shifts: [],
      searchQuery: ''
    };
  }

  componentDidMount() {
    this.retrieveShifts();
  }

  retrieveShifts() {
    axios.get("/shift").then(res => {
      if (res.data.success) {
        this.setState({
          shifts: res.data.existingPosts
        });
      }
    }).catch(error => {
      console.error("Error fetching shifts:", error);
    });
  }

  handleSearchArea = (e) => {
    const searchKey = e.currentTarget.value.toLowerCase();
    this.setState({ searchQuery: searchKey });
  }

  render() {
    const { shifts, searchQuery } = this.state;
    const filteredShifts = shifts.filter(shift =>
      shift.ScheduleDate.toLowerCase().includes(searchQuery)
    );

    return (
      <>
        <div className='navarea'>
          <TopNavAppointment />
        </div>

        <main>
          <div className="container">
            <div className="row">
              <div className="col-lg-3 mt-2 mb-2">
                <input
                  className="form-control"
                  type="search"
                  placeholder="Doctor/Specialist"
                  onChange={this.handleSearchArea}
                />
                
              </div>

              <div className="col-lg-3 mt-2 mb-2">
                <input
                  className="form-control"
                  type="search"
                  placeholder="Date"
                  onChange={this.handleSearchArea}
                />
                
              </div>
            </div>

            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Doctor/Specialist</th>
                  <th scope="col">Specialization</th>
                  <th scope="col">Available Date</th>
                  <th scope="col">Available Time</th>
                </tr>
              </thead>
              <tbody>
                {filteredShifts.map((shift, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{shift.smid}</td>
                    <td></td>
                    <td>{shift.ScheduleDate}</td>
                    <td>{shift.ScheduleTime}</td>
                    
                    
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </>
    );
  }
}
