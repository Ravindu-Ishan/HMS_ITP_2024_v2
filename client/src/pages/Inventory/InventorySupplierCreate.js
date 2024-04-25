import React, { Component } from "react";
import axios from "axios";


import EmptyNavArea from "./EmptyNavArea";

export default class CreateSupplier extends Component {
    constructor(props){
        super(props);
        this.state =
    {
        SupplierName: "",
        SupplierBrand: "",
        SupplierLocation: "",
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
        const { SupplierName ,SupplierBrand,SupplierLocation } = this.state;
        const data = { 
           SupplierName,
           SupplierBrand,
           SupplierLocation
        };


        // Validaitons
       
        //All fields are required
         if (!SupplierName || !SupplierBrand || !SupplierLocation) 
         {
        this.setState({ errorMessage: "All fields are required" });
        return;
        }


        
    
        try {
            const res = await axios.post("/Supplier/save", data);
            if (res.data.success) {
                alert("Post created successfully!");
                this.setState({ 
                    SupplierName: "",
                    SupplierBrand: "",
                    SupplierLocation: "",
                    errorMessage: "" 
                });
                // Navigate to home page ("/")
                window.location = "/";
            } else {
                throw new Error(res.data.error || "Failed to create post");
            }
        } catch (error) {
            console.error("Error creating post:", error);
            this.setState({ errorMessage: error.message || "Failed to create post" });
        }
    };
    render() {
        const { SupplierName ,SupplierBrand,SupplierLocation,errorMessage } = this.state;
        return (
            <>

            <EmptyNavArea />
            
            <main className="flex items-center justify-center">
            <div className="max-w-md mx-auto">

                <h1 className="text-lg font-bold mb-3">Add New Supplier</h1>
                <form className="needs-validation">


                <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="SupplierName">Supplier Name</label>
                        <input
                            type="text"
                            className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            id="SupplierName"
                            name="SupplierName"
                            value={SupplierName}
                            onChange={this.handleInputChange}
                            placeholder="Enter Supplier Name"
                        />
                    </div>
                    <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="SupplierBrand">Supplier Brand</label>
                        <input
                            type="text"
                            className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            id="SupplierBrand"
                            name="SupplierBrand"
                            value={SupplierBrand}
                            onChange={this.handleInputChange}
                            placeholder="Enter Supplier Brand"
                        />
                    </div>
                   <div className="mb-6">
                   <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="SupplierLocation">Supplier Location</label>
                        <input
                            type="text"
                            className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            id="SupplierLocation"
                            name="SupplierLocation"
                            value={SupplierLocation}
                            onChange={this.handleInputChange}
                            placeholder="Enter Supplier Location"
                        />
                    </div>
                    
                    <div className="mb-6 text-center">
                    <button className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2"
                    type="submit" onClick={this.onSubmit}>
                        <i className="far fa-check-square2"></i>
                        <span className="ml-2">Save</span>
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
