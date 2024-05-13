import React, { Component } from 'react';
import axios from 'axios';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      restocks: [],
    };
  }

  componentDidMount() {
    this.retrieveRestocks();
  }

  retrieveRestocks() {
    axios.get("/restocks").then(res => {
      if (res.data.success) {
        this.setState({
          restocks: res.data.existingRestocks
        });
      }
    }).catch(error => {
      console.error("Error fetching restocks:", error);
      // Handle error state here
    });
  }

  onDelete = (id) => {
    axios.delete(`/restock/delete/${id}`).then((res) => {
      alert("Deleted Successfully");
      this.retrieveRestocks();
    }).catch(error => {
      console.error("Error deleting restock:", error);
      // Handle error state here
    });
  }

  filterData(restocks, searchkey) {
    const result = restocks.filter(restock =>
      restock.restockStatus.toLowerCase().includes(searchkey)
    );
    this.setState({ restocks: result });
  }

  handleSearchArea = (e) => {
    const searchkey = e.currentTarget.value.toLowerCase();
    axios.get("/restocks")
      .then(res => {
        if (res.data.success) {
          this.filterData(res.data.existingRestocks, searchkey);
        }
      })
      .catch(error => {
        console.error("Error searching restocks:", error);
        // Handle error state here
      });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-9 mt-2 mb-2">
            <h4>RESTOCK DETAILS</h4>
          </div>

          <div className="col-lg-3 mt-2 mb-2">
            <input
              className="form-control"
              type="search"
              placeholder="Search"
              name="searchQuery"
              onChange={this.handleSearchArea}
            />
          </div>
        </div>

        <table className="table table-hover" style={{ marginTop: '40px' }}>
          <thead>
            <tr>
              <th style={{ width: '5%' }} scope="col">#</th>
              <th style={{ width: '20%' }} scope="col">Restock ID</th>
              <th style={{ width: '25%' }} scope="col">Restock Date</th>
              <th style={{ width: '25%' }} scope="col">Restock Status</th>
              <th style={{ width: '25%' }} scope="col">Restock Notes</th>

              <th style={{ width: '25%' }} scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.state.restocks.map((restock, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>
                  <a href={`/restock/${restock._id}`} style={{ textDecoration: 'none' }}>
                    {restock._id}
                  </a>
                </td>
                <td>{restock.restockDate}</td>
                <td>{restock.restockStatus}</td>
                <td>{restock.restockNote}</td>

                <td>
                  <a className="btn btn-warning" href={`/productcreate`}>
                    <i className="fas fa-edit"></i>&nbsp;Restock Item
                  </a>
                  &nbsp;
                  <button className="btn btn-danger" href="#" onClick={() => this.onDelete(restock._id)}>
                    <i className="fas fa-trash-alt"></i>&nbsp;
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button className="btn btn-success">
          <a href="/RestockAdd" style={{ textDecoration: 'none', color: 'white' }}>Add a New Restock Request</a>
        </button>
      </div>
    );
  }
}