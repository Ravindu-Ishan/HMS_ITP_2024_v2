import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TopNavAppointment from '../../components/TopNavAppointment';

const DoctorAvailability = () => {
  const [shifts, setShifts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    retrieveShifts();
  }, []);

  const retrieveShifts = async () => {
    try {
      const response = await axios.get("/shift");
      if (response.data.success) {
        // Fetch staff data to map staff IDs to staff names
        const staffResponse = await axios.get("/get");
        const staffMap = {};
        staffResponse.data.data.forEach(staff => {
          staffMap[staff._id] = staff.staffName;
        });
  
        // Fetch doctor data to map smids to specialisations
        const doctorResponse = await Promise.all(
          response.data.existingPosts.map(async shift => {
            try {
              const doctorResponse = await axios.get(`/getDocDetails/${shift.smid}`);
              return { smid: shift.smid, specialisation: doctorResponse.data.specialisation };
            } catch (error) {
              console.error("Error fetching doctor details for shift:", shift.smid, error);
              return null; // Return null for shifts with missing doctor details
            }
          })
        );
        console.log("Doctor response:", doctorResponse);
  
        const doctorMap = {};
        doctorResponse.forEach(doctor => {
          if (doctor) {
            doctorMap[doctor.smid] = doctor.specialisation;
          }
        });
  
        // Map staff IDs to staff names and doctor specialisations in shift data
        const modifiedShifts = response.data.existingPosts.map(shift => ({
          ...shift,
          staffName: staffMap[shift.smid], // Replace smid with staffName
          specialisation: doctorMap[shift.smid] || "Not Available" // Add doctor's specialisation or a default value if not available
        }));
        setShifts(modifiedShifts);
      }
    } catch (error) {
      console.error("Error fetching shifts:", error);
    }
  };
  
  
  const handleSearchArea = (e) => {
    setSearchQuery(e.currentTarget.value.toLowerCase());
  };

  const filteredShifts = shifts.filter(shift =>
    shift.ScheduleDate.toLowerCase().includes(searchQuery) ||
    shift.specialisation.toLowerCase().includes(searchQuery) ||
    shift.staffName.toLowerCase().includes(searchQuery)
  );

  return (
    <>
      <div className='navarea'>
        <TopNavAppointment />
      </div>

      <main>
        <div className="container mt-10">
          
          <div className="row" style={{ display: 'flex', justifyContent: 'space-around' }}>
            <div className="col-lg-3 mt-2 mb-2">
              <input
                className="appearance-none block w-300 bg-white border border-gray-200 rounded-xl py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="search"
                placeholder="Doctor/Specialist"
                name="doctorSearchQuery"
                onChange={handleSearchArea} />
            </div>

            <div className="col-lg-3 mt-2 mb-2">
              <input
                className="appearance-none block w-300 bg-white border border-gray-200 rounded-xl py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="search"
                placeholder="Specialisation"
                name="specialisationSearchQuery"
                onChange={handleSearchArea} />
            </div>

            <div className="col-lg-3 mt-2 mb-2">
              <input
                className="appearance-none block w-300 bg-white border border-gray-200 rounded-xl py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="search"
                placeholder="Date"
                name="dateSearchQuery"
                onChange={handleSearchArea} />
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
                {filteredShifts
                .filter(shift => shift.specialisation !== 'Not Available') // Filter out rows with null specialisation
                .map((shift, index) => (
                  <tr className="text-gray-600 bg-white hover:bg-gray-200 hover:text-black" key={index}>
                    <td className="text-center py-2 px-4">{index + 1}</td>
                    <td className="text-center py-2 px-4">{shift.staffName}</td> {/* Display staffName instead of smid */}
                    <td className="text-center py-2 px-4">{shift.specialisation}</td>
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
};

export default DoctorAvailability;
