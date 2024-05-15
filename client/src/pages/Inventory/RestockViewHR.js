import React, { Component } from 'react';
import axios from 'axios';
import EmptyNavArea from "./EmptyNavArea";

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

  acceptBtnHandler = (id) => {
    const status = 'Accepted'
    const data = {
      restockStatus: status
    }

    axios.put(`/user/userLeaves/update/${id}`, data).then(res => {
        this.retrieveRestocks()
    }).catch((error) => {
        console.log("Error fetching staff details:", error);
    });
  }

  declineBtnHandler = (id) => {
    const status = 'Declined'
    const data = {
      restockStatus: status
    }

    axios.put(`/restock/update/${id}`, data).then(res => {
        this.retrieveRestocks()
    }).catch((error) => {
        console.log("Error fetching staff details:", error);
    });
  }

  render() {
    return (
      <>
        <EmptyNavArea />
        <main className='pt-20'>
          {/* Your main content here */}
        </main>
      </>
    );
  }



  render() {
    return (
      <>
        
        <EmptyNavArea />
      <main className='pt-20'>
        <div className="flex justify-between items-center sticky top-0 max-w bg-white border border-gray-200 rounded-xl shadow py-5 px-10">
          <div className="flex items-center space-x-4">
            <input
              className="form-control"
              type="search"
              placeholder="Search"
              name="searchQuery"
              onChange={this.handleSearchArea}
            />
          </div>

          <div className="absolute left-1/2 transform -translate-x-1/2">
                <h3 className="font-bold text-xl">RESTOCK REQUEST DETAILS</h3>
          </div>
          
        </div>


  <div className="overflow-x-auto sm:rounded-lg tablestyle">
  <table className="w-full text-sm border-separate border-spacing-x-0 border-spacing-y-2 text-gray-500 ">
  <thead className="text-xs text-gray-700 uppercase bg-white">
          
            <tr>
              <th  className="p-4">#</th>
              <th  className="p-4">Restock ID</th>
              <th  className="p-4">Restock Date</th>
              <th  className="p-4">Restock Notes</th>
              <th  className="p-4">Restock Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>


          <tbody>
            {this.state.restocks.map((restock, index) => (
              <tr className="text-gray-600 bg-white hover:bg-gray-200 hover:text-black" key={index}>
                <th scope="row">{index + 1}</th>
                <td className="text-center py-2 px-4">
                  <a href={`/restock/${restock._id}`} style={{ textDecoration: 'none' }}>
                    {restock._id}
                  </a>
                </td>
                <td className="text-center py-2 px-4">{restock.restockDate}</td>
                <td className="text-center py-4 px-4">{restock.restockNotes}</td>
                <td className="text-center py-2 px-4">{restock.restockStatus}</td>
                

                <td className="text-center py-2 px-4">
                      <div className="flex justify-center items-center">
                                 <button type='button' className="text-blue-500 font-medium px-1" onClick={() => this.acceptBtnHandler(restock._id)} >Accept</button>
                                 <button type='button' onClick={() => this.declineBtnHandler(restock._id)} className="text-red-500 font-medium px-5">Decline</button>
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
  };
}
