
    
    




import React, { Component } from 'react';
import axios from 'axios';

// Importing top navigation bar components
import TopNavPatient from '../../components/TopNavPatient';

export default class CreatePatient extends Component {
    constructor(props){
        super(props);
        this.state={
            description:"",
            topic:"",
            age:"",
            postCategory:"",
            medicalhistory:""
        }
    }

    handleInputChange = (e) =>{
        const { name, value } = e.target;

        this.setState({
            ...this.state,
            [name]: value
        });
    }

    allowOnlyLettersWithSpaces = (event) => {
        const keyCode = event.keyCode || event.which;
        const keyValue = String.fromCharCode(keyCode);
        const regex = /^[a-zA-Z\s]+$/; // Allows letters and spaces
        
        if (!regex.test(keyValue)) {
            event.preventDefault();
        }
    }
    
    allowOnlyNumbers = (event) => {
        const keyCode = event.keyCode || event.which;
        const keyValue = String.fromCharCode(keyCode);
        const regex = /^[0-9]+$/; // Only allows numbers
    
        if (!regex.test(keyValue)) {
            event.preventDefault();
        }
    }

    onSubmit = (e) =>{
        e.preventDefault();

        const { description, topic, age, postCategory, medicalhistory } = this.state;

        // Check if any field is empty
        if (!description || !topic || !age || !postCategory || !medicalhistory) {
            // Display error message
            alert("Please fill all fields");
            return;
        }

        const data = {
            description,
            topic,
            age,
            postCategory,
            medicalhistory
        };

        console.log(data);

        axios.post("/patient/save", data)
            .then((res) => {
                if (res.data.success) {
                    this.setState({
                        description: "",
                        topic: "",
                        age: "",
                        postCategory: "",
                        medicalhistory: ""
                    });
                }
            })
            .catch((error) => {
                console.error('Error creating patient:', error);
            });
    }

    render() {
        const { description, topic, age, postCategory, medicalhistory, errorMessage } = this.state;
        return (
        <>
            {/* Top navigation bar */}
            <div className="navarea">
                <TopNavPatient/>
            </div>
            <main>
                <div className="mx-auto max-w-lg p-8 shadow-lg rounded-lg">
                    <h1 className="text-2xl font-semibold mb-4 text-center">Create New Patient</h1>
                    <form className="space-y-4" onSubmit={this.onSubmit}>
                        <div>
                            <label htmlFor="description" className="block mb-1">Patient's Name</label>
                            <input
                                type="text"
                                className="form-input rounded"
                                id="description"
                                name="description"
                                placeholder="Enter Patient's Name"
                                maxLength={50}
                                value={description}
                                onChange={this.handleInputChange}
                                onKeyPress={(event) => this.allowOnlyLettersWithSpaces(event)}
                            />
                        </div>
                        <div>
                            <label htmlFor="topic" className="block mb-1">NIC</label>
                            <input
                                type="text"
                                className="form-input rounded"
                                id="topic"
                                name="topic"
                                placeholder="Enter NIC No"
                                maxLength={12}
                                value={topic}
                                onChange={this.handleInputChange}
                                onKeyPress={(event) => this.allowOnlyNumbers(event)}
                            />
                        </div>
                        <div>
                            <label htmlFor="age" className="block mb-1">Age</label>
                            <input
                                type="text"
                                className="form-input rounded"
                                id="age"
                                name="age"
                                placeholder="Enter Patient's Age"
                                maxLength={3}
                                value={age}
                                onChange={this.handleInputChange}
                                onKeyPress={(event) => this.allowOnlyNumbers(event)}
                            />
                        </div>
                        <div>
                            <label htmlFor="postCategory" className="block mb-1">Contact No</label>
                            <input
                                type="text"
                                className="form-input rounded"
                                id="postCategory"
                                name="postCategory"
                                placeholder="Enter Contact No"
                                maxLength={10}
                                value={postCategory}
                                onChange={this.handleInputChange}
                                onKeyPress={(event) => this.allowOnlyNumbers(event)}
                            />
                        </div>
                        <div>
                            <label htmlFor="medicalhistory" className="block mb-1">Past Medical History</label>
                            <textarea
                                className="form-textarea rounded"
                                id="medicalhistory"
                                name="medicalhistory"
                                rows="5"
                                placeholder="Description of medical history"
                                value={medicalhistory}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="flex justify-center">
                            <button className="bg-cyan-400 text-black rounded-full px-4 py-2 border-1 border-cyan-400 hover:bg-cyan-500 hover:border-cyan-500">
                                <a href="/patienthome">Create Patient Profile</a>
                            </button>
                            </div>
                            {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}
                    </form>
                </div>
            </main>
            </>
        );
    }
}




{/*import React, { Component } from 'react';
import axios from 'axios';

// Importing top navigation bar components
import TopNavPatient from '../../components/TopNavPatient';

export default class CreatePatient extends Component {
    constructor(props){
        super(props);
        this.state={
            description:"",
            topic:"",
            age:"",
            postCategory:"",
            medicalhistory:""
        }
    }

    handleInputChange = (e) =>{
        const { name, value } = e.target;

        this.setState({
            ...this.state,
            [name]: value
        });
    }

    allowOnlyLettersWithSpaces = (event) => {
        const keyCode = event.keyCode || event.which;
        const keyValue = String.fromCharCode(keyCode);
        const regex = /^[a-zA-Z\s]+$/; // Allows letters and spaces
        
        if (!regex.test(keyValue)) {
            event.preventDefault();
        }
    }
    
    allowOnlyNumbers = (event) => {
        const keyCode = event.keyCode || event.which;
        const keyValue = String.fromCharCode(keyCode);
        const regex = /^[0-9]+$/; // Only allows numbers
    
        if (!regex.test(keyValue)) {
            event.preventDefault();
        }
    }

    onSubmit = (e) =>{
        e.preventDefault();

        const { description, topic, age, postCategory, medicalhistory } = this.state;

        // Check if any field is empty
        if (!description || !topic || !age || !postCategory || !medicalhistory) {
            // Display error message
            alert("Please fill all fields");
            return;
        }

        const data = {
            description,
            topic,
            age,
            postCategory,
            medicalhistory
        };

        console.log(data);

        axios.post("/patient/save", data)
            .then((res) => {
                if (res.data.success) {
                    this.setState({
                        description: "",
                        topic: "",
                        age: "",
                        postCategory: "",
                        medicalhistory: ""
                    });
                }
            })
            .catch((error) => {
                console.error('Error creating patient:', error);
            });
    }

    render() {
        const { description, topic, age, postCategory, medicalhistory, errorMessage } = this.state;
        return (
        <>*/}
            {/* Top navigation bar */}
            {/*<div className="navarea">
                <TopNavPatient/>
            </div>
            <main>
                <div className="mx-auto max-w-lg p-8 bg-white shadow-lg rounded-lg">
                    <h1 className="text-2xl font-semibold mb-4 text-center">Create New Patient</h1>
                    <form className="space-y-4" onSubmit={this.onSubmit}>
                        <div>
                            <label htmlFor="description" className="block mb-1">Patient's Name</label>
                            <input
                                type="text"
                                className="form-input rounded"
                                id="description"
                                name="description"
                                placeholder="Enter Patient's Name"
                                maxLength={50}
                                value={description}
                                onChange={this.handleInputChange}
                                onKeyPress={(event) => this.allowOnlyLettersWithSpaces(event)}
                            />
                        </div>
                        <div>
                            <label htmlFor="topic" className="block mb-1">NIC</label>
                            <input
                                type="text"
                                className="form-input rounded"
                                id="topic"
                                name="topic"
                                placeholder="Enter NIC No"
                                maxLength={12}
                                value={topic}
                                onChange={this.handleInputChange}
                                onKeyPress={(event) => this.allowOnlyNumbers(event)}
                            />
                        </div>
                        <div>
                            <label htmlFor="age" className="block mb-1">Age</label>
                            <input
                                type="text"
                                className="form-input rounded"
                                id="age"
                                name="age"
                                placeholder="Enter Patient's Age"
                                maxLength={3}
                                value={age}
                                onChange={this.handleInputChange}
                                onKeyPress={(event) => this.allowOnlyNumbers(event)}
                            />
                        </div>
                        <div>
                            <label htmlFor="postCategory" className="block mb-1">Contact No</label>
                            <input
                                type="text"
                                className="form-input rounded"
                                id="postCategory"
                                name="postCategory"
                                placeholder="Enter Contact No"
                                maxLength={10}
                                value={postCategory}
                                onChange={this.handleInputChange}
                                onKeyPress={(event) => this.allowOnlyNumbers(event)}
                            />
                        </div>
                        <div>
                            <label htmlFor="medicalhistory" className="block mb-1">Past Medical History</label>
                            <textarea
                                className="form-textarea rounded"
                                id="medicalhistory"
                                name="medicalhistory"
                                rows="5"
                                placeholder="Description of medical history"
                                value={medicalhistory}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="flex justify-center items-center h-screen">
        <button className="bg-cyan-400 text-black rounded-full px-4 py-2 border-1 border-cyan-400 hover:bg-cyan-500 hover:border-cyan-500">
                 <a href="/patienthome"> Create Patient Profile</a>
        </button>
    </div>*/}
                        
                       {/* {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}
                    </form>
                </div>
            </main>
            </>
        );
    }
}*/}


