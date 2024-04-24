import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams} from 'react-router-dom';

const ShiftDetails = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        if(id) {
            axios.get(`/shift/getbyID/${id}`)
                .then((res) => {
                    if(res.data.success) {
                        setPost(res.data.post);
                    }
                })
                .catch((error) => {
                    console.error('Error fetching post:',error);
                });
        }
    }, [id]);
    

    useEffect(() => {
        console.log(post);
    }, [post]);

    if (!post) {
        return <div>Loading...</div>;
    }
    

        const { topic, description, postCategory, DoctorsName, Location, Time, Date } = post;
        return (
            <div style={{ marginTop: '20px' }}>
                <h4>{topic}</h4>
                <hr />
                <dl className="row">


                    <dt className="col-sm-3">Location</dt>
                    <dd className="col-sm-9">{Location}</dd>

                    <dt className="col-sm-3">Schedule Time</dt>
                    <dd className="col-sm-9">{Time}</dd>

                    <dt className="col-sm-3">Schedule Date</dt>
                    <dd className="col-sm-9">{Date}</dd>
                </dl>
            </div>
        );
    
};

export default ShiftDetails;