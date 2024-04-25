import React, { Component } from 'react';
import axios from 'axios';
import NavBar from './NavBar'; // Adjust import path if needed

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

    allowOnlyLetters = (event) => {
        const keyCode = event.keyCode || event.which;
        const keyValue = String.fromCharCode(keyCode);
        const regex = /^[a-zA-Z]+$/; // Only allows letters (upper and lower case)
    
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
        return (
            <div className="col-md-8 mt-4 mx-auto">
                <NavBar />
                <h1 className="h3 mb-3 font-weight-normal">Create New Patient</h1>
                <form className="needs-validation" noValidate>
                <div className="form-group" style={{ marginBottom: "15px" }}>
                        <label style={{ marginBottom: "5px" }}>Patient's Name</label>
                        <input
                            type="text"
                            className="form-control"
                            name="description"
                            placeholder="Enter Patient's Name"
                            maxLength={50}
                            value={this.state.description}
                            onChange={this.handleInputChange}
                            onKeyPress={(event) => this.allowOnlyLetters(event)}
                            
                        />
                    </div>
    
                    <div className="form-group" style={{ marginBottom: "15px" }}>
                        <label style={{ marginBottom: "5px" }}>NIC</label>
                        <input
                            type="text"
                            className="form-control"
                            name="topic"
                            placeholder="Enter NIC No"
                            maxLength={12}
                            value={this.state.topic}
                            onChange={this.handleInputChange}
                            onKeyPress={(event) => this.allowOnlyNumbers(event)}
                            
                        />
                    </div>
    
                    <div className="form-group" style={{ marginBottom: "15px" }}>
                        <label style={{ marginBottom: "5px" }}>Age</label>
                        <input
                            type="text"
                            className="form-control"
                            name="age"
                            placeholder="Enter Patient's Age"
                            maxLength={3}
                            value={this.state.age}
                            onChange={this.handleInputChange}
                            onKeyPress={(event) => this.allowOnlyNumbers(event)}
                           
                            
                        />
                    </div>

                    <div className="form-group" style={{ marginBottom: "15px" }}>
                        <label style={{ marginBottom: "5px" }}>Contact No</label>
                        <input
                            type="text"
                            className="form-control"
                            name="postCategory"
                            placeholder="Enter Contact No"
                            maxLength={10}
                            value={this.state.postCategory}
                            onChange={this.handleInputChange}
                            onKeyPress={(event) => this.allowOnlyNumbers(event)}
                            
                        />
                    </div>

                    <div className="form-group" style={{ marginBottom: "15px", width: "870px" }}> {/* Adjust width as needed */}
                        <label style={{ marginBottom: "5px" }}>Past Medical History</label>
                        <textarea
                            className="form-control"
                            name="medicalhistory"
                            rows="5" // Adjust the number of rows as needed for the desired height
                            style={{ width: "100%", maxWidth: "100%" }} // Set width and max-width to fill the container
                            placeholder="Description of medical history"
                            value={this.state.medicalhistory}
                            onChange={this.handleInputChange}
                            
                        />
                    </div>


    
    
                    <button className="btn btn-success" type="submit" style={{ marginTop: "15px" }} onClick={this.onSubmit}>
                        <i className="far fa-check-square"></i>
                        &nbsp; Create Patient Profile
                    </button>
                </form>
            </div>
        );
    }
}







