import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';



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
    <div className="col-md-8 mt-4 mx-auto">
      <h1 className="h3 mb-3 font-weight-normal">Edit Supplier Details</h1>
      <form className="needs-validation" noValidate>
        <div className="form-group" style={{ marginBottom: '15px' }}>
          <label style={{ marginBottom: '5px' }}>Supplier Name</label>
          <input
            type="text"
            className="form-control"
            name="SupplierName"
            placeholder="Enter topic"
            value={SupplierName}
            onChange={handleInputChange}
          />
        </div>


        <div className="form-group" style={{ marginBottom: '15px' }}>
          <label style={{ marginBottom: '5px' }}>Supplier Brand</label>
          <input
            type="text"
            className="form-control"
            name="SupplierBrand"
            placeholder="Enter Supplier Brand"
            value={SupplierBrand}
            onChange={handleInputChange}
          />
        </div>



        <div className="form-group" style={{ marginBottom: '15px' }}>
          <label style={{ marginBottom: '5px' }}>Supplier Location</label>
          <input
            type="text"
            className="form-control"
            name="SupplierLocation"
            placeholder="Enter Supplier Location"
            value={SupplierLocation}
            onChange={handleInputChange}
          />
        </div>

        <button
          className="btn btn-success"
          type="submit"
          style={{ marginTop: '15px' }}
          onClick={onSubmit}
        >
          <i className="far fa-check-square2"></i>
          &nbsp; Update
        </button>
      </form>
    </div>
  );
};

export default SupplierEditPost;
