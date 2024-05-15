import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const LaboratoryDetails = () => {
  const { id } = useParams();
  const [laboratory, setLaboratory] = useState(null);

  useEffect(() => {
    if (id) {
      axios.get(`/laboratory/${id}`)
        .then((res) => {
          if (res.data.success) {
            setLaboratory(res.data.data);
          }
        })
        .catch((error) => {
          console.error('Error fetching laboratory:', error);
        });
    }
  }, [id]);

  useEffect(() => {
    console.log(laboratory);
  }, [laboratory]);

  if (!laboratory) {
    return <div>Loading...</div>;
  }

  const { patient_ID, patient_name, test_ID, doctor_info, test_type, test_description, test_date } = laboratory;

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold">{patient_name}</h2>
      <dl className="grid grid-cols-1 gap-y-4 sm:grid-cols-2">
        <div className="py-2">
          <dt className="text-gray-500">Patient ID</dt>
          <dd className="mt-1">{patient_ID}</dd>
        </div>
        <div className="py-2">
          <dt className="text-gray-500">Test ID</dt>
          <dd className="mt-1">{test_ID}</dd>
        </div>
        <div className="py-2">
          <dt className="text-gray-500">Doctor Information</dt>
          <dd className="mt-1">{doctor_info}</dd>
        </div>
        <div className="py-2">
          <dt className="text-gray-500">Test Type</dt>
          <dd className="mt-1">{test_type}</dd>
        </div>
        <div className="py-2">
          <dt className="text-gray-500">Test Description</dt>
          <dd className="mt-1">{test_description}</dd>
        </div>
        <div className="py-2">
          <dt className="text-gray-500">Test Date & Time</dt>
          <dd className="mt-1">{test_date}</dd>
        </div>
      </dl>
    </div>
  );
};

export default LaboratoryDetails;
