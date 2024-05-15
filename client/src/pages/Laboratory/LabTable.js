import React, { Component } from 'react';
import axios from 'axios';

export default class LaboratoryMain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            laboratory: [],
            errorMessage: '',
        };
    }

    componentDidMount() {
        this.retrievelaboratory();
    }

    // Get request
    retrievelaboratory() {
        axios.get('http://localhost:8000/laboratory')
            .then(res => {
                console.log(res.data);
                if (res.data.success) {
                    this.setState({
                        laboratory: res.data.existingLabData
                    });
                    console.log(this.state.laboratory);
                }
            })
            .catch(error => {
                console.error('There was an error fetching the data!', error);
                this.setState({ errorMessage: 'There was an error fetching the data!' });
            });
    }

    render() {
        const { laboratory, errorMessage } = this.state;

        return (
            <>
                <main className='bg-white'>
                    <div className="container">
                        <div className="bg-white"> {/* Adding this div for responsive table */}
                            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                            <table className="w-full text-sm border-separate border-spacing-x-0 border-spacing-y-2 text-black bg-white table table-striped table-bordered"> {/* Adding Bootstrap table classes */}
                                <thead className="text-xs text-black uppercase bg-white thead-dark"> {/* Adding dark background for table header */}
                                    <tr>
                                        <th className="p-3" scope="col">Index No</th>
                                        <th className="p-3" scope="col">Patient ID</th>
                                        <th className="p-3" scope="col">Test ID</th>
                                        <th className="p-3" scope="col">Doctor Information</th>
                                        <th className="p-3" scope="col">Test Type</th>
                                        <th className="p-3" scope="col">Test Description</th>
                                        <th className="p-3" scope="col">Test Date & Time</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {laboratory.map((labData, index) => (
                                        <tr
                                            className="text-black bg-white hover:bg-gray-200 hover:text-black"
                                            key={index}
                                        >
                                            <td className="text-center py-2 px-4">{index + 1}</td>
                                            <td className="text-center py-2 px-4">{labData.patient_ID}</td>
                                            <td className="text-center py-2 px-4">{labData.test_ID}</td>
                                            <td className="text-center py-2 px-4">{labData.doctor_info}</td>
                                            <td className="text-center py-2 px-4">{labData.test_type}</td>
                                            <td className="text-center py-2 px-4">{labData.test_description}</td>
                                            <td className="text-center py-2 px-4">{labData.test_date}</td>
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
