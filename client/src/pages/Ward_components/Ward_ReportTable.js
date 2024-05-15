import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Ward_ReportTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            beds: []
        };
    }

    componentDidMount() {
        this.retrieveBeds();
    }

    //get request
    retrieveBeds() {
        axios.get("/beds")
            .then(res => {
                if (res.data.success) {
                    this.setState({
                        beds: res.data.existingBeds
                    });
                    console.log(this.state.beds);
                }
            })
            .catch(error => {
                console.error('Error retrieving beds:', error);
            });
    }

    render() {
        return (
            <>
                <main className='bg-white'>
                    <div className="container">
                        <div className="bg-white">
                            <table className="table table-hover w-full text-sm border-separate border-spacing-x-0 border-spacing-y-2 text-gray-500" style={{ marginTop: '40px' }}>
                                <thead className="text-xs text-gray-700 uppercase bg-white">
                                    <tr>
                                        <th className="p-3" scope="col">#</th>
                                        <th className="p-3" scope="col">Ward ID</th>
                                        <th className="p-3" scope="col">Bed ID</th>
                                        <th className="p-3" scope="col">Bed Location</th>
                                        <th className="p-3" scope="col">Patient ID</th>
                                        <th className="p-3" scope="col">Patient Name</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.beds.map((beds, index) => (
                                        <tr key={index} className="text-gray-600 bg-white hover:bg-gray-200 hover:text-black">
                                            <th scope="row" className="text-center py-2 px-4">{index + 1}</th>

                                            <td className="text-center py-2 px-4">
                                                <Link
                                                    to={`/bedDetails/${beds._id}`}
                                                    style={{
                                                        textDecoration: 'none',
                                                        color: '#000', // Set the default text color
                                                        transition: 'color 0.3s', // Add transition effect for color change
                                                    }}
                                                    onMouseEnter={(e) => { e.target.style.color = '#007bff'; }} // Change color on hover
                                                    onMouseLeave={(e) => { e.target.style.color = '#000'; }} // Revert color on mouse leave
                                                >
                                                    {beds.ward_ID}
                                                </Link>
                                            </td>

                                            <td className="text-center py-2 px-4">{beds.bed_ID}</td>
                                            <td className="text-center py-2 px-4">{beds.bed_location}</td>
                                            <td className="text-center py-2 px-4">{beds.patient_ID}</td>
                                            <td className="text-center py-2 px-4">{beds.patient_name}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </main>
            </>
        );
    }
}
