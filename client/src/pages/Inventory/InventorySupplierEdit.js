import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import EmptyNavArea from "./EmptyNavArea";

const SupplierEditPost = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [SupplierName, setSupplierName] = useState("");
  const [SupplierBrand, setSupplierBrand] = useState("");
  const [SupplierLocation, setSupplierLocation] = useState("");
  useEffect(() =>{
    const fetchData = async () => {
      try {
        const response = await axios.get(`/Supplier/${id}`);
        if (response.data.success) {
          const {SupplierName,SupplierBrand,SupplierLocation} = response.data.supplier;
          setSupplierName(SupplierName);
          setSupplierBrand(SupplierBrand);
          setSupplierLocation(SupplierLocation);

        } else {
          console.error('Failed to fetch post data:', response.data.error);
        }
      } catch (error) {
        console.error('Error fetching post:', error);
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
      case "SupplierName":
        setSupplierName(value);
        break;
      case "SupplierBrand":
        setSupplierBrand(value);
        break;
      case "SupplierLocation":
        setSupplierLocation(value);
        break;
      default:
        break;
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = {
        SupplierName,SupplierBrand,SupplierLocation
      };
      
      const response = await axios.put(`/Supplier/update/${id}`, data);
      if (response.data.success) {
        alert("Post Updated Successfully");
        setSupplierName("");
        setSupplierBrand("");
        setSupplierLocation("");
        navigate('/suppliermain');
 
      } else {
        console.error('Failed to update post:', response.data.error);
      }
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  return (
    <>

    <EmptyNavArea />
    
    <main className="flex items-center justify-center">
    <div className="max-w-md mx-auto">


    <h1 className="text-xl font-bold mb-3 text-center">Edit Supplier Details</h1>

    
        <div className='mb-6 transition ease-in-out duration-300 transform hover:scale-105'>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="ProductName">Supplier Name</label>
          <input
            type="text"
            className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            name="SupplierName"
            placeholder="Enter topic"
            value={SupplierName}
            onChange={handleInputChange}
          />
        </div>


        <div className='mb-6 transition ease-in-out duration-300 transform hover:scale-105'>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="ProductName">Supplier Brand</label>
          <input
            type="text"
            className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            name="SupplierBrand"
            placeholder="Enter Supplier Brand"
            value={SupplierBrand}
            onChange={handleInputChange}
          />
        </div>



        <div className='mb-6 transition ease-in-out duration-300 transform hover:scale-105'>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="ProductName">Supplier Location</label>
          <input
            type="text"
            className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            name="SupplierLocation"
            placeholder="Enter Supplier Location"
            value={SupplierLocation}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-6 text-center transition ease-in-out duration-300 transform hover:scale-105">
        <button
          className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2"
          type="submit"
          onClick={onSubmit}
        >
          <i className="far fa-check-square2"></i>
          Update
        </button>
        </div>
     
    </div>
    </main>
  </>
  );
};

export default SupplierEditPost;
