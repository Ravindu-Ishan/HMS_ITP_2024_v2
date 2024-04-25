import React, { Component } from 'react';
import axios from 'axios';

//importing top navigation bar components
import TopNavInventory from '../../components/TopNavInventory';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
    };
  }

  componentDidMount() {
    this.retrieveProducts();
  }

  retrieveProducts() {
    axios.get("/products").then(res => {
      if (res.data.success) {
        this.setState({
          products: res.data.existingProducts
        });
      }
    }).catch(error => {
      console.error("Error fetching products:", error);
      // Handle error state here
    });
  }

  onDelete = (id) => {
    axios.delete(`/product/delete/${id}`).then((res) => {
      alert("Deleted Successfully");
      this.retrieveProducts();
    }).catch(error => {
      console.error("Error deleting product:", error);
      // Handle error state here
    });
  }

  filterData(products, searchkey) {
    const result = products.filter(product =>
      product.ProductName.toLowerCase().includes(searchkey)
    );
    this.setState({ products: result });
  }

  handleSearchArea = (e) => {
    const searchkey = e.currentTarget.value.toLowerCase();
    axios.get("/products")
      .then(res => {
        if (res.data.success) {
          this.filterData(res.data.existingProducts, searchkey);
        }
      })
      .catch(error => {
        console.error("Error searching products:", error);
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
              <th className="p-4">Product ID</th>
              <th className="p-4">Product Name</th>
              <th className="p-4">Expire Date</th>
              <th className="p-4">Manufacture Date</th>
              <th className="p-4">Quantity</th>
              <th className="p-4">Product Price</th>
              <th className="p-4">Supplier ID</th>
              <th className="p-4">Actions</th>
        </tr>
  </thead>

  <tbody>
  {this.state.products.map((product, index) => (
    <tr className="text-gray-600 bg-white hover:bg-gray-200 hover:text-black" key={index}>
      <th scope="row">{index + 1}</th>
      <td className="text-center py-2 px-2">
        <a href={`/product/${product._id}`}>{product._id}</a>
      </td>
      <td className="text-center py-2 px-2">{product.ProductName}
      </td>
      <td className="text-center py-2 px-2">{product.ExpireDate}
      </td>
      <td className="text-center py-2 px-2">{product.ManufactureDate}
      </td>
      <td className="text-center py-2 px-2">{product.Quantity}
      </td>
      <td className="text-center py-2 px-2">{product.ProductPrice}
      </td>
      <td className="text-center py-2 px-2">{product.SupplierID}
      </td>
      <td className="flex space-x-4 py-2 px-2">
        <a className="btn btn-primary" href={`/productedit/${product._id}`}>
          <i className="fas fa-edit"></i>&nbsp;Edit
        </a>
        <button className="btn btn-danger" onClick={() => this.onDelete(product._id)}>
          <i className="fas fa-trash-alt"></i>&nbsp;Delete
        </button>
      </td>
    </tr>
  ))}
</tbody>
</table>




  <div className="flex justify-center items-center">
        <button className="bg-cyan-400 text-black rounded-full px-4 py-2 border-1 border-cyan-400 hover:bg-cyan-500 hover:border-cyan-500">
                 <a href="/productcreate">Add New Product</a>
        </button>
  </div>
      </div>
</main>
      </>
    );
  }
}
