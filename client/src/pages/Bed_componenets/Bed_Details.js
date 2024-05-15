import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import TopNavWard from '../../components/TopNavWards';

const Bed_Details = () => {
    const { id } = useParams();
    const [bed, setBed] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Wrap fetchWardDetails in useCallback to keep a stable reference
    const fetchBedDetails = useCallback(async () => {
        try {
            const response = await axios.get(`/bed/${id}`);
            if (response.data.success) {
                setBed(response.data.bed);
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

    // Call fetchBedDetails when component mounts or when `id` changes
    useEffect(() => {
        if (id) {
            fetchBedDetails();
        }
    }, [id, fetchBedDetails]);

    // Loading state
    if (loading) {
        return <div>Loading...</div>;
    }

    // Error state
    if (error) {
        return <div>{error}</div>;
    }

    // Data not found state
    if (!bed) {
        return <div>Data not found.</div>;
    }

    // Destructure bed properties
    const {
        patient_ID,
        patient_name,
        ward_ID,
        bed_ID,
        bed_location,
    } = bed;

    // Render the ward details
    return (
        <>
            <div className="navarea">
                <TopNavWard />
            </div>

            <main>
                    <div className="mt-6 bg-green-100 rounded-lg p-6">
                        <h2 className="text-2xl font-bold mb-4">Patient ID : {patient_ID}</h2>
                        <dl>
                            <div className="grid grid-cols-1 gap-6">
                                <div className="col-span-1 bg-white rounded-lg p-4 border border-black">
                                    <dt className="font-semibold text-gray-700">Patient Name</dt>
                                    <dd className="mt-1">{patient_name}</dd>
                                </div>

                                <div className="col-span-1 bg-white rounded-lg p-4 border border-black">
                                    <dt className="font-semibold text-gray-700">Ward ID</dt>
                                    <dd className="mt-1">{ward_ID}</dd>
                                </div>

                                <div className="col-span-1 bg-white rounded-lg p-4 border border-black">
                                    <dt className="font-semibold text-gray-700">Bed ID</dt>
                                    <dd className="mt-1">{bed_ID}</dd>
                                </div>

                                <div className="col-span-1 bg-white rounded-lg p-4 border border-black">
                                    <dt className="font-semibold text-gray-700">Bed Location</dt>
                                    <dd className="mt-1">{bed_location}</dd>
                                </div>
                            </div>
                        </dl>
                    </div>
            </main>
        </>
    );

};

export default Bed_Details;
