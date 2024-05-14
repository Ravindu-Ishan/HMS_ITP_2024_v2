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
    
            <main className="container mx-auto mt-6">
                <div className="mt-6">
                    <h2 className="text-2xl font-bold mb-4">Ward: {ward_ID}</h2>
                    <dl className="grid grid-cols-3 gap-6">
                        <dt className="font-semibold text-gray-700">Ward Type</dt>
                        <dd className="col-span-2">{ward_type}</dd>
    
                        <dt className="font-semibold text-gray-700">Bed Count</dt>
                        <dd className="col-span-2">{bed_count}</dd>
    
                        <dt className="font-semibold text-gray-700">Special Requirements</dt>
                        <dd className="col-span-2">{special_requirements}</dd>
    
                        <dt className="font-semibold text-gray-700">Inventory Details</dt>
                        <dd className="col-span-2">{inventory_details}</dd>
    
                        <dt className="font-semibold text-gray-700">Doctor/Specialist ID</dt>
                        <dd className="col-span-2">{doctor_specialist_ID}</dd>
    
                        <dt className="font-semibold text-gray-700">Doctor/Specialist Name</dt>
                        <dd className="col-span-2">{doctor_specialist_name}</dd>
    
                        <dt className="font-semibold text-gray-700">Nurse/Other Staff Member IDs</dt>
                        <dd className="col-span-2">{nurse_other_staff_ID}</dd>
                    </dl>
                </div>
            </main>
        </>
    );
    
};

export default Ward_Details;
