import React, { Component } from "react";
import axios from "axios";

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
            <div className="col-md-8 mt-4 mx-auto">
                <h1 className="h3 mb-3 font-weight-normal">Add New Product</h1>
                <form className="needs-validation">
                    <div className="form-group">
                        <label htmlFor="ProductName">Product Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="ProductName"
                            name="ProductName"
                            value={ProductName}
                            onChange={this.handleInputChange}
                            placeholder="Enter Product Name"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="ExpireDate">Expire Date</label>
                        <input
                            type="date"
                            className="form-control"
                            id="ExpireDate"
                            name="ExpireDate"
                            value={ExpireDate}
                            onChange={this.handleInputChange}
                            placeholder="Enter Expire Date"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="ManufactureDate">Manufacture Date</label>
                        <input
                            type="date"
                            className="form-control"
                            id="ManufactureDate"
                            name="ManufactureDate"
                            value={ManufactureDate}
                            onChange={this.handleInputChange}
                            placeholder="Enter Manufacture Date"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="Quantity">Quantity</label>
                        <input
                            type="number"
                            className="form-control"
                            id="Quantity"
                            name="Quantity"
                            value={Quantity}
                            onChange={this.handleInputChange}
                            placeholder="Enter Quantity"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="ProductPrice">Product Price</label>
                        <input
                            type="number"
                            className="form-control"
                            id="ProductPrice"
                            name="ProductPrice"
                            value={ProductPrice}
                            onChange={this.handleInputChange}
                            placeholder="Enter Price"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="SupplierID">SupplierID</label>
                        <input
                            type="text"
                            className="form-control"
                            id="SupplierID"
                            name="SupplierID"
                            value={SupplierID}
                            onChange={this.handleInputChange}
                            placeholder="Enter Supplier ID"
                            required
                        />
                    </div>
                    <button className="btn btn-success" type="submit" onClick={this.onSubmit}>
                        <i className="far fa-check-square"></i>
                        &nbsp; Save
                    </button>
                    {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}
                </form>
            </div>
        );
    }
}
