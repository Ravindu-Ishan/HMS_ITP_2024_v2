import React, { Component } from 'react';
import axios from 'axios';
import TopNavWard from '../../components/TopNavWards';
import { Link } from 'react-router-dom';

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

  //delete function
  onDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this ward?")) {
      axios.delete(`/ward/delete/${id}`)
        .then((res) => {
          alert("Delete successful");
          this.retrieveWards();
        })
        .catch((error) => {
          console.error('Error deleting ward:', error);
        });
    }
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
              <div className="col-lg-9 mt-2 mb-2 d-flex align-items-center">
                <h4 className="text-3xl font-bold text-gray-800 ml-2">Wards</h4>
                <input
                  className="appearance-none block w-300 bg-white border border-gray-200 rounded-xl py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 ml-2"
                  type="search"
                  placeholder="Search"
                  name="searchQuery"
                  onChange={this.handleSearchArea}
                />
              </div>
              <div className="ml-2 mt-5 col-lg-3 d-flex align-items-center justify-content-end">
                <button className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2">
                  <Link to="/wardAdd">Create New Ward</Link>
                </button>
              </div>
            </div>
            <div className="overflow-x-auto sm:rounded-lg">
              <table className="table table-hover w-full text-sm border-separate border-spacing-x-0 border-spacing-y-2 text-gray-500" style={{ marginTop: '40px' }}>
                <thead className="text-xs text-gray-700 uppercase bg-white">
                  <tr>
                    <th className="p-3" scope="col">#</th>
                    <th className="p-3" scope="col">Ward Type</th>
                    <th className="p-3" scope="col">Ward ID</th>
                    <th className="p-3" scope="col">Bed Count</th>
                    <th className="p-3" scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.wards.map((wards, index) => {
                    return (
                      <tr key={index} className="text-gray-600 bg-white hover:bg-gray-200 hover:text-black">
                        <th scope="row" className="text-center py-2 px-4">{index + 1}</th>
                        <td className="text-center py-2 px-4">
                          <Link
                            to={`/wardDetails/${wards._id}`}
                            style={{
                              textDecoration: 'none',
                              color: '#000',
                              transition: 'color 0.2s',
                            }}
                            onMouseEnter={(e) => { e.target.style.color = '#007bff'; }}
                            onMouseLeave={(e) => { e.target.style.color = '#000'; }}
                          >
                            {wards.ward_type}
                          </Link>
                        </td>
                        <td className="text-center py-2 px-4">{wards.ward_ID}</td>
                        <td className="text-center py-2 px-4">{wards.bed_count}</td>
                        
                        <td className="text-center py-2 px-2">
                          <Link
                            className="text-blue-700 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2"
                            to={`/wardEdit/${wards._id}`}
                            style={{ transition: 'transform 0.2s', display: 'inline-block' }}
                            onMouseEnter={(e) => { e.target.style.transform = 'scale(1.1)'; }}
                            onMouseLeave={(e) => { e.target.style.transform = 'scale(1)'; }}
                          >
                            <i className="fas fa-edit"></i>&nbsp;Edit
                          </Link>
                          <button
                            className="text-red-700 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2"
                            href="#"
                            onClick={() => this.onDelete(wards._id)}
                            style={{ transition: 'transform 0.2s', display: 'inline-block' }}
                            onMouseEnter={(e) => { e.target.style.transform = 'scale(1.1)'; }}
                            onMouseLeave={(e) => { e.target.style.transform = 'scale(1)'; }}
                          >
                            <i className="fas fa-trash"></i>&nbsp;Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </>
    );

  }
}
