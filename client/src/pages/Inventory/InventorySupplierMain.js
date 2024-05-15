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
        <div className="flex justify-between items-center sticky top-0 max-w bg-white border border-gray-200 rounded-xl shadow py-5 px-10">
          <div className="flex items-center space-x-4 transition ease-in-out duration-300 transform hover:scale-105">
            <input
              className="form-control bg-cyan-400 focus:bg-cyan-500  hover:bg-cyan-500 hover:border-cyan-500 text-black placeholder-black::placeholder rounded-full py-2 px-4"
              type="search"
              placeholder="Search"
              name="searchQuery"
              onChange={this.handleSearchArea}
            />
          </div>
          <div className="absolute left-1/2 transform -translate-x-1/2">
                <h3 className="font-bold text-xl">SUPPLIER DETAILS</h3>
          </div>
          <button className="bg-cyan-400 text-black rounded-full px-4 py-2 border border-cyan-400 hover:bg-cyan-500 hover:border-cyan-500 transition ease-in-out duration-300 transform hover:scale-105">
            <a href="/suppliercreate" >Add New Supplier</a>
          </button>
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
              <tr className="text-gray-600 bg-white hover:bg-gray-200 hover:text-black transition ease-in-out duration-300 transform hover:scale-95" key={index}>
                <th scope="row">{index + 1}</th>
                <td className="text-center py-2 px-2 w-[6ch]">{Supplier._id.slice(0, 6)}</td>
                <td className="text-center py-2 px-4" >{Supplier.SupplierName}</td>
                <td className="text-center py-2 px-4" >{Supplier.SupplierBrand}</td>
                <td className="text-center py-2 px-4">{Supplier.SupplierLocation}</td>
                <td className="text-center py-2 px-4">
             <div className="flex justify-center space-x-2">
             <a href={`/supplieredit/${Supplier._id}`} className="text-cyan-500">
             <i className="fas fa-edit btn btn-primary transition ease-in-out duration-300 transform hover:scale-105"></i>&nbsp;Edit
             </a>
             <button className="text-red-500" href="#" onClick={() => this.onDelete(Supplier._id)}>
             <i className="fas fa-trash-alt btn btn-primary transition ease-in-out duration-300 transform hover:scale-105"></i>&nbsp;Delete
             </button>
             </div>
             </td>
              </tr>
            ))}
          </tbody>
        </table>
</div>
</main>
</>
);
}
}
