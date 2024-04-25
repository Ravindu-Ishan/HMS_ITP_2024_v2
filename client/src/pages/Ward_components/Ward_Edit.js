import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import TopNavWard from '../../components/TopNavWards';

const Ward_Edit = () => {
  const { id } = useParams();

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
          <h1 className="h3 mb-3 font-weight-normal">Edit Ward Details</h1>
          <form className="needs-validation" noValidate>

            <div className="form-group" style={{ marginBottom: '15px' }}>
              <label htmlFor="wardType" style={{ marginBottom: '5px' }}>Ward Type</label>
              <select
                className="form-control"
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

            <div className="form-group" style={{ marginBottom: '15px' }}>
              <label htmlFor="wardID" style={{ marginBottom: '5px' }}>Ward ID</label>
              <input
                type="text"
                className="form-control"
                id="wardID"
                name="ward_ID"
                placeholder="Enter ward_ID"
                value={ward_ID}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group" style={{ marginBottom: '15px' }}>
              <label htmlFor="BedCount" style={{ marginBottom: '5px' }}>Bed Count</label>
              <input
                type="number"
                className="form-control"
                id="BedCount"
                name="bed_count"
                placeholder="Enter bed_count"
                value={bed_count}
                onChange={handleInputChange}
                min="0"
              />
            </div>

            <div className="form-group" style={{ marginBottom: '15px' }}>
              <label htmlFor="specialRequirements" style={{ marginBottom: '5px' }}>Special Requirements</label>
              <input
                type="text"
                className="form-control"
                id="specialRequirements"
                name="special_requirements"
                placeholder="Enter special_requirements"
                value={special_requirements}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group" style={{ marginBottom: '15px' }}>
              <label htmlFor="inventoryDetails" style={{ marginBottom: '5px' }}>Inventory Details</label>
              <input
                type="text"
                className="form-control"
                id="inventoryDetails"
                name="inventory_details"
                placeholder="Enter inventory_details"
                value={inventory_details}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group" style={{ marginBottom: '15px' }}>
              <label htmlFor="DoctorSpecialistID" style={{ marginBottom: '5px' }}>Doctor/Specialist ID</label>
              <input
                type="text"
                className="form-control"
                id="DoctorSpecialistID"
                name="doctor_specialist_ID"
                placeholder="Enter doctor_specialist_ID"
                value={doctor_specialist_ID}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group" style={{ marginBottom: '15px' }}>
              <label htmlFor="DoctorSpecialistName" style={{ marginBottom: '5px' }}>Doctor/Specialist Name</label>
              <input
                type="text"
                className="form-control"
                id="DoctorSpecialistName"
                name="doctor_specialist_name"
                placeholder="Enter doctor_specialist_name"
                value={doctor_specialist_name}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group" style={{ marginBottom: '15px' }}>
              <label htmlFor="NurseOtherStaffIDs" style={{ marginBottom: '5px' }}>Nurses/Other Staff Member IDs</label>
              <input
                type="text"
                className="form-control"
                id="NurseOtherStaffIDs"
                name="nurse_other_staff_ID"
                placeholder="Enter nurse_other_staff_ID"
                value={nurse_other_staff_ID}
                onChange={handleInputChange}
              />
            </div>

            <button
              className="btn btn-success"
              type="submit"
              style={{ marginTop: '15px' }}
              onClick={onSubmit}
            >
              <i className="far fa-check-square"></i>
              &nbsp; Update & Save
            </button>
          </form>
        </div>
      </main>
    </>
  );
};

export default Ward_Edit;
