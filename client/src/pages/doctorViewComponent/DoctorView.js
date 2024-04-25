
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const DoctorView = ({ doctor }) => {
//   const [appointments, setAppointments] = useState([]);

//   useEffect(() => {
//     const fetchAppointments = async () => {
//       try {
//         const response = await axios.get(`/appointments/${doctor}`);
//         setAppointments(response.data);
//       } catch (error) {
//         console.error('Error fetching appointments:', error);
//       }
//     };

//     fetchAppointments();
//   }, [doctor]);

//   return (
//     <div>
//       <h2>{doctor}'s Appointments</h2>
//       <ul>
//         {appointments.map((appointment) => (
//           <li key={appointment._id}>
//             {/* Display appointment details */}
//             `${appointment.topic} - ${appointment.description}`
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default DoctorView;


import React, { Component } from 'react';
import axios from 'axios';


export default class DoctorView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      appointments:[],
      //selectedDoctor: null // Add selected doctor state
    };
  }

  componentDidMount(){
    this.retrievePosts();
  }


  //get request
  retrievePosts(){
    axios.get("/appointments").then(res =>{
      if(res.data.success){
        this.setState({
          appointments:res.data.existingAppointments
        });

        console.log(this.state.appointments);
      }
    });
  }


  // // Function to filter appointments by selected doctor
  // filterAppointmentsByDoctor(doctor) {
  //   return this.state.posts.filter(post => post.doctor === doctor);
  // }

  // // Handler for selecting a doctor
  // handleDoctorSelect = (doctor) => {
  //   this.setState({ selectedDoctor: doctor });
  // }



  onDelete = (id) =>{

    axios.delete(`/appointment/delete/${id}`).then((res) =>{
      alert("Delete successfully");
      this.retrievePosts();
    })
  }


  filterData(appointments,searchKey){

    const result = appointments.filter((appointment) =>
      appointment.doctor.toLowerCase().includes(searchKey) 
    )

    this.setState({appointments:result})

  }


  handleSearchArea = (e) =>{

    const searchKey = e.currentTarget.value;

    axios.get("/appointments").then(res =>{
      if(res.data.success){
        this.filterData(res.data.existingAppointments, searchKey)
      }
    });

  }

  render() {
    //const { selectedDoctor } = this.state;
    return (

      <div className="container">

        <div className="row">
          <div className="col-lg-4 mt-2 mb-2">
          <h4>Doctor's Appointments</h4>
          </div>

          <div className="col-lg-3 mt-2 mb-2">
            <input
            className="form-control"
            type="search"
            placeholder="Filter here"
            name="searchQuery"
            onChange={this.handleSearchArea}>

            </input>
          </div>
        </div>
        
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Doctor/Specialist</th>
              <th scope="col">Patient's ID</th>
              <th scope="col">Patient's Name</th>
              <th scope="col">Patient's NIC</th>
              <th scope="col"></th>

            </tr>
          </thead>
          <tbody>
          {this.state.appointments.map((appointments, index) => (
            <tr key={index}>
              <th scope="row">{index+1}</th>

              <td>
                 {appointments.doctor}
                
              </td>

              <td>
                <a href={`/doctorPatientView/${appointments._id}`} style={{textDecoration:'none'}}>
                {appointments._id}
                </a>
                
              </td>

              <td>{appointments.topic}</td>
              <td>{appointments.description}</td>
             
              <td>
                <a className="btn btn-warning" href={`/doctorReschedule/${appointments._id}`}>
                  <i className="fas fa-edit"></i>&nbsp;Reschedule
                </a>
                {/* &nbsp;
                <a className="btn btn-danger" href="#" onClick={() => this.onDelete(posts._id)}>
                  <i className="fas fa-trash"></i>&nbsp;Delete
                </a> */}
              </td>
            </tr>
          ))}
          </tbody>

        </table>

            {/* <button className="btn btn-success"><a href="/add" style={{textDecoration:'none', color:'white'}}> + New Appointment</a></button>
             */}
            {/* Render DoctorView for the selected doctor
          {selectedDoctor && (
          <DoctorView doctor={selectedDoctor} />
        )} */}

      </div>
    );
  }
}

//export default MyComponent;