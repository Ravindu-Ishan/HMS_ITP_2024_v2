import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import TopNavAppointmet from '../../components/TopNavAppointment';

const AppointmentDetails = () => {
  const { id } = useParams();
  const [appointment, setAppointment] = useState(null);

  //to fetch the details
  useEffect(() => {
    axios.get(`/appointment/${id}`).then((res) => {
      if (res.data.success) {
        setAppointment(res.data.appointment);
        console.log(appointment);
      }
    });
  }, [id]);

  if (!appointment) {
    return <div>Loading...</div>;
  }

  const { topic, description, dateOfBirth, age } = appointment;

  return (
    <>
      <div className='navarea'>
        <TopNavAppointmet />
      </div>

      <main>
        <div className='max-w-3xl mx-auto'>

          {/* <button className="btn btn-success"><a href="#" style={{ textDecoration: 'none', color: 'white' }}>Patient History</a></button> */}

          <h2 className='text-2xl font-bold mb-4'>{topic}</h2>

          <dl className='gap-y-4 gap-x-8 bg-white sm:rounded-lg p-5'>
            
            <div className='mb-4 ml-5'>
              <dt className='text-sm font-medium text-gray-500'>Patients' Name</dt>
              <dd className='mt-1 text-lg font-semibold'>{topic}</dd>
            </div>

            <div className='mb-4 ml-5'>
              <dt className='text-sm font-medium text-gray-500'>NIC</dt>
              <dd className='mt-1 text-lg font-semibold'>{description}</dd>
            </div>

            <div className='mb-4 ml-5'>
              <dt className='text-sm font-medium text-gray-500'>Birth Date</dt>
              <dd className='mt-1 text-lg font-semibold'>{dateOfBirth}</dd>
            </div>

            <div className='mb-4 ml-5'>
              <dt className='text-sm font-medium text-gray-500'>Age</dt>
              <dd className='mt-1 text-lg font-semibold'>{age}</dd>
            </div>

          </dl>

        </div>
      </main>
    </>
  );

};


export default AppointmentDetails;
