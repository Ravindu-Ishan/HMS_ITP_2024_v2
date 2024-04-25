import React, { Component } from 'react';
import axios from 'axios';

export default class Ward_Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wards: []
    };
  }

  componentDidMount() {
    this.retrieveWards();
  }

  //get request
  retrieveWards() {
    axios.get("/wards")
      .then(res => {
        if (res.data.success) {
          this.setState({
            wards: res.data.existingWards
          });
          console.log(this.state.wards);
        }
      })
      .catch(error => {
        console.error('Error retrieving wards:', error);
      });
  }

  onDelete = (id) => {

    axios.delete(`/wards/delete/${id}`).then((res) => {
      alert("Delete successfully");
      this.retrieveWards();
    })
  }

  //search function
  handleSearchArea = (e) => {
    const searchKey = e.currentTarget.value.toLowerCase();
  
    // Convert searchKey to a number if possible
    const searchKeyNumber = parseInt(searchKey, 10);
  
    axios.get("/wards")
      .then(res => {
        if (res.data.success) {
          // Log the existing wards for debugging
          console.log('Existing wards:', res.data.existingWards);
  
          // Filter wards based on search key
          const filteredWards = res.data.existingWards.filter(ward => {
            // Check each property separately
            const wardTypeMatch = ward.ward_type.toLowerCase().includes(searchKey);
            const wardIDMatch = ward.ward_ID.toLowerCase().includes(searchKey);
            const bedCountMatch = !isNaN(searchKeyNumber) && ward.bed_count === searchKeyNumber;
  
            return wardTypeMatch || wardIDMatch || bedCountMatch;
          });
  
          // Log the filtered wards for debugging
          console.log('Filtered wards:', filteredWards);
  
          // Update state with filtered wards
          this.setState({ wards: filteredWards });
        } else {
          console.error('API response unsuccessful:', res.data);
        }
      })
      .catch(error => {
        console.error('Error retrieving wards:', error);
      });
  };
  

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-9 mt-2 mb-2">
            <h4>All Wards</h4>
            <div className="col-lg-3 mt-2 mb-2">
              <input
                className="form-control"
                type="search"
                placeholder="search"
                name="searchQuery"
                onChange={this.handleSearchArea}>
              </input>
            </div>
          </div>
        </div>
        <table className="table table-hover" style={{ marginTop: '40px' }}>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">ward_type</th>
              <th scope="col">ward_ID</th>
              <th scope="col">bed_count</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.wards.map((wards, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>
                    <a href={`/wardDetails/${wards._id}`} style={{ textDecoration: 'none' }}>
                      {wards.ward_type}
                    </a>
                  </td>
                  <td>{wards.ward_ID}</td>
                  <td>{wards.bed_count}</td>
                  <td>
                    <a className="btn btn-warning" href={`/wardEdit/${wards._id}`}>
                      <i className="fas fa-edit"></i>&nbsp;Edit
                    </a>
                    &nbsp;
                    <a className="btn btn-danger" href="#" onClick={() => this.onDelete(wards._id)}>
                      <i className="fas fa-trash"></i>&nbsp;Delete
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>

        </table>

        <button className="btn btn-success">
          <a href="/wardAdd" style={{ textDecoration: 'none', color: 'white' }}>
            Create New Ward
          </a>
        </button>

      </div>
    );
  }
}
