import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

//import icons here
import { PiUserCircleFill } from "react-icons/pi";
import TopNavPatientProfile from '../../components/TopNavPatientProfile';


const PatientDetails = () => {
    const { id } = useParams();
    const [patient, setPatient] = useState(null);
    const [isDisabled, setIsDisabled] = useState(true); //form activation state

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/patient/${id}`);
                if (response.data.success) {
                    setPatient(response.data.patient);
                }
            } catch (error) {
                console.error('Error fetching patient:', error);
            }
        };

        if (id) {
            fetchData();
        }
    }, [id]);

    if (!patient) {
        return <div>Loading...</div>;
    }

    const { description, topic, age, postCategory, medicalhistory } = patient;
    
    return (
        <>

        {/* top nav imported to this section */}
        <div className="navarea">
          <TopNavPatientProfile/>
        </div>
       <main> 

        <div className="bg-white border border-gray-200 rounded-[50px] shadow-lg p-10 m-5">
                <div className="text-xl ml-5 mb-5 font-bold text-gray-600">
                Basic Patient Info
                </div>
                <div className="md:flex">
                  <div className="ml-10 mr-20">
                    <PiUserCircleFill className="text-[150px] text-slate-700" />
                  </div>
                  <div className=" flex-grow">
                    <form className="transparentClass">
                      <fieldset disabled={isDisabled}>
                        <div className="md:flex md:items-center ">
                          <div className="md:w-1/5">
                            <label className="block text-gray-600 font-bold md:text-left mb-1 md:mb-0 ">
                            Patient's Name
                            </label>
                          </div>
                          <div className="md:w-2/3">
                            <input
                              className=" w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none disabled:border-0 border-b-2 border-gray-200"
                              type="text"
                              value={description}
                              onChange={(e) => description(e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="md:flex md:items-center ">
                          <div className="md:w-1/5">
                            <label className="block text-gray-600 font-bold md:text-left mb-1 md:mb-0 ">
                            NIC
                            </label>
                          </div>
                          <div className=" md:w-2/3">
                            <input
                              className=" w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none disabled:border-0 border-b-2 border-gray-200"
                              type="text"
                              value={topic}
                              onChange={(e) => topic(e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="md:flex md:items-center ">
                          <div className=" md:w-1/5">
                            <label className="block text-gray-600 font-bold md:text-left mb-1 md:mb-0 ">
                            Age
                            </label>
                          </div>
                          <div className="md:w-2/3">
                            <input
                              className=" w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none disabled:border-0 border-b-2 border-gray-200"
                              type="text"
                              value={age}
                              onChange={(e) => age(e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="md:flex md:items-center ">
                          <div className="md:w-1/5">
                            <label className="block text-gray-600 font-bold md:text-left mb-1 md:mb-0 ">
                            Contact No
                            </label>
                          </div>
                          <div className="md:w-2/3">
                            <input
                              className=" w-full py-2 px-4 text-gray-700 leading-tight focus:outline-blue-100 focus:border-1"
                              type="text"
                              value={postCategory}
                              onChange={(e) => postCategory(e.target.value)}
                              disabled
                            />
                          </div>
                        </div>
                      </fieldset>
                      

                      </form>
                      </div>
                    </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-[50px] shadow-lg p-10 m-5">
                <div className="text-xl ml-5 mb-5 font-bold text-gray-600">
                Past Medical Info
                </div>
                <div>
                        
                        <hr />
                        <dl className="row">
                            <div className="row">
                                
                                <dd className="col-sm-9">
                                    {medicalhistory.split('\n').map((line, index) => (
                                        <div key={index}>{line}</div>
                                    ))}
                                </dd>
                            </div>
                        </dl>
                    </div>

                </div>
              </main>
              
        </>
    );
};

export default PatientDetails;

            
            
            