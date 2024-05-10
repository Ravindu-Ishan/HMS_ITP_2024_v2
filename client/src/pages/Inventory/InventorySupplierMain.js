import React, { Component } from 'react';
import axios from 'axios';

//importing top navigation bar components
import TopNavInventory from '../../components/TopNavInventory';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
        Suppliers: [],
    };
  }

  componentDidMount() {
    this.retrieveSuppliers();
  }

  retrieveSuppliers() {
    axios.get("/getSupplier").then(res => {
        if (res.data.success) {
          this.setState({
            Suppliers: res.data.existingSuppliers
          });
          console.log(this.state.Suppliers);
        }
      });
      
  }

  onDelete = (id) => {
    axios.delete(`/Supplier/delete/${id}`).then((res) => {
      alert("Deleted Successfully");
      this.retrieveSuppliers();
    })
    
      
  }

  filterData(Suppliers, searchkey) {
    const result = Suppliers.filter(post =>
        Suppliers.SupplierName.toLowerCase().includes(searchkey)
    );
    this.setState({ Supplier: result });
  }

  handleSearchArea = (e) => {
    const searchkey = e.currentTarget.value.toLowerCase();
    axios.get("/getSupplier")
      .then(res => {
        if (res.data.success) {
          this.filterData(res.data.existingSuppliers, searchkey);
        }
      })
      .catch(error => {
        console.error("Error searching Suppliers:", error);
        // Handle error state here
      });
  }

  render() {
    return (
      <>

      {/* top nav imported to this section */}
      <div className="navarea">
        <TopNavInventory/>
      </div>



      <main>

      <div className="container">
        <div className="row">
          <div className="col-lg-9 mt-2 mb-2">
            <h4>SUPPLIER DETAILS</h4>
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

        <table className="table table-hover" >
          <thead>
            <tr>
              <th className="p-1">#</th>
              <th className="p-1">Supplier ID</th>
              <th className="p-1">Supplier Name</th>
              <th className="p-1">Supplier Brand</th>
              <th className="p-1">Supplier Location</th>
              <th className="p-1">Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.state.Suppliers.map((Supplier, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>
                  <a href={`/Supplier/${Supplier._id}`} style={{ textDecoration: 'none' }}>
                    {Supplier._id}
                  </a>
                </td>
                <td style={{Width:'180px'}}>{Supplier.SupplierName}</td>
                <td style={{Width:'180px'}}>{Supplier.SupplierBrand}</td>
                <td style={{Width:'180px'}}>{Supplier.SupplierLocation}</td>
                <td>
                  <a className="btn btn-warning" href={`/supplieredit/${Supplier._id}`}>
                    <i className="fas fa-edit"></i>&nbsp;Edit
                  </a>
                  &nbsp;
                  <button className="btn btn-danger" href="#" onClick={() => this.onDelete(Supplier._id)}>
                    <i className="fas fa-trash-alt"></i>&nbsp;Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button className="btn btn-success">
          <a href="/suppliercreate" style={{ textDecoration: 'none', color: 'white' }}>Add New Supplier</a>
        </button>
      </div>
      </main>
    </>
    );
  }
}
