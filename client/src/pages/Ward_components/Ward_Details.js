import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import TopNavWard from '../../components/TopNavWards';

const Ward_Details = () => {
    const { id } = useParams();
    const [ward, setWard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Wrap fetchWardDetails in useCallback to keep a stable reference
    const fetchWardDetails = useCallback(async () => {
        try {
            const response = await axios.get(`/ward/${id}`);
            if (response.data.success) {
                setWard(response.data.ward);
            } else {
                setError('Failed to fetch data');
            }
        } catch (error) {
            console.error('Error fetching ward:', error);
            setError('An error occurred while fetching data.');
        } finally {
            setLoading(false);
        }
    }, [id]);

    // Call fetchWardDetails when component mounts or when `id` changes
    useEffect(() => {
        if (id) {
            fetchWardDetails();
        }
    }, [id, fetchWardDetails]);

    // Loading state
    if (loading) {
        return <div>Loading...</div>;
    }

    // Error state
    if (error) {
        return <div>{error}</div>;
    }

    // Data not found state
    if (!ward) {
        return <div>Data not found.</div>;
    }

    // Destructure ward properties
    const {
        ward_type,
        ward_ID,
        bed_count,
        special_requirements,
        inventory_details,
        doctor_specialist_ID,
        doctor_specialist_name,
        nurse_other_staff_ID,
    } = ward;

    // Render the ward details
    return (

        <>
            <div className="navarea">
                <TopNavWard />
            </div>

            <main>
                <div className="mt-6 bg-green-100 rounded-lg p-6">
                    <h2 className="text-2xl font-bold mb-4">Ward : {ward_ID}</h2>
                    <dl>
                        <div className="grid grid-cols-1 gap-6">
                            <div className="col-span-1 bg-white rounded-lg p-4 border border-black">
                                <dt className="font-semibold text-gray-700">Ward Type</dt>
                                <dd className="mt-1">{ward_type}</dd>
                            </div>

                            <div className="col-span-1 bg-white rounded-lg p-4 border border-black">
                                <dt className="font-semibold text-gray-700">Bed Count</dt>
                                <dd className="mt-1">{bed_count}</dd>
                            </div>

                            <div className="col-span-1 bg-white rounded-lg p-4 border border-black">
                                <dt className="font-semibold text-gray-700">Special Requirements</dt>
                                <dd className="mt-1">{special_requirements}</dd>
                            </div>

                            <div className="col-span-1 bg-white rounded-lg p-4 border border-black">
                                <dt className="font-semibold text-gray-700">Inventory Details</dt>
                                <dd className="mt-1">{inventory_details}</dd>
                            </div>

                            <div className="col-span-1 bg-white rounded-lg p-4 border border-black">
                                <dt className="font-semibold text-gray-700">Doctor/Specialist ID</dt>
                                <dd className="mt-1">{doctor_specialist_ID}</dd>
                            </div>

                            <div className="col-span-1 bg-white rounded-lg p-4 border border-black">
                                <dt className="font-semibold text-gray-700">Doctor/Specialist Name</dt>
                                <dd className="mt-1">{doctor_specialist_name}</dd>
                            </div>

                            <div className="col-span-1 bg-white rounded-lg p-4 border border-black">
                                <dt className="font-semibold text-gray-700">Nurse/Other Staff Member IDs</dt>
                                <dd className="mt-1">{nurse_other_staff_ID}</dd>
                            </div>
                        </div>
                    </dl>
                </div>
            </main>
        </>
    );

};

export default Ward_Details;
