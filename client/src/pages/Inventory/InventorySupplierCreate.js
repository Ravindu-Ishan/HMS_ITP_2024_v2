import React, { Component } from "react";
import axios from "axios";

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
            <div className="col-md-8 mt-4 mx-auto">
                <h1 className="h3 mb-3 font-weight-normal">Add New Supplier</h1>
                <form className="needs-validation" noValidate>
                    <div className="form-group">
                        <label htmlFor="SupplierName">Supplier Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="SupplierName"
                            name="SupplierName"
                            value={SupplierName}
                            onChange={this.handleInputChange}
                            placeholder="Enter Supplier Name"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="SupplierBrand">Supplier Brand</label>
                        <input
                            type="text"
                            className="form-control"
                            id="SupplierBrand"
                            name="SupplierBrand"
                            value={SupplierBrand}
                            onChange={this.handleInputChange}
                            placeholder="Enter Supplier Brand"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="SupplierLocation">Supplier Location</label>
                        <input
                            type="text"
                            className="form-control"
                            id="SupplierLocation"
                            name="SupplierLocation"
                            value={SupplierLocation}
                            onChange={this.handleInputChange}
                            placeholder="Enter Supplier Location"
                        />
                    </div>
                    
                    <button className="btn btn-success2" type="submit" onClick={this.onSubmit}>
                        <i className="far fa-check-square2"></i>
                        &nbsp; Save
                    </button>
                    {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}
                </form>
            </div>
        );
    }
}
