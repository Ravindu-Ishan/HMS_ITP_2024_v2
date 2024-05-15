import React, { Component } from 'react';
import axios from 'axios';

export default class AppointmentHome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      appointments: [],
      labApps: [],
      selectedDoctor: null // Add selected doctor state
    };
  }

  componentDidMount() {
    this.retrievePosts();
    this.retrieveLabPosts();
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

  //get request
  retrieveLabPosts() {
    axios.get("/labApps").then(res => {
      if (res.data.success) {
        this.setState({
          labApps: res.data.existingLabApps
        });

        console.log(this.state.labApps);
      }
    });
  }


  render() {

    return (
      <>
        <main className='bg-white'>
          <div className="container">
            <div className=" bg-white"> {/* Adding this div for responsive table */}
              <table className="w-full text-sm border-separate border-spacing-x-0 border-spacing-y-2 text-black bg-white table table-striped table-bordered"> {/* Adding Bootstrap table classes */}
                <thead className="text-xs text-black uppercase bg-white thead-dark"> {/* Adding dark background for table header */}
                  <tr>
                    <th className="p-3" scope="col"></th>
                    <th className="p-3" scope="col">ID</th>
                    <th className="p-3" scope="col">Name</th>
                    <th className="p-3" scope="col">NIC</th>
                    <th className="p-3" scope="col">Category</th>
                    <th className="p-3" scope="col">Doctor/Specialist</th>
                    
                  </tr>
                </thead>
                <tbody>
                  {this.state.appointments.map((appointment, index) => (
                    <tr
                      className="text-black bg-white hover:bg-gray-200 hover:text-black"
                      key={index}
                    >
                      <td className="text-center py-2 px-4">{index + 1}</td>
                      <td className="text-center py-2 px-4">{appointment.appointId}</td>
                      <td className="text-center py-2 px-4">{appointment.topic}</td>
                      <td className="text-center py-2 px-4">{appointment.description}</td>
                      <td className="text-center py-2 px-4">{appointment.postCategory}</td>
                      <td className="text-center py-2 px-4">{appointment.doctor}</td>
                      
                      {/* <td className="text-center py-2 px-4">
                        <a className="btn btn-warning" href={`/editAppointment/${appointment._id}`}>
                          <i className="fas fa-edit"></i>&nbsp;Edit
                        </a>
                        &nbsp;
                        <a className="btn btn-danger" href="#" onClick={() => this.onDelete(appointment._id)}>
                          <i className="fas fa-trash"></i>&nbsp;Delete
                        </a>
                      </td> */}
                    </tr>
                  ))}

                  {this.state.labApps.map((labApp, index) => (
                    <tr
                      className="text-black bg-white hover:bg-gray-200 hover:text-black"
                      key={index}
                    >
                      <td className="text-center py-2 px-4">{index + 1}</td>
                      <td className="text-center py-2 px-4">{labApp.labAppId}</td>
                      <td className="text-center py-2 px-4">{labApp.pname}</td>
                      <td className="text-center py-2 px-4">{labApp.nic}</td>
                      <td className="text-center py-2 px-4">{labApp.service}</td>
                      <td className="text-center py-2 px-4">{labApp.doctor}</td>
                      
                      {/* <td className="text-center py-2 px-4">
                        <a className="btn btn-warning" href={`/editAppointment/${appointment._id}`}>
                          <i className="fas fa-edit"></i>&nbsp;Edit
                        </a>
                        &nbsp;
                        <a className="btn btn-danger" href="#" onClick={() => this.onDelete(appointment._id)}>
                          <i className="fas fa-trash"></i>&nbsp;Delete
                        </a>
                      </td> */}
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