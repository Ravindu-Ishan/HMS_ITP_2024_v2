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
<div className="flex justify-between sticky top-0 max-w bg-white border border-gray-200 rounded-xl shadow pt-2 px-2 inline-flex items-center">
      <div className="container">
        <div className="row">
        <div >
            <h4 className="font-bold">PRODUCT DETAILS</h4>
        </div>

        <div>
            <input
              className="form-control"
              type="search"
              placeholder="Search"
              name="searchQuery"
              onChange={this.handleSearchArea}
            />
        </div>
        </div>
        </div>
  </div>
  <div className="overflow-x-auto sm:rounded-lg tablestyle">
  <table className="w-full text-sm border-separate border-spacing-x-0 border-spacing-y-2 text-gray-500 ">
  <thead className="text-xs text-gray-700 uppercase bg-white">
            <tr>
              <th className="p-4">#</th>
              <th className="p-4">Supplier ID</th>
              <th className="p-4">Supplier Name</th>
              <th className="p-4">Supplier Brand</th>
              <th className="p-4">Supplier Location</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>




          <tbody>
            {this.state.Suppliers.map((Supplier, index) => (
              <tr className="text-gray-600 bg-white hover:bg-gray-200 hover:text-black" key={index}>
                <th scope="row">{index + 1}</th>
                <td className="text-center py-2 px-4">
                  <a href={`/Supplier/${Supplier._id}`} >
                    {Supplier._id}
                  </a>
                </td>
                <td className="text-center py-2 px-4" >{Supplier.SupplierName}</td>
                <td className="text-center py-2 px-4" >{Supplier.SupplierBrand}</td>
                <td className="text-center py-2 px-4">{Supplier.SupplierLocation}</td>
                <td class="flex space-x-4" className="text-black-700">
                  <a  href={`/supplieredit/${Supplier._id}`}>
                    <i className="fas fa-edit"></i>&nbsp;Edit
                  </a>
                  &nbsp;
                  <button className="text-black-700" href="#" onClick={() => this.onDelete(Supplier._id)}>
                    <i className="fas fa-trash-alt"></i>&nbsp;Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>



    <div className="flex justify-center items-center ">
        <button className="bg-cyan-400 text-black rounded-full px-4 py-2 border-1 border-cyan-400 hover:bg-cyan-500 hover:border-cyan-500">
          <a href="/suppliercreate" >Add New Supplier</a>
        </button>
    </div>
</div>
</main>
</>
);
}
}
