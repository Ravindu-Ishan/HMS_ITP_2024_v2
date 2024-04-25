import React, { Component } from "react";
import axios from "axios";

import EmptyNavArea from "./EmptyNavArea";

export default class CreatePost extends Component {
    constructor(props){
        super(props);
        this.state = {
            ProductName: "",
            ExpireDate: "",
            ManufactureDate: "",
            Quantity: "",
            ProductPrice: "",
            SupplierID: "",
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
        const { ProductName, ExpireDate, ManufactureDate, Quantity, ProductPrice, SupplierID } = this.state;
        const data = { 
            ProductName,
            ExpireDate,
            ManufactureDate,
            Quantity,
            ProductPrice,
            SupplierID
        };
    
        
         // Validations

        //SupplierID should only contain letters, numbers, and spaces
         if (!SupplierID.match(/^[a-zA-Z0-9\s]+$/)) {
            this.setState({ errorMessage: "SupplierID should only contain letters, numbers, and spaces" });
            return;
        }

        //Product name should only contain letters and spaces
         if (!ProductName.match(/^[a-zA-Z\s]+$/)) {
            this.setState({ errorMessage: "Product name should only contain letters and spaces" });
            return;
        }

        //All fields are required
         if (!ProductName || !ExpireDate || !ManufactureDate || !Quantity || !ProductPrice || !SupplierID) {
            this.setState({ errorMessage: "All fields are required" });
            return;
        }


        try {
            const res = await axios.post("/product/save", data); 
            if (res.data.success) {
                alert("Product created successfully!");
                this.setState({ 
                    ProductName: "",
                    ExpireDate: "",
                    ManufactureDate: "",
                    Quantity: "",
                    ProductPrice: "",
                    SupplierID: "",
                    errorMessage: "" 
                });

                // Navigate to home page Product Home Page
                window.location = "/productmain";
            } else {
                throw new Error(res.data.error || "Failed to create product");
            }
        } catch (error) {
            console.error("Error creating product:", error);
            this.setState({ errorMessage: error.message || "Failed to create product" });
        }
    };

    render() {
        const { ProductName, ExpireDate, ManufactureDate,Quantity,ProductPrice,SupplierID,errorMessage } = this.state;
        return (
            <>

            <EmptyNavArea />
            
            <main className="flex items-center justify-center">
            <div className="max-w-md mx-auto">

                <h1 className="text-lg font-bold mb-3">Add New Product</h1>
                <form className="needs-validation">

                    <div className="mb-6">
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
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-1"htmlFor="ExpireDate">Expire Date</label>
                        <input
                            type="date"
                            className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            id="ExpireDate"
                            name="ExpireDate"
                            value={ExpireDate}
                            onChange={this.handleInputChange}
                            placeholder="Enter Expire Date"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="ManufactureDate">Manufacture Date</label>
                        <input
                            type="date"
                            className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            id="ManufactureDate"
                            name="ManufactureDate"
                            value={ManufactureDate}
                            onChange={this.handleInputChange}
                            placeholder="Enter Manufacture Date"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="Quantity">Quantity</label>
                        <input
                            type="number"
                            className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            id="Quantity"
                            name="Quantity"
                            value={Quantity}
                            onChange={this.handleInputChange}
                            placeholder="Enter Quantity"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="ProductPrice">Product Price</label>
                        <input
                            type="number"
                            className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            id="ProductPrice"
                            name="ProductPrice"
                            value={ProductPrice}
                            onChange={this.handleInputChange}
                            placeholder="Enter Price"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="SupplierID">SupplierID</label>
                        <input
                            type="text"
                            className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            id="SupplierID"
                            name="SupplierID"
                            value={SupplierID}
                            onChange={this.handleInputChange}
                            placeholder="Enter Supplier ID"
                            required
                        />
                    </div>


                <div className="mb-6 text-center">
                    <button className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2"
                     type="submit" onClick={this.onSubmit}>
                        <i className="far fa-check-square"></i>
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