import React, { useState } from 'react';
import '../css/Add.css';

const Add = ({ token }) => {
    // All the data we need to send to MongoDB!
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("Men");
    const [subCategory, setSubCategory] = useState("Topwear");
    const [bestseller, setBestseller] = useState(false);
    const [sizes, setSizes] = useState([]);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        console.log("Form Submitted!");
        // We will wire this to Axios later
    };

    return (
        <form onSubmit={onSubmitHandler} className="add-form">
            
            <div className="form-group">
                <p>Product Name</p>
                <input onChange={(e)=>setName(e.target.value)} value={name} type="text" placeholder="Type here" required />
            </div>

            <div className="form-group">
                <p>Product Description</p>
                <textarea onChange={(e)=>setDescription(e.target.value)} value={description} placeholder="Write content here" required />
            </div>

            <div className="form-row">
                <div className="form-group">
                    <p>Product Category</p>
                    <select onChange={(e)=>setCategory(e.target.value)}>
                        <option value="Men">Men</option>
                        <option value="Women">Women</option>
                        <option value="Kids">Kids</option>
                    </select>
                </div>

                <div className="form-group">
                    <p>Sub Category</p>
                    <select onChange={(e)=>setSubCategory(e.target.value)}>
                        <option value="Topwear">Topwear</option>
                        <option value="Bottomwear">Bottomwear</option>
                        <option value="Winterwear">Winterwear</option>
                    </select>
                </div>

                <div className="form-group">
                    <p>Product Price</p>
                    <input onChange={(e)=>setPrice(e.target.value)} value={price} type="number" placeholder="25" required />
                </div>
            </div>

            {/* We will build the Image Upload and Sizes selector next! */}

            <div className="form-group checkbox-group">
                <input onChange={() => setBestseller(prev => !prev)} checked={bestseller} type="checkbox" id="bestseller" />
                <label htmlFor="bestseller">Add to Bestseller</label>
            </div>

            <button type="submit" className="add-btn">ADD</button>
        </form>
    );
};

export default Add;