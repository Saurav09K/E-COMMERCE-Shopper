import React, { useState } from 'react';
import axios from 'axios';
import '../css/Add.css';

const backendUrl = "http://localhost:5000"; 

const Add = ({ token }) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("Men");
    const [subCategory, setSubCategory] = useState("Topwear");
    const [bestseller, setBestseller] = useState(false);
    
    // Arrays & Files
    const [sizes, setSizes] = useState([]);
    const [image1, setImage1] = useState(false);
    const [image2, setImage2] = useState(false);
    const [image3, setImage3] = useState(false);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        
        try {
            const formData = new FormData();

            formData.append("name", name);
            formData.append("description", description);
            formData.append("price", price);
            formData.append("category", category);
            formData.append("subCategory", subCategory);
            formData.append("bestseller", bestseller);
            
            // Turn the React array into a string so it can travel over the internet
            formData.append("sizes", JSON.stringify(sizes));

            if(image1) formData.append("image1", image1);
            if(image2) formData.append("image2", image2);
            if(image3) formData.append("image3", image3);

            // Send it to backend!
            const response = await axios.post(`${backendUrl}/api/product/add`, formData, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.data.message === "Product added successfully") {
                alert("Product Added!");
                
                setName(''); setDescription(''); setPrice('');
                setImage1(false); setImage2(false); setImage3(false);
                setSizes([]);
            } else {
                alert(response.data.message);
            }

        } catch (error) {
            console.log(error);
            alert("Upload Failed");
        }
    };

    return (
        <form onSubmit={onSubmitHandler} className="add-form">
            
            {/* --- IMAGE UPLOAD SECTION --- */}
            <div className="form-group">
                <p>Upload Images (Up to 3)</p>
                <div className="image-upload-row">
                    <label htmlFor="image1">
                        <div className={`upload-box ${image1 ? 'has-image' : ''}`}>
                            {/* If there's an image, show a preview! Otherwise, show a plus sign */}
                            {image1 ? <img src={URL.createObjectURL(image1)} alt="" /> : "+"}
                        </div>
                        <input onChange={(e)=>setImage1(e.target.files[0])} type="file" id="image1" hidden />
                    </label>

                    <label htmlFor="image2">
                        <div className={`upload-box ${image2 ? 'has-image' : ''}`}>
                            {image2 ? <img src={URL.createObjectURL(image2)} alt="" /> : "+"}
                        </div>
                        <input onChange={(e)=>setImage2(e.target.files[0])} type="file" id="image2" hidden />
                    </label>

                    <label htmlFor="image3">
                        <div className={`upload-box ${image3 ? 'has-image' : ''}`}>
                            {image3 ? <img src={URL.createObjectURL(image3)} alt="" /> : "+"}
                        </div>
                        <input onChange={(e)=>setImage3(e.target.files[0])} type="file" id="image3" hidden />
                    </label>
                </div>
            </div>

            {/* --- TEXT INFO --- */}
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

            {/* --- SIZES SELECTOR --- */}
            <div className="form-group">
                <p>Product Sizes</p>
                <div className="sizes-row">
                    {/* If the size is in the array, give it a darker color! */}
                    <div onClick={()=>setSizes(prev => prev.includes("S") ? prev.filter(item => item !== "S") : [...prev, "S"])} 
                         className={`size-box ${sizes.includes("S") ? "selected" : ""}`}>S</div>
                    
                    <div onClick={()=>setSizes(prev => prev.includes("M") ? prev.filter(item => item !== "M") : [...prev, "M"])} 
                         className={`size-box ${sizes.includes("M") ? "selected" : ""}`}>M</div>
                    
                    <div onClick={()=>setSizes(prev => prev.includes("L") ? prev.filter(item => item !== "L") : [...prev, "L"])} 
                         className={`size-box ${sizes.includes("L") ? "selected" : ""}`}>L</div>
                    
                    <div onClick={()=>setSizes(prev => prev.includes("XL") ? prev.filter(item => item !== "XL") : [...prev, "XL"])} 
                         className={`size-box ${sizes.includes("XL") ? "selected" : ""}`}>XL</div>
                </div>
            </div>

            <div className="form-group checkbox-group">
                <input onChange={() => setBestseller(prev => !prev)} checked={bestseller} type="checkbox" id="bestseller" />
                <label htmlFor="bestseller">Add to Bestseller</label>
            </div>

            <button type="submit" className="add-btn">ADD</button>
        </form>
    );
};

export default Add;