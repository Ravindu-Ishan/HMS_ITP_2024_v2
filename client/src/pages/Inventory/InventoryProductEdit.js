import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const ProductEditPost = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [ProductName, setProductName] = useState("");
  const [ExpireDate, setExpireDate] = useState("");
  const [ManufactureDate, setManufactureDate] = useState("");
  const [Quantity, setQuantity] = useState("");
  const [ProductPrice, setProductPrice] = useState("");
  const [SupplierID, setSupplierID] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/product/${id}`);
        if (response.data.success) {
          const { ProductName, ExpireDate, ManufactureDate, Quantity, ProductPrice, SupplierID } = response.data.product;
          setProductName(ProductName);
          setExpireDate(ExpireDate);
          setManufactureDate(ManufactureDate);
          setQuantity(Quantity);
          setProductPrice(ProductPrice);
          setSupplierID(SupplierID);
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
      case "SupplierID":
        setSupplierID(value);
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
        SupplierID,
      };
      
      const response = await axios.put(`/product/update/${id}`, data);
      if (response.data.success) {
        alert("Product Updated Successfully");
        setProductName("");
        setExpireDate("");
        setManufactureDate("");
        setQuantity("");
        setProductPrice("");
        setSupplierID("");
        navigate('/productmain');
      } else {
        console.error('Failed to update product:', response.data.error);
      }
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <div className="col-md-8 mt-4 mx-auto">
      <h1 className="h3 mb-3 font-weight-normal">Edit Product Details</h1>
      <form className="needs-validation" noValidate>
        <div className="form-group" style={{ marginBottom: '15px' }}>
          <label style={{ marginBottom: '5px' }}>Product Name</label>
          <input
            type="text"
            className="form-control"
            name="ProductName"
            placeholder="Enter Product Name"
            value={ProductName}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group" style={{ marginBottom: '15px' }}>
          <label style={{ marginBottom: '5px' }}>Product Expire Date</label>
          <input
            type="date"
            className="form-control"
            name="ExpireDate"
            placeholder="Enter Product Expire Date"
            value={ExpireDate}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group" style={{ marginBottom: '15px' }}>
          <label style={{ marginBottom: '5px' }}>Product Manufacture Date</label>
          <input
            type="date"
            className="form-control"
            name="ManufactureDate"
            placeholder="Enter Manufacture Date"
            value={ManufactureDate}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group" style={{ marginBottom: '15px' }}>
          <label style={{ marginBottom: '5px' }}>Product Quantity</label>
          <input
            type="number"
            className="form-control"
            name="Quantity"
            placeholder="Enter Product Quantity"
            value={Quantity}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group" style={{ marginBottom: '15px' }}>
          <label style={{ marginBottom: '5px' }}>Product Price</label>
          <input
            type="number"
            className="form-control"
            name="ProductPrice"
            placeholder="Enter Product Price"
            value={ProductPrice}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group" style={{ marginBottom: '15px' }}>
          <label style={{ marginBottom: '5px' }}>Supplier ID</label>
          <input
            type="text"
            className="form-control"
            name="SupplierID"
            placeholder="Enter Supplier ID"
            value={SupplierID}
            onChange={handleInputChange}
          />
        </div>

        <button
          className="btn btn-success"
          type="submit"
          style={{ marginTop: '15px' }}
          onClick={onSubmit}
        >
          <i className="far fa-check-square"></i>
          &nbsp; Update
        </button>
      </form>
    </div>
  );
};

export default ProductEditPost;