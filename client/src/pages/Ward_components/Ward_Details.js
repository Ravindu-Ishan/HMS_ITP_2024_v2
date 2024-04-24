import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

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
        <div style={{ marginTop: '20px' }}>
            <h2>Ward: {ward_ID}</h2>
            <dl className="row">
                <dt className="col-sm-3">Ward Type</dt>
                <dd className="col-sm-9">{ward_type}</dd>

                <dt className="col-sm-3">Bed Count</dt>
                <dd className="col-sm-9">{bed_count}</dd>

                <dt className="col-sm-3">Special Requirements</dt>
                <dd className="col-sm-9">{special_requirements}</dd>

                <dt className="col-sm-3">Inventory Details</dt>
                <dd className="col-sm-9">{inventory_details}</dd>

                <dt className="col-sm-3">Doctor/Specialist ID</dt>
                <dd className="col-sm-9">{doctor_specialist_ID}</dd>

                <dt className="col-sm-3">Doctor/Specialist Name</dt>
                <dd className="col-sm-9">{doctor_specialist_name}</dd>

                <dt className="col-sm-3">Nurse/Other Staff Member IDs</dt>
                <dd className="col-sm-9">{nurse_other_staff_ID}</dd>
                
            </dl>
        </div>
    );
};

export default Ward_Details;
