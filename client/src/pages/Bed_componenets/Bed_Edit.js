import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import TopNavWard from '../../components/TopNavWards';

const Bed_Edit = () => {
  const { id } = useParams();

  const [patient_ID, set_patient_ID] = useState("");
  const [patient_name, set_patient_name] = useState("");
  const [ward_ID, set_ward_ID] = useState("");
  const [bed_ID, set_bed_ID] = useState("");
  const [bed_location, set_bed_location] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/bed/${id}`);
        if (response.data.success) {

          const { patient_ID, patient_name, ward_ID, bed_ID, bed_location } = response.data.bed;

          set_patient_ID(patient_ID);
          set_patient_name(patient_name);
          set_ward_ID(ward_ID);
          set_bed_ID(bed_ID);
          set_bed_location(bed_location);

        } else {
          console.error('Failed to fetch bed data:', response.data.error);
        }
      } catch (error) {
        console.error('Error fetching bed:', error);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "patient_ID":
        set_patient_ID(value);
        break;
      case "patient_name":
        set_patient_name(value);
        break;
      case "ward_ID":
        set_ward_ID(value);
        break;
      case "bed_ID":
        set_bed_ID(value);
        break;
      case "bed_location":
        set_bed_location(value);
        break;
      default:
        break;
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = {
        patient_ID,
        patient_name,
        ward_ID,
        bed_ID,
        bed_location
      };

      const response = await axios.put(`/bed/update/${id}`, data);
      if (response.data.success) {
        alert("Beds Updated Successfully");
        set_patient_ID("");
        set_patient_name("");
        set_ward_ID("");
        set_bed_ID("");
        set_bed_location("");
      } else {
        console.error('Failed to update bed:', response.data.error);
      }
    } catch (error) {
      console.error('Error updating bed:', error);
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
            <h1 className="text-3xl font-bold text-gray-800 ml-2">Edit Patient Details</h1>

            <form className="max-w-sm mx-auto">
              
              <div className="form-group mb-5">
                <label htmlFor="patientID" className="mb-1 block text-gray-600 font-medium">Patient ID</label>
                <input
                  type="text"
                  className="form-control rounded-full border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 pl-4 pr-12 py-2 w-full"
                  id="patientID"
                  name="patient_ID"
                  placeholder="Enter patient_ID"
                  value={patient_ID}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group mb-5">
                <label htmlFor="patientName" className="mb-1 block text-gray-600 font-medium">Patient Name</label>
                <input
                  type="text"
                  className="form-control rounded-full border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 pl-4 pr-12 py-2 w-full"
                  id="patientName"
                  name="patient_name"
                  placeholder="Enter patient_name"
                  value={patient_name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group mb-5">
                <label htmlFor="wardID" className="mb-1 block text-gray-600 font-medium">Ward ID</label>
                <input
                  type="text"
                  className="form-control rounded-full border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 pl-4 pr-12 py-2 w-full"
                  id="wardID"
                  name="ward_ID"
                  placeholder="Enter ward_ID"
                  value={ward_ID}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group mb-5">
                <label htmlFor="bedID" className="mb-1 block text-gray-600 font-medium">Bed ID</label>
                <input
                  type="text"
                  className="form-control rounded-full border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 pl-4 pr-12 py-2 w-full"
                  id="bedID"
                  name="bed_ID"
                  placeholder="Enter bed_ID"
                  value={bed_ID}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group mb-5">
                <label htmlFor="bedLocation" className="mb-1 block text-gray-600 font-medium">Bed Location</label>
                <input
                  type="text"
                  className="form-control rounded-full border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 pl-4 pr-12 py-2 w-full"
                  id="bedLocation"
                  name="bed_location"
                  placeholder="Enter bed_location"
                  value={bed_location}
                  onChange={handleInputChange}
                />
              </div>
              <button
                className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2"
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

export default Bed_Edit;
