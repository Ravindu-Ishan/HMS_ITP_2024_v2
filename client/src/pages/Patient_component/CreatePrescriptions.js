import React, { Component } from 'react'
import axios from 'axios';
import PatientNavBar from './PatientNavBar';

export default class CreatePrescriptions extends Component {

    constructor(props){
        super(props);
        this.state={
            date:"",
            diagnosis:"",
            medications:""
            

        }
    }

    handleInputChange = (e) =>{
        const {name,value} = e.target;

        // Only allow letters and spaces for diagnosis and medications
  if (name === "diagnosis" || name === "medications") {
    if (/^[A-Za-z\s]*$/.test(value)) {
      this.setState({
        ...this.state,
        [name]: value
      });
    }
  } else{
        this.setState({
            ...this.state,
            [name]:value
        });
        }
    };

    onSubmit = (e) =>{
        e.preventDefault();

        const { date, diagnosis, medications } = this.state;

        // Check if any field is empty
        if (!date || !diagnosis.trim() || !medications.trim()) {
          alert("Please fill all fields");
          return;
        }

        const data={
            date:date,
            diagnosis:diagnosis,
            medications:medications
           
        }

        console.log(data)

        axios.post("/prescription/save",data).then((res) =>{
            if(res.data.success){
                this.setState(
                    {
                        date:"",
                        diagnosis:"",
                        medications:""
                        
                    }
                )
            }
            
        })
        
    }

    render() {
        return (
            <div className="col-md-8 mt-4 mx-auto">
                <PatientNavBar />
                <h1 className="h3 mb-3 font-weight-normal">Create New Prescription Details</h1>
                <form className="needs-validation" noValidate>
                    <div className="form-group" style={{ marginBottom: "15px" }}>
                        <label style={{ marginBottom: "5px" }}>Date</label>
                        <input
                            type="date"
                            className="form-control"
                            name="date"
                            placeholder="date"
                            value={this.state.date}
                            onChange={this.handleInputChange}
                            
                            
                        />
                    </div>

                    <div className="form-group" style={{ marginBottom: "15px", width: "870px" }}> 
                        <label style={{ marginBottom: "5px" }}>Diagnosis</label>
                        <textarea
                            className="form-control"
                            name="diagnosis"
                            rows="5" // Adjust the number of rows as needed for the desired height
                            style={{ width: "100%", maxWidth: "100%" }} // Set width and max-width to fill the container
                            placeholder="Description of diagnosis"
                            value={this.state.diagnosis}
                            onChange={this.handleInputChange}
                        />
                    </div>

                    <div className="form-group" style={{ marginBottom: "15px", width: "870px" }}> 
                        <label style={{ marginBottom: "5px" }}>Medications</label>
                        <textarea
                            className="form-control"
                            name="medications"
                            rows="5" // Adjust the number of rows as needed for the desired height
                            style={{ width: "100%", maxWidth: "100%" }} // Set width and max-width to fill the container
                            placeholder="Description of medications"
                            value={this.state.medications}
                            onChange={this.handleInputChange}
                        />
                    </div>


    
    
                    <button className="btn btn-success" type="submit" style={{ marginTop: "15px" }} onClick={this.onSubmit}>
                        <i className="far fa-check-square"></i>
                        &nbsp; Add new prescription
                    </button>
                </form>
            </div>
        );
    }
} 