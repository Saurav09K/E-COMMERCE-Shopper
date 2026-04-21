import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/List.css';

const backendUrl = "http://localhost:5000";

const List = ({ token }) => {
    const [list, setList] = useState([]);

    const fetchList = async () => {
        try {
            const response = await axios.get(`${backendUrl}/api/product/list`);
            
            if (response.data.product) {
                setList(response.data.product);
            } else {
                alert("Could not load products");
            }
        } catch (error) {
            console.log(error);
            alert("Error fetching list");
        }
    };

   const removeProduct = async (id) => {
        try {
            const response = await axios.delete(`${backendUrl}/api/product/remove/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.data.message === "Product removed successfully") {
                alert("Product Removed");
                await fetchList(); 
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.log(error);
            alert("Error removing product");
        }
    };

    useEffect(() => {
        fetchList();
    }, []);

    return (
        <div className="list-container">
            <p className="list-title">All Products List</p>

            <div className="list-table">
                {/* --- Table Header --- */}
                <div className="list-table-format title-row">
                    <b>Image</b>
                    <b>Name</b>
                    <b>Category</b>
                    <b>Price</b>
                    <b className="text-center">Action</b>
                </div>

                {/* --- Table Rows (Mapping through your MongoDB data) --- */}
                {list.map((item, index) => {
                    return (
                        <div className="list-table-format" key={index}>
                            {/* Display the first image from the Cloudinary array */}
                            <img src={item.image[0]} alt="" />
                            <p>{item.name}</p>
                            <p>{item.category}</p>
                            <p>${item.price}</p>
                            <p onClick={() => removeProduct(item._id)} className="delete-btn">X</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default List;