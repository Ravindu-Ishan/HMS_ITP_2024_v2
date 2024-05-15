
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

// Importing top navigation bar components
import TopNavInventory from '../../components/TopNavInventory';

const Home = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    retrieveProducts();
  }, []);

  const retrieveProducts = () => {
    axios.get("/products").then(res => {
      if (res.data.success) {
        setProducts(res.data.existingProducts);
      }
    }).catch(error => {
      console.error("Error fetching products:", error);
      // Handle error state here
    });
  }

  const onDelete = (id) => {
    axios.delete(`/product/delete/${id}`).then((res) => {
      alert("Deleted Successfully");
      retrieveProducts();
    }).catch(error => {
      console.error("Error deleting product:", error);
      // Handle error state here
    });
  }

  const filterData = (products, searchKey) => {
    const result = products.filter(product =>
      product.ProductName.toLowerCase().includes(searchKey)
    );
    setProducts(result);
  }

  const handleSearchArea = (e) => {
    const searchKey = e.currentTarget.value.toLowerCase();
    axios.get("/products")
      .then(res => {
        if (res.data.success) {
          filterData(res.data.existingProducts, searchKey);
        }
      })
      .catch(error => {
        console.error("Error searching products:", error);
        // Handle error state here
      });
  }

  const onLowStockClick = (product) => {

  
    // Navigate to the RestockRequestAdd page
    navigate(`/RestockAdd`);
  }

  return (
    <>
      {/* top nav imported to this section */}
      <div className="navarea">
        <TopNavInventory />
      </div>

      <main>
      <div className="flex justify-between items-center sticky top-0 max-w bg-white border border-gray-200 rounded-xl shadow py-5 px-10 ">
      <div className="flex items-center space-x-4 transition ease-in-out duration-300 transform hover:scale-105">
          <input
             className="form-control bg-cyan-400 focus:bg-cyan-500  hover:bg-cyan-500 hover:border-cyan-500 text-black placeholder-black::placeholder rounded-full py-2 px-4"
             type="search"
             placeholder="Search "
             name="searchQuery"
             onChange={handleSearchArea}
           />
      </div>
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <h3 className="font-bold text-xl">PRODUCT DETAILS</h3>
          </div>

          <button className="bg-cyan-400 text-black rounded-full px-4 py-2 border border-cyan-400 hover:bg-cyan-500 hover:border-cyan-500 transition ease-in-out duration-300 transform hover:scale-105">
            <a href="/productcreate">Add New Product</a>
          </button>
        </div>

        <div className="overflow-x-auto sm:rounded-lg tablestyle">
          <table className="w-full text-sm border-separate border-spacing-x-0 border-spacing-y-2 text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-white">
              <tr>
                <th className="p-4">#</th>
                <th className="p-4">Product ID</th>
                <th className="p-4">Product Name</th>
                <th className="p-4">Expire Date</th>
                <th className="p-4">Manufacture Date</th>
                <th className="p-4">Quantity</th>
                <th className="p-4">Product Price</th>
                <th className="p-4">Supplier Name</th>
                <th className="p-4">Stock Level</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {products.map((product, index) => (
                <tr className="text-gray-600 bg-white hover:bg-gray-200 hover:text-black transition ease-in-out duration-300 transform hover:scale-95" key={index}>
                  <th scope="row">{index + 1}</th>
                  <td className="text-center py-2 px-2 w-[6ch]">{product._id.slice(0, 6)}</td>
                  <td className="text-center py-2 px-2 ">{product.ProductName}</td>
                  <td className="text-center py-2 px-18">{product.ExpireDate}</td>
                  <td className="text-center py-2 px-2">{product.ManufactureDate}</td>
                  <td className="text-center py-2 px-1">{product.Quantity}</td>
                  <td className="text-center py-2 px-2">{product.ProductPrice}</td>
                  <td className="text-center py-2 px-2">{product.SupplierName}</td>
                  <td className="text-center py-2 px-2">
                    {product.Quantity < 10 ? (
                      <span
                        className="text-red-500 font-bold cursor-pointer"
                        onClick={() => onLowStockClick(product)}
                      >
                        Low Stock
                      </span>
                    ) : 'In Stock'}
                  </td>
                  <td className="flex space-x-4 py-2 px-2">
                    <a className="btn btn-primary transition ease-in-out duration-300 transform hover:scale-105" href={`/productedit/${product._id}`}>
                      <i className="fas fa-edit"></i>&nbsp;Edit
                    </a>
                    <button className="btn btn-danger transition ease-in-out duration-300 transform hover:scale-105" onClick={() => onDelete(product._id)}>
                      <i className="fas fa-trash-alt"></i>&nbsp;Delete
                    </button>
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

export default Home;
