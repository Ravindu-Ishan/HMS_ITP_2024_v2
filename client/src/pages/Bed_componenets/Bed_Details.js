import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

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
        <div style={{ marginTop: '20px' }}>
            <h2>Patient ID: {patient_ID}</h2>
            <dl className="row">
                <dt className="col-sm-3">Patient Name</dt>
                <dd className="col-sm-9">{patient_name}</dd>

                <dt className="col-sm-3">ward ID</dt>
                <dd className="col-sm-9">{ward_ID}</dd>

                <dt className="col-sm-3">Bed ID</dt>
                <dd className="col-sm-9">{bed_ID}</dd>

                <dt className="col-sm-3">Bed Location</dt>
                <dd className="col-sm-9">{bed_location}</dd>
                
            </dl>
        </div>
    );
};

export default Bed_Details;
