import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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
            SupplierName: "",
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
        const { ProductName, ExpireDate, ManufactureDate, Quantity, ProductPrice, SupplierName } = this.state;
        const data = { 
            ProductName,
            ExpireDate,
            ManufactureDate,
            Quantity,
            ProductPrice,
            SupplierName
        };
    
        
         // Validations

        //SupplierID should only contain letters, numbers, and spaces
         if (!SupplierName.match(/^[a-zA-Z0-9\s]+$/)) {
            this.setState({ errorMessage: "SupplierName should only contain letters, numbers, and spaces" });
            return;
        }

        //Product name should only contain letters and spaces
         if (!ProductName.match(/^[a-zA-Z\s]+$/)) {
            this.setState({ errorMessage: "Product name should only contain letters and spaces" });
            return;
        }

        //All fields are required
         if (!ProductName || !ExpireDate || !ManufactureDate || !Quantity || !ProductPrice || !SupplierName) {
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
                    SupplierName: "",
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
        const { ProductName, ExpireDate, ManufactureDate,Quantity,ProductPrice,SupplierName,errorMessage } = this.state;
        return (
            <>

            <EmptyNavArea />
            
            <main className="flex items-center justify-center">
            <div className="max-w-md mx-auto">

                <h1 className="text-xl font-bold mb-3 text-center">Add New Product</h1>
                <form className="needs-validation">

                    <div className="mb-6 transition ease-in-out duration-300 transform hover:scale-105">
                        <label className="block text-sm font-medium text-gray-700 mb-1 transition ease-in-out duration-300 transform hover:scale-105" htmlFor="ProductName">Product Name</label>
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
                        <label className="block text-sm font-medium text-gray-700 mb-1 transition ease-in-out duration-300 transform hover:scale-105"htmlFor="ExpireDate">Expire Date</label>
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
                    <div className="mb-6 transition ease-in-out duration-300 transform hover:scale-105">
                        <label className="block text-sm font-medium text-gray-700 mb-1 transition ease-in-out duration-300 transform hover:scale-1055" htmlFor="ManufactureDate">Manufacture Date</label>
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
                    <div className="mb-6 transition ease-in-out duration-300 transform hover:scale-105">
                        <label className="block text-sm font-medium text-gray-700 mb-1 transition ease-in-out duration-300 transform hover:scale-105" htmlFor="Quantity">Quantity</label>
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
                    <div className="mb-6 transition ease-in-out duration-300 transform hover:scale-105">
                        <label className="block text-sm font-medium text-gray-700 mb-1 transition ease-in-out duration-300 transform hover:scale-105" htmlFor="ProductPrice">Product Price</label>
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
                    <div className="mb-6 transition ease-in-out duration-300 transform hover:scale-105">
                        <label className="block text-sm font-medium text-gray-700 mb-1 transition ease-in-out duration-300 transform hover:scale-105" htmlFor="SupplierName">SupplierName</label>
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


                <div className="mb-6 text-center transition ease-in-out duration-300 transform hover:scale-105">
                    <button className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 transition ease-in-out duration-300 transform hover:scale-105"
                     type="submit" onClick={this.onSubmit}>
                        <i className="far fa-check-square"></i>
                        <span className="ml-2">Save</span> 
                    </button>
                    <Link to="/LOL" className="text-white bg-green-700 hover:bg-green-800 focus:outline-none font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 transition ease-in-out duration-300 transform hover:scale-105">
                                    <i className="fas fa-plus-circle"></i>
                                    <span className="ml-2">Send Bill</span>
                    </Link>
                </div>
                    {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}
                </form>
            </div>
            </main>
            </>
            
        );
    }
}
