import React, { Component } from "react";
import axios from "axios";


import EmptyNavArea from "./EmptyNavArea";

export default class CreateRestock extends Component {
    constructor(props){
        super(props);
        this.state = {
            ProductName: "",
            restockDate: "",
            restockStatus: "Pending",
            restockQuantity: "",
            restockSupplierID: "",
            restockNotes: "",
            errorMessage: "",
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
        const {ProductName, restockDate, restockStatus,restockQuantity,restockSupplierID, restockNotes } = this.state;
        const data = { 
            ProductName,
            restockDate,
            restockStatus,
            restockQuantity,
            restockSupplierID,
            restockNotes
        };
    
        try {
            const res = await axios.post("/restock/save", data);
            if (res.data.success) {
                alert("Restocked successfully!");
                this.setState({ 
                    ProductName: "",
                    restockDate: "",
                    restockStatus: "",
                    restockQuantity: "",
                    restockSupplierID: "",
                    restockNotes: "",
                    errorMessage: "" 
                });

                // Navigate to restock list page
                window.location = "/RestockView";
            } else {
                throw new Error(res.data.error || "Failed to create restock");
            }
        } catch (error) {
            console.error("Error creating restock:", error);
            this.setState({ errorMessage: error.message || "Failed to create restock" });
        }
    };

    render() {
        const { ProductName,restockDate, restockStatus,restockQuantity,restockSupplierID, restockNotes, errorMessage } = this.state;
        return (
            <>

            <EmptyNavArea />
            
            <main className="flex items-center justify-center">
            <div className="max-w-md mx-auto">

            <h1 className="text-lg font-bold mb-3 text-center">Restock Accepted Requests</h1>
                <form className="needs-validation">

                <div className="mb-6 transition ease-in-out duration-300 transform hover:scale-105">
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="ProductName">Product Name</label>
                        <input
                            type="text"
                            className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            id="ProductName"
                            name="ProductName"
                            value={ProductName}
                            onChange={this.handleInputChange}
                            placeholder="Enter Product Name"
                            required
                        />
                    </div>
                    <div className="mb-6 transition ease-in-out duration-300 transform hover:scale-105">
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="restockDate">Restock Date</label>
                        <input
                            type="date"
                            className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            id="restockDate"
                            name="restockDate"
                            value={restockDate}
                            onChange={this.handleInputChange}
                            placeholder="Enter Restock Date"
                            required
                        />
                    </div>
                    <div className="mb-6 transition ease-in-out duration-300 transform hover:scale-105">
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="restockStatus">Restock Status</label>
                        <input
                            type="text"
                            className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            id="restockStatus"
                            name="restockStatus"
                            value={restockStatus}
                            disabled={true}
                            onChange={this.handleInputChange}
                            placeholder="Enter Restock Status"
                            required
                        />
                    </div>
                    <div className="mb-6 transition ease-in-out duration-300 transform hover:scale-105">
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="restockQuantity">Restock Quantity</label>
                        <input
                            type="text"
                            className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            id="restockQuantity"
                            name="restockQuantity"
                            value={restockQuantity}
                            onChange={this.handleInputChange}
                            placeholder="Enter Restock Quantity"
                            required
                        />
                    </div>
                    <div className="mb-6 transition ease-in-out duration-300 transform hover:scale-105">
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="restockSupplierName">Supplier Name</label>
                        <input
                            type="text"
                            className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            id="restockSupplierID"
                            name="restockSupplierID"
                            value={restockSupplierID}
                            onChange={this.handleInputChange}
                            placeholder="Enter Supplier Name"
                            required
                        />
                    </div>
                    <div className="mb-6 transition ease-in-out duration-300 transform hover:scale-105">
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="restockNotes">Restock Notes</label>
                        <input
                            type="text"
                            className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            id="restockNotes"
                            name="restockNotes"
                            value={restockNotes}
                            onChange={this.handleInputChange}
                            placeholder="Enter Restock Notes"
                            required
                        />
                    </div>
                    <div className="mb-6 text-center transition ease-in-out duration-300 transform hover:scale-105  ">
                    <button className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2"
                       type="submit" onClick={this.onSubmit}>
                        <i className="far fa-check-square"></i>
                        &nbsp; Restock
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