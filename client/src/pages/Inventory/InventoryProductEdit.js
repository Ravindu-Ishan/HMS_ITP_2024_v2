import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import EmptyNavArea from "./EmptyNavArea";

const ProductEditPost = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [ProductName, setProductName] = useState("");
  const [ExpireDate, setExpireDate] = useState("");
  const [ManufactureDate, setManufactureDate] = useState("");
  const [Quantity, setQuantity] = useState("");
  const [ProductPrice, setProductPrice] = useState("");
  const [SupplierName, setSupplierName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/product/${id}`);
        if (response.data.success) {
          const { ProductName, ExpireDate, ManufactureDate, Quantity, ProductPrice, SupplierName } = response.data.product;
          setProductName(ProductName);
          setExpireDate(ExpireDate);
          setManufactureDate(ManufactureDate);
          setQuantity(Quantity);
          setProductPrice(ProductPrice);
          setSupplierName(SupplierName);
        } else {
          console.error('Failed to fetch product data:', response.data.error);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    if (id) {
      fetchData();
    }

    // Cleanup function
    return () => {
      // Perform any cleanup here if needed
    };
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "ProductName":
        setProductName(value);
        break;
      case "ExpireDate":
        setExpireDate(value);
        break;
      case "ManufactureDate":
        setManufactureDate(value);
        break;
      case "Quantity":
        setQuantity(value);
        break;
      case "ProductPrice":
        setProductPrice(value);
        break;
      case "SupplierName":
        setSupplierName(value);
        break;
      default:
        break;
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = {
        ProductName,
        ExpireDate,
        ManufactureDate,
        Quantity,
        ProductPrice,
        SupplierName,
      };
      
      const response = await axios.put(`/product/update/${id}`, data);
      if (response.data.success) {
        alert("Product Updated Successfully");
        setProductName("");
        setExpireDate("");
        setManufactureDate("");
        setQuantity("");
        setProductPrice("");
        setSupplierName("");
        navigate('/productmain');
      } else {
        console.error('Failed to update product:', response.data.error);
      }
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

     return (
            <>

            <EmptyNavArea />
            
            <main className="flex items-center justify-center">
            <div className="max-w-md mx-auto">

            <h1 className="text-xl font-bold mb-3 text-center">Edit Product</h1>

        <div className="mb-6 transition ease-in-out duration-300 transform hover:scale-105">
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="ProductName">Product Name</label>
          <input
            type="text"
            className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            name="ProductName"
            placeholder="Enter Product Name"
            value={ProductName}
            onChange={handleInputChange}
          />
        </div>

        <div  className="mb-6 transition ease-in-out duration-300 transform hover:scale-105">
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="ProductExpire">Product Expire Date</label>
          <input
            type="date"
            className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            name="ExpireDate"
            placeholder="Enter Product Expire Date"
            value={ExpireDate}
            onChange={handleInputChange}
          />
        </div>

        <div  className="mb-6 transition ease-in-out duration-300 transform hover:scale-105">
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="ManufactureDate">Product Manufacture Date</label>
          <input
            type="date"
            className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            name="ManufactureDate"
            placeholder="Enter Manufacture Date"
            value={ManufactureDate}
            onChange={handleInputChange}
          />
        </div>

        <div  className="mb-6 transition ease-in-out duration-300 transform hover:scale-105">
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="Quantity">Product Quantity</label>
          <input
            type="number"
            className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            name="Quantity"
            placeholder="Enter Product Quantity"
            value={Quantity}
            onChange={handleInputChange}
          />
        </div>

        <div  className="mb-6 transition ease-in-out duration-300 transform hover:scale-105">
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="ProductPrice">Product Price</label>
          <input
            type="number"
            className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            name="ProductPrice"
            placeholder="Enter Product Price"
            value={ProductPrice}
            onChange={handleInputChange}
          />
        </div>

        <div  className="mb-6 transition ease-in-out duration-300 transform hover:scale-105">
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="SupplierID">Supplier Name</label>
          <input
            type="text"
            className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            name="SupplierName"
            placeholder="Enter Supplier Name"
            value={SupplierName}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-6 text-center transition ease-in-out duration-300 transform hover:scale-105">
        <button
          className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2"
          type="submit"
          onClick={onSubmit}
        >
          <i className="far fa-check-square"></i>
          Update
        </button>
        </div>
    
    </div>
    </main>
    </>
  );
};

export default ProductEditPost;