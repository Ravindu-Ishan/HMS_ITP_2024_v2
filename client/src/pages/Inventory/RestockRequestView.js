import React, { Component } from 'react';
import axios from 'axios';

//importing top navigation bar components
import TopNavInventory from '../../components/TopNavInventory';

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
                <h3 className="font-bold text-xl">RESTOCK REQUEST DETAILS</h3>
          </div>
          <button className="bg-cyan-400 text-black rounded-full px-4 py-2 border border-cyan-400 hover:bg-cyan-500 hover:border-cyan-500 transition ease-in-out duration-300 transform hover:scale-105">
            <a href="/RestockAdd">Add A New Restock Request</a>
          </button>
        </div>


  <div className="overflow-x-auto sm:rounded-lg tablestyle">
  <table className="w-full text-sm border-separate border-spacing-x-0 border-spacing-y-2 text-gray-500 ">
  <thead className="text-xs text-gray-700 uppercase bg-white">
          
            <tr>
              <th  className="p-4">#</th>
              <th  className="p-4">Restock ID</th>
              <th  className="p-4">Product Name</th>
              <th  className="p-4">Restock Date</th>
              <th  className="p-4">Restock Status</th>
              <th  className="p-4">Restock Quantity</th>
              <th  className="p-4">Restock Notes</th>
              <th  className="p-4">Supplier Name</th>
              <th className="p-10">Actions</th>
            </tr>
          </thead>


          <tbody>
            {this.state.restocks.map((restock, index) => (
              <tr className="text-gray-600 bg-white hover:bg-gray-200 hover:text-black transition ease-in-out duration-300 transform hover:scale-95" key={index}>
                <th scope="row">{index + 1}</th>
                <td className="text-center py-2 px-2 w-[6ch]">{restock._id.slice(0, 6)}</td>
                <td className="text-center py-2 px-4">{restock.ProductName}</td>
                <td className="text-center py-4 px-4">{restock.restockDate.split("T")[0]}</td>
                <td className="text-center py-4 px-4">{restock.restockStatus}</td>
                <td className="text-center py-4 px-4">{restock.restockQuantity}</td>
                <td className="text-center py-2 px-4">{restock.restockSupplierID}</td>
                <td className="text-center py-2 px-4">{restock.restockNotes}</td>

                <td className="text-center py-2 px-4">
                      {restock.restockStatus !== 'Declined' && restock.restockStatus !== 'Pending' &&(
                        <div class="flex space-x-4" className="text-cyan-500">
                          <a className="btn btn-warning transition ease-in-out duration-300 transform hover:scale-105" href={`/productcreate`}>
                            <i className="fas fa-edit"></i>&nbsp;Restock
                          </a>
                          <button className="text-red-500" href="#" onClick={() => this.onDelete(restock._id)}>
                            <i className="fas fa-trash-alt transition ease-in-out duration-300 transform hover:scale-105"></i>&nbsp;Delete
                          </button>
                        </div>
                      )}
                      {restock.restockStatus === 'Declined' && (
                        <button className="text-red-500" href="#" onClick={() => this.onDelete(restock._id)}>
                          <i className="fas fa-trash-alt transition ease-in-out duration-300 transform hover:scale-105"></i>&nbsp;Delete
                        </button>
                      )}
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