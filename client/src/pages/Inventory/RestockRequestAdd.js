import React, { Component } from "react";
import axios from "axios";

export default class CreateRestock extends Component {
    constructor(props){
        super(props);
        this.state = {
            restockDate: "",
            restockStatus: "",
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
        const { restockDate, restockStatus, restockNotes } = this.state;
        const data = { 
            restockDate,
            restockStatus,
            restockNotes
        };
    
        try {
            const res = await axios.post("/restock/save", data);
            if (res.data.success) {
                alert("Restocked successfully!");
                this.setState({ 
                    restockDate: "",
                    restockStatus: "",
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
        const { restockDate, restockStatus, restockNotes, errorMessage } = this.state;
        return (
            <div className="col-md-8 mt-4 mx-auto">
                <h1 className="h3 mb-3 font-weight-normal">Restock Accepted Requests</h1>
                <form className="needs-validation">
                    <div className="form-group">
                        <label htmlFor="restockDate">Restock Date</label>
                        <input
                            type="date"
                            className="form-control"
                            id="restockDate"
                            name="restockDate"
                            value={restockDate}
                            onChange={this.handleInputChange}
                            placeholder="Enter Restock Date"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="restockStatus">Restock Status</label>
                        <input
                            type="text"
                            className="form-control"
                            id="restockStatus"
                            name="restockStatus"
                            value={restockStatus}
                            onChange={this.handleInputChange}
                            placeholder="Enter Restock Status"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="restockNotes">Restock Notes</label>
                        <input
                            type="text"
                            className="form-control"
                            id="restockNotes"
                            name="restockNotes"
                            value={restockNotes}
                            onChange={this.handleInputChange}
                            placeholder="Enter Restock Notes"
                            required
                        />
                    </div>
                    <button className="btn btn-success" type="submit" onClick={this.onSubmit}>
                        <i className="far fa-check-square"></i>
                        &nbsp; Restock
                    </button>
                    {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}
                </form>
            </div>
        );
    }
}