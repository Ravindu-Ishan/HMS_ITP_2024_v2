import React, { Component } from "react";
import axios from "axios";

import EmptyNavArea from "./EmptyNavArea";

export default class CreatePost extends Component {
    constructor(props){
        super(props);
        this.state = {
            SupplierName: "",
            SupplierBrand: "",
            SupplierLocation: ""
            
        };
    }

    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    };

    onSubmit = async (e) => {
        e.preventDefault();
        const { SupplierName, SupplierBrand, SupplierLocation} = this.state;
        const data = { 
            SupplierName,
            SupplierBrand,
            SupplierLocation
        };
    


        //VALIDATIONS
        //all fields are required
        if (!SupplierName || !SupplierBrand || !SupplierLocation) {
            this.setState({ errorMessage: "All fields are required" });
            return;
        }

        //supplier name should contain letters
        if (!SupplierName.match(/^[a-zA-Z\s]+$/)) {
            this.setState({ errorMessage: "Supplier name should only contain letters" });
            return;
        }
         
        
        try {
            const res = await axios.post("/Supplier/save", data); 
            if (res.data.success) {
                alert("Product created successfully!");
                this.setState({ 
                    SupplierName: "",
                    SupplierBrand: "",
                    SupplierLocation: ""
                });

                // Navigate to home page Product Home Page
                window.location = "/suppliermain";
            } else {
                throw new Error(res.data.error || "Failed to create product");
            }
        } catch (error) {
            console.error("Error creating product:", error);
            this.setState({ errorMessage: error.message || "Failed to create product" });
        }
    };

    render() {
        const { SupplierName, SupplierBrand, SupplierLocation} = this.state;
        return (
            <>

            <EmptyNavArea />
            
            <main className="flex items-center justify-center">
            <div className="max-w-md mx-auto">

            <h1 className="text-xl font-bold mb-3 text-center">Add New Supplier</h1>
                <form className="needs-validation">

                    <div className="mb-6 transition ease-in-out duration-300 transform hover:scale-105">
                        <label className="block text-sm font-medium text-gray-700 mb-1 transition ease-in-out duration-300 transform hover:scale-95" htmlFor="SupplierName">Supplier Name</label>
                        <input
                            type="text"
                            className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            id="SupplierName"
                            name="SupplierName"
                            value={SupplierName}
                            onChange={this.handleInputChange}
                            placeholder="Enter Supplier Name"
                            required
                        />
                    </div>
                    <div className="mb-6 transition ease-in-out duration-300 transform hover:scale-105">
                        <label className="block text-sm font-medium text-gray-700 mb-1 transition ease-in-out duration-300 transform hover:scale-95"htmlFor="SupplierBrand">Supplier Brand</label>
                        <input
                            type="text"
                            className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            id="SupplierBrand"
                            name="SupplierBrand"
                            value={SupplierBrand}
                            onChange={this.handleInputChange}
                            placeholder="Enter Supplier Brand"
                            required
                        />
                    </div>
                    <div className="mb-6 transition ease-in-out duration-300 transform hover:scale-105">
                        <label className="block text-sm font-medium text-gray-700 mb-1 transition ease-in-out duration-300 transform hover:scale-95" htmlFor="SupplierLocation">Supplier Location</label>
                        <input
                            type="text"
                            className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            id="SupplierLocation"
                            name="SupplierLocation"
                            value={SupplierLocation}
                            onChange={this.handleInputChange}
                            placeholder="Enter Supplier Location"
                            required
                        />
                    </div>
                    


                <div className="mb-6 text-center">
                    <button className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 transition ease-in-out duration-300 transform hover:scale-105"
                     type="submit" onClick={this.onSubmit}>
                        <i className="far fa-check-square"></i>
                        <span className="ml-2">Save</span> 
                    </button>
                </div>
                </form>
            </div>
            </main>
            </>
            
        );
    }
}
