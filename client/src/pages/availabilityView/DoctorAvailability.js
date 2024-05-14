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
            <h3 className="p-3 text-2xl font-bold text-gray-800 ml-2">Doctors/Specialists</h3>
            <div className="row" style={{ display: 'flex', justifyContent: 'space-around' }}>
              <div className="col-lg-3 mt-2 mb-2">
                <input
                  className="appearance-none block w-300 bg-white border border-gray-200 rounded-xl py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="search"
                  placeholder="Doctor/Specialist"
                  name="doctorSearchQuery"
                  onChange={this.handleSearchArea} />
              </div>

              <div className="col-lg-3 mt-2 mb-2">
                <input
                  className="appearance-none block w-300 bg-white border border-gray-200 rounded-xl py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="search"
                  placeholder="Specialisation"
                  name="specialisationSearchQuery"
                  onChange={this.handleSearchArea} />
              </div>

              <div className="col-lg-3 mt-2 mb-2">
                <input
                  className="appearance-none block w-300 bg-white border border-gray-200 rounded-xl py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="search"
                  placeholder="Date"
                  name="dateSearchQuery"
                  onChange={this.handleSearchArea} />
              </div>
            </div>


            <div className="table-responsive overflow-x-auto sm:rounded-lg tablestyle">
              <table className="w-full text-sm border-separate border-spacing-x-0 border-spacing-y-2 text-gray-500 table table-striped table-bordered">
                <thead className="text-xs text-gray-700 uppercase bg-white thead-dark">
                  <tr>
                    <th className="p-3" scope="col">#</th>
                    <th className="p-3" scope="col">Doctor/Specialist</th>
                    <th className="p-3" scope="col">Specialization</th>
                    <th className="p-3" scope="col">Available Date</th>
                    <th className="p-3" scope="col">Available Time</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredShifts.map((shift, index) => (
                    <tr className="text-gray-600 bg-white hover:bg-gray-200 hover:text-black" key={index}>
                      <td className="text-center py-2 px-4">{index + 1}</td>
                      <td className="text-center py-2 px-4">{shift.smid}</td>
                      <td className="text-center py-2 px-4">{/* Add specialization here if available */}</td>
                      <td className="text-center py-2 px-4">{shift.ScheduleDate}</td>
                      <td className="text-center py-2 px-4">{shift.ScheduleTime}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </>
    );

  }
}
