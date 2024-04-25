import React, { Component } from 'react';
import axios from 'axios';
import TopNavWard from '../../components/TopNavWards';

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

    axios.delete(`/ward/delete/${id}`).then((res) => {
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
      <>
        <div className="navarea">
          <TopNavWard />
        </div>
        <main>
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
            <div className="overflow-x-auto sm:rounded-lg">
              <table className="table table-hover w-full text-sm border-separate border-spacing-x-0 border-spacing-y-2 text-gray-500" style={{ marginTop: '40px' }}>
                <thead className="text-xs text-gray-700 uppercase bg-white">
                  <tr>
                    <th className="p-3" scope="col">#</th>
                    <th className="p-3" scope="col">ward_type</th>
                    <th className="p-3" scope="col">ward_ID</th>
                    <th className="p-3" scope="col">bed_count</th>
                    <th className="p-3" scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.wards.map((wards, index) => {
                    return (
                      <tr key={index} className="text-gray-600 bg-white hover:bg-gray-200 hover:text-black">
                        <th scope="row" className="text-center py-2 px-4">{index + 1}</th>
                        <td className="text-center py-2 px-4">
                          <a href={`/wardDetails/${wards._id}`} style={{ textDecoration: 'none' }}>
                            {wards.ward_type}
                          </a>
                        </td>
                        <td className="text-center py-2 px-4">{wards.ward_ID}</td>
                        <td className="text-center py-2 px-4">{wards.bed_count}</td>
                        <td className="text-center py-2 px-4">
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
            </div>

            <button className="text-white bg-blue-700 hover:bg-blue-800  font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2">
              <a href="/wardAdd">
                Create New Ward
              </a>
            </button>
          </div>
        </main>
      </>
    );

  }
}
