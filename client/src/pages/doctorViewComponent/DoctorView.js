import React, { useEffect, useState } from "react";
import axios from "axios";
import TopNavUser from "../../components/TopNavUser";

const DoctorView = () => {
  const [appointments, setAppointments] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    retrieveAppointments();
  }, []);

  const retrieveAppointments = () => {
    axios
      .get("/appointments")
      .then((res) => {
        if (res.data.success) {
          setAppointments(res.data.existingAppointments);
        }
      })
      .catch((error) => {
        console.error("Error fetching appointments:", error);
      });
  };

  const handleSearchArea = (e) => {
    const searchKey = e.currentTarget.value.toLowerCase();
    setSearchQuery(searchKey);
  };

  const filterAppointments = () => {
    return appointments.filter(
      (appointment) =>
        appointment.doctor.toLowerCase().includes(searchQuery) ||
        appointment.topic.toLowerCase().includes(searchQuery) ||
        appointment.description.toLowerCase().includes(searchQuery)
    );
  };

  const onDelete = (id) => {
    axios
      .delete(`/appointment/delete/${id}`)
      .then((res) => {
        alert("Deleted Successfully");
        retrieveAppointments();
      })
      .catch((error) => {
        console.error("Error deleting appointment:", error);
      });
  };

  return (
    <>
      <div className="navarea">
        <TopNavUser />
      </div>

      <main>
        <div className="container">
          <div className="row">
            <div className="col-lg-9 mt-2 mb-2">
              <h4 className="text-2xl font-bold text-gray-800 ml-2">
                Appointments
              </h4>
              <div className="col-lg-3 mt-2 mb-2">
                <input
                  className="appearance-none block w-300 bg-white border border-gray-200 rounded-xl py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="search"
                  placeholder="Search"
                  name="searchQuery"
                  onChange={handleSearchArea}
                />
              </div>
            </div>
          </div>

          <div className="table-responsive overflow-x-auto sm:rounded-lg tablestyle">
            <table className="w-full text-sm border-separate border-spacing-x-0 border-spacing-y-2 text-gray-500 table table-striped table-bordered">
              <thead className="text-xs text-gray-700 uppercase bg-white thead-dark">
                <tr>
                  <th className="p-3" scope="col">
                    #
                  </th>

                  {/* <th className="p-3" scope="col">
                    Doctor/Specialist
                  </th> */}
                  
                  <th className="p-3" scope="col">
                    Appointment ID
                  </th>
                  <th className="p-3" scope="col">
                    Patient's Name
                  </th>
                  <th className="p-3" scope="col">
                    Patient's NIC
                  </th>
                  <th className="p-3" scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {filterAppointments().map((appointment, index) => (
                  <tr
                    className="text-gray-600 bg-white hover:bg-gray-200 hover:text-black"
                    key={index}
                  >
                    <td className="text-center py-2 px-4">{index + 1}</td>

                    {/* <td className="text-center py-2 px-4">{appointment.doctor}</td> */}

                    <td className="text-center py-2 px-4">
                      <a href={`/doctorPatientView/${appointment._id}`} style={{ textDecoration: 'none' }}>
                        {appointment.appointId}
                      </a>
                    </td>
                    <td className="text-center py-2 px-4">{appointment.topic}</td>
                    <td className="text-center py-2 px-4">{appointment.description}</td>
                    <td>
                      <a
                        className="text-blue-600 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2"
                        href={`/doctorReschedule/${appointment._id}`}
                      >
                        <i className="fas fa-edit"></i>&nbsp;Reschedule
                      </a>
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
};

export default DoctorView;
