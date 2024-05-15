
import React, { Component } from 'react';
import axios from 'axios';
import TopNavAppointmet from '../../components/TopNavAppointment';

export default class ServiceAvailability extends Component {
  constructor(props) {
    super(props);

    this.state = {
      appointments: [],
      //selectedDoctor: null // Add selected doctor state
    };
  }

  componentDidMount() {
    this.retrievePosts();
  }


  //get request
  retrievePosts() {
    axios.get("/appointments").then(res => {
      if (res.data.success) {
        this.setState({
          appointments: res.data.existingAppointments
        });

        console.log(this.state.appointments);
      }
    });
  }



  filterData(appointments, searchKey) {

    const result = appointments.filter((appointment) =>
      appointment.service.toLowerCase().includes(searchKey)
    )

    this.setState({ appointments: result })

  }


  handleSearchArea = (e) => {

    const searchKey = e.currentTarget.value;

    axios.get("/appointments").then(res => {
      if (res.data.success) {
        this.filterData(res.data.existingAppointments, searchKey)
      }
    });

  }

  render() {
    //const { selectedDoctor } = this.state;
    return (
      <>
        <div className='navarea'>
          <TopNavAppointmet />
        </div>

        <main>
          <div className="container mt-10">
            <div className="ml-8 row">
              <div className="col-lg-3 mt-2 mb-2">
                <input
                  className="appearance-none block w-400 bg-white border border-gray-200 rounded-xl py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="search"
                  placeholder="Service"
                  name="searchQuery"
                  onChange={this.handleSearchArea} />
              </div>
            </div>

            <div className="table-responsive overflow-x-auto sm:rounded-lg tablestyle">
              <table className="w-full text-sm border-separate border-spacing-x-0 border-spacing-y-2 text-gray-500 table table-striped table-bordered">
                <thead className="text-xs text-gray-700 uppercase bg-white thead-dark">
                  <tr>
                    <th className="p-3" scope="col">#</th>
                    <th className="p-3" scope="col">Service</th>
                    <th className="p-3" scope="col">Fee</th>
                    <th className="p-3" scope="col">Location</th>
                    <th className="p-3" scope="col">Availability</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.appointments.map((appointments, index) => (
                    <tr className="text-gray-600 bg-white hover:bg-gray-200 hover:text-black" key={index}>
                      <th scope="row">{index + 1}</th>
                      <td className="text-center py-2 px-4">
                        <a href={`/doctorPatientView/${appointments._id}`} style={{ textDecoration: 'none' }}>
                          {appointments._id}
                        </a>
                      </td>
                      <td className="text-center py-2 px-4">{appointments.doctor}</td>
                      <td className="text-center py-2 px-4">{appointments.topic}</td>
                      <td className="text-center py-2 px-4"></td>
                      <td>
                        {/* Add a slot decrement method */}
                        {/* <a className="btn btn-warning" href={`/doctorReschedule/${posts._id}`}>
                          <i className="fas fa-edit"></i>&nbsp;Reschedule
                        </a>
                        &nbsp;
                        <a className="btn btn-danger" href="#" onClick={() => this.onDelete(posts._id)}>
                          <i className="fas fa-trash"></i>&nbsp;Delete
                        </a> */}
                      </td>
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

//export default MyComponent;