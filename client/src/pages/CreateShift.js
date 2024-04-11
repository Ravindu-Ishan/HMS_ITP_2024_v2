import React, { Component } from "react";
import axios from "axios";

export default class CreateShift extends Component {
    constructor(props){
        super(props);
        this.state = {
        ScheduleTime: "",
        ScheduleDate: "",
        RoomNumber: "",
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
        const { ScheduleTime, ScheduleDate, RoomNumber } = this.state;
        const data = { 
            RoomNumber: RoomNumber,
            ScheduleTime: ScheduleTime,
            ScheduleDate: ScheduleDate,

        };

        try {
            const res = await axios.post("post/save", data); // Adjust the URL
            if (res.data.success) {
                alert("shift created successfully!");
                this.setState({ ScheduleTime: "", ScheduleDate: "", RoomNumber: "" });
            } else {
                throw new Error(res.data.error || "Failed to create shift");
            }
        } catch (error) {
            console.error("Error creating shift:", error);
            this.setState({ errorMessage: error.message || "Failed to create shift" });
        }
    };

    render() {
        const { ScheduleTime, ScheduleDate, RoomNumber, errorMessage } = this.state;
        return (
            <div className="col-md-8 mt-4 mx-auto">
                <h1 className="h3 mb-3 font-weight-normal">Create new shift</h1>
                <form className="needs-validation" noValidate>
                    
                <div className="form-group">
                        <label htmlFor="Time">Schedule Time</label>
                        <input
                            type="text"
                            className="form-control"
                            id="Time"
                            name="Time"
                            value={ScheduleTime}
                            onChange={this.handleInputChange}
                            placeholder="Enter Time"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="Date">Schedule Date</label>
                        <input
                            type="text"
                            className="form-control"
                            id="Date"
                            name="Date"
                            value={ScheduleDate}
                            onChange={this.handleInputChange}
                            placeholder="Enter Date"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="RoomNumber">Room Number</label>
                        <input
                            type="text"
                            className="form-control"
                            id="RoomNumber"
                            name="RoomNumber"
                            value={RoomNumber}
                            onChange={this.handleInputChange}
                            placeholder="Enter Room Number"
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
