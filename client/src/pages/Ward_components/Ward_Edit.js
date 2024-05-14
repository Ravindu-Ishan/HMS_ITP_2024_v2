import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import TopNavWard from '../../components/TopNavWards';

const Ward_Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [ward_type, set_ward_type] = useState("");
  const [ward_ID, set_ward_ID] = useState("");
  const [bed_count, set_bed_count] = useState("");
  const [special_requirements, set_special_requirements] = useState("");
  const [inventory_details, set_inventory_details] = useState("");
  const [doctor_specialist_ID, set_doctor_specialist_ID] = useState("");
  const [doctor_specialist_name, set_doctor_specialist_name] = useState("");
  const [nurse_other_staff_ID, set_nurse_other_staff_ID] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/ward/${id}`);
        if (response.data.success) {

          const { ward_type, ward_ID, bed_count, special_requirements, inventory_details, doctor_specialist_ID, doctor_specialist_name, nurse_other_staff_ID } = response.data.ward;

          set_ward_type(ward_type);
          set_ward_ID(ward_ID);
          set_bed_count(bed_count);
          set_special_requirements(special_requirements);
          set_inventory_details(inventory_details);
          set_doctor_specialist_ID(doctor_specialist_ID);
          set_doctor_specialist_name(doctor_specialist_name);
          set_nurse_other_staff_ID(nurse_other_staff_ID);

        } else {
          console.error('Failed to fetch ward data:', response.data.error);
        }
      } catch (error) {
        console.error('Error fetching ward:', error);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "ward_type":
        set_ward_type(value);
        break;
      case "ward_ID":
        set_ward_ID(value);
        break;
      case "bed_count":
        set_bed_count(value);
        break;
      case "special_requirements":
        set_special_requirements(value);
        break;
      case "inventory_details":
        set_inventory_details(value);
        break;
      case "doctor_specialist_ID":
        set_doctor_specialist_ID(value);
        break;
      case "doctor_specialist_name":
        set_doctor_specialist_name(value);
        break;
      case "nurse_other_staff_ID":
        set_nurse_other_staff_ID(value);
        break;
      default:
        break;
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = {
        ward_type,
        ward_ID,
        bed_count,
        special_requirements,
        inventory_details,
        doctor_specialist_ID,
        doctor_specialist_name,
        nurse_other_staff_ID
      };

      const response = await axios.put(`/ward/update/${id}`, data);
      if (response.data.success) {
        alert("Ward Updated Successfully");
        set_ward_type("");
        set_ward_ID("");
        set_bed_count("");
        set_special_requirements("");
        set_inventory_details("");
        set_doctor_specialist_ID("");
        set_doctor_specialist_name("");
        set_nurse_other_staff_ID("");

        navigate(-1);
      } else {
        console.error('Failed to update ward:', response.data.error);
      }
    } catch (error) {
      console.error('Error updating ward:', error);
    }
  };

  return (
    <>
      <div className="navarea">
        <TopNavWard />
      </div>
      <main>

        <div className="col-md-8 mt-4 mx-auto">

          <form className="needs-validation" noValidate>
            <h1 className="text-3xl font-bold text-gray-800 ml-2">Edit Ward Details</h1>

            <form className="max-w-sm mx-auto">
              <div className="form-group mb-5">
                <label htmlFor="wardType" className="mb-1 block text-gray-600 font-medium">Ward Type</label>
                <div className="relative">
                  <select
                    className="form-control rounded-full border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 pl-4 pr-12 py-2 w-full"
                    id="wardType"
                    name="ward_type"
                    value={ward_type}
                    onChange={handleInputChange}
                  >
                    {/* List of options for ward types */}
                    <option value="">Select ward type</option>
                    <option value="General">General</option>
                    <option value="ICU">ICU</option>
                    <option value="Pediatrics">Pediatrics</option>
                    <option value="Surgery">Surgery</option>
                    <option value="Maternity">Maternity</option>
                    <option value="Orthopedic">Orthopedic</option>
                    <option value="Cardiology">Cardiology</option>
                    <option value="Psychiatric">Psychiatric</option>
                  </select>
                </div>
              </div>


              <div className="form-group mb-5">
                <label htmlFor="wardID" className="mb-1 block text-gray-600 font-medium">Ward ID</label>
                <div className="relative">
                  <input
                    type="text"
                    className="form-control rounded-full border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 pl-4 pr-12 py-2 w-full"
                    id="wardID"
                    name="ward_ID"
                    placeholder="Enter ward ID"
                    value={ward_ID}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="form-group mb-5">
                <label htmlFor="BedCount" className="mb-1 block text-gray-600 font-medium">Bed Count</label>
                <div className="relative">
                  <input
                    type="number"
                    className="form-control rounded-full border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 pl-4 pr-12 py-2 w-full"
                    id="BedCount"
                    name="bed_count"
                    placeholder="Enter bed count"
                    value={bed_count}
                    onChange={handleInputChange}
                    min="0"
                  />
                </div>
              </div>

              <div className="form-group mb-5">
                <label htmlFor="specialRequirements" className="mb-1 block text-gray-600 font-medium">Special Requirements</label>
                <div className="relative">
                  <input
                    type="text"
                    className="form-control rounded-full border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 pl-4 pr-12 py-2 w-full"
                    id="specialRequirements"
                    name="special_requirements"
                    placeholder="Enter special requirements"
                    value={special_requirements}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="form-group mb-5">
                <label htmlFor="inventoryDetails" className="mb-1 block text-gray-600 font-medium">Inventory Details</label>
                <div className="relative">
                  <input
                    type="text"
                    className="form-control rounded-full border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 pl-4 pr-12 py-2 w-full"
                    id="inventoryDetails"
                    name="inventory_details"
                    placeholder="Enter inventory details"
                    value={inventory_details}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="form-group mb-5">
                <label htmlFor="DoctorSpecialistID" className="mb-1 block text-gray-600 font-medium">Doctor/Specialist ID</label>
                <div className="relative">
                  <input
                    type="text"
                    className="form-control rounded-full border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 pl-4 pr-12 py-2 w-full"
                    id="DoctorSpecialistID"
                    name="doctor_specialist_ID"
                    placeholder="Enter doctor/specialist ID"
                    value={doctor_specialist_ID}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="form-group mb-5">
                <label htmlFor="DoctorSpecialistName" className="mb-1 block text-gray-600 font-medium">Doctor/Specialist Name</label>
                <div className="relative">
                  <input
                    type="text"
                    className="form-control rounded-full border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 pl-4 pr-12 py-2 w-full"
                    id="DoctorSpecialistName"
                    name="doctor_specialist_name"
                    placeholder="Enter doctor/specialist name"
                    value={doctor_specialist_name}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="form-group mb-5">
                <label htmlFor="NurseOtherStaffIDs" className="mb-1 block text-gray-600 font-medium">Nurses/Other Staff Member IDs</label>
                <div className="relative">
                  <input
                    type="text"
                    className="form-control rounded-full border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 pl-4 pr-12 py-2 w-full"
                    id="NurseOtherStaffIDs"
                    name="nurse_other_staff_ID"
                    placeholder="Enter IDs for nurses/other staff members"
                    value={nurse_other_staff_ID}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <button
                className="text-white bg-blue-700 hover:bg-blue-800  font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2"
                type="submit"
                style={{ marginTop: '15px' }}
                onClick={onSubmit}
              >
                <i className="far fa-check-square"></i>
                &nbsp; Update & Save
              </button>
            </form>
          </form>
        </div>
      </main>
    </>

  );
};

export default Ward_Edit;
