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
            <div className="col-md-8 mt-4 mx-auto">
              
                <form className="needs-validation">
            {/*<main>*/}
           
            <div className="text-xl ml-5 mb-5 font-bold text-gray-600">
                Basic Patient Info
                </div>
       
                <div class="md:flex md:items-center mb-6">
                            <div class="md:w-1/3">
                            <label class="block text-black font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                                Patient's Name  :
                            </label>
                            </div>
                            <div class="md:w-2/3">
                            <input class="bg-white appearance-none border-2 border-gray-200 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                type="text"
                                className="form-control rounded-lg"
                                id="description"
                                name="description"
                                placeholder="Enter Patient's Name"
                                maxLength={50}
                                value={description}
                                onChange={this.handleInputChange}
                                style={{ width: '500px', height: '40px' }} // Adjust the width as needed
                                onKeyPress={(event) => this.allowOnlyLettersWithSpaces(event)}
                            />
                        </div>
                        </div>
                        <div class="md:flex md:items-center mb-6">
                        <div class="md:w-1/3">
                            <label class="block text-black font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                            NIC  :
                            </label>
                        </div>
                        <div class="md:w-2/3">
                        <input class="bg-white appearance-none border-2 border-gray-200 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                type="text"
                                className="form-control rounded-lg"
                                id="topic"
                                name="topic"
                                placeholder="Enter NIC No"
                                maxLength={12}
                                value={topic}
                                onChange={this.handleInputChange}
                                style={{ width: '500px', height: '40px' }} // Adjust the width as needed
                                onKeyPress={(event) => this.allowOnlyNumbers(event)}
                            />
                        </div>
                        </div>
                        <div class="md:flex md:items-center mb-6">
                        <div class="md:w-1/3">
                            <label class="block text-black font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                                Age  :
                            </label>
                            </div>
                            <div class="md:w-2/3">
                                <input class="bg-white appearance-none border-2 border-gray-200 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                type="text"
                                className="form-control rounded-lg"
                                id="age"
                                name="age"
                                placeholder="Enter Patient's Age"
                                maxLength={3}
                                value={age}
                                onChange={this.handleInputChange}
                                style={{ width: '500px', height: '40px' }} // Adjust the width as needed
                                onKeyPress={(event) => this.allowOnlyNumbers(event)}
                            />
                        </div>
                        </div>
                        <div class="md:flex md:items-center mb-6">
                        <div class="md:w-1/3">
                            <label class="block text-black font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                                Contact No  :
                            </label>
                            </div>
                            <div class="md:w-2/3">
                            <input class="bg-white appearance-none border-2 border-gray-200 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                type="text"
                                className="form-control rounded-lg"
                                id="postCategory"
                                name="postCategory"
                                placeholder="Enter Contact No"
                                maxLength={10}
                                value={postCategory}
                                onChange={this.handleInputChange}
                                style={{ width: '500px', height: '40px' }} // Adjust the width as needed
                                onKeyPress={(event) => this.allowOnlyNumbers(event)}
                            />
                        </div>
                        </div>

                        <div className="form-group">
                        <div className="text-xl ml-5 mb-5 font-bold text-gray-600">
                             Past Medical History
                        </div>
                            <textarea
                                className="form-textarea rounded-lg"
                                id="medicalhistory"
                                name="medicalhistory"
                                rows="10"
                                style={{ width: "1000px", maxWidth: "100%" }}
                                placeholder="Description of medical history"
                                value={medicalhistory}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        
    <div className="flex justify-center items-center h-screen">
    <button className="bg-cyan-400 text-black rounded-full px-4 py-2 border-1 border-cyan-400 hover:bg-cyan-500 hover:border-cyan-500" type="submit" onClick={this.onSubmit}>
                        <i className="far fa-check-square"></i>
                        &nbsp; Create Patient Profile
    </button>
    </div>

                        
                       {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}
                    </form>
              </div>  
            {/*</main>*/}
            </main>
            </>
        );
    }
}



    
    









