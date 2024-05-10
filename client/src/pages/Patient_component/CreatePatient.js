import React, { Component } from 'react';
import axios from 'axios';


//importing top navigation bar components
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
        const { description, topic, age,postCategory,medicalhistory,errorMessage } = this.state;
        return (
            <>
            {/* top nav imported to this section */}
            <div className="navarea">
                <TopNavPatient/>
            </div>
            <main>
            <div className="col-md-8 mt-4 mx-auto">
                
                <h1 className="h3 mb-3 font-weight-normal">Create New Patient</h1>
                <form className="needs-validation" noValidate>
                <div className="form-group">
                        <label htmlFor="description">Patient's Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="description"
                            name="description"
                            placeholder="Enter Patient's Name"
                            maxLength={50}
                            value={this.state.description}
                            onChange={this.handleInputChange}
                            onKeyPress={(event) => this.allowOnlyLettersWithSpaces(event)}
                            
                        />
                    </div>
    
                    <div className="form-group">
                        <label htmlFor="topic">NIC</label>
                        <input
                            type="text"
                            className="form-control"
                            id="topic"
                            name="topic"
                            placeholder="Enter NIC No"
                            maxLength={12}
                            value={this.state.topic}
                            onChange={this.handleInputChange}
                            onKeyPress={(event) => this.allowOnlyNumbers(event)}
                            
                        />
                    </div>
    
                    <div className="form-group">
                        <label htmlFor="age">Age</label>
                        <input
                            type="text"
                            className="form-control"
                            id="age"
                            name="age"
                            placeholder="Enter Patient's Age"
                            maxLength={3}
                            value={this.state.age}
                            onChange={this.handleInputChange}
                            onKeyPress={(event) => this.allowOnlyNumbers(event)}
                           
                            
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="postCategory">Contact No</label>
                        <input
                            type="text"
                            className="form-control"
                            id="postCategory"
                            name="postCategory"
                            placeholder="Enter Contact No"
                            maxLength={10}
                            value={this.state.postCategory}
                            onChange={this.handleInputChange}
                            onKeyPress={(event) => this.allowOnlyNumbers(event)}
                            
                        />
                    </div>

                    <div className="form-group"> {/* Adjust width as needed */}
                        <label htmlFor="medicalhistory">Past Medical History</label>
                        <textarea
                            className="form-control"
                            id="medicalhistory"
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

                    
                    {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}
                </form>
            </div>
            </main>
            </>
        );
    }
}







