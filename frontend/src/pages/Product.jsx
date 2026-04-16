import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import '../css/Product.css';

const Product = () => {
    const { productId } = useParams(); 
    
    const { products, addToCart } = useContext(ShopContext);
    
    //Local state for this specific page
    const [productData, setProductData] = useState(false);
    const [size, setSize] = useState(''); // Stores the clicked size

    // 4. Search the global products array for the one that matches the URL ID
    const fetchProductData = () => {
        const foundProduct = products.find((item) => item._id === productId);
        if (foundProduct) {
            setProductData(foundProduct);
        }
    };

    useEffect(() => {
        fetchProductData();
    }, [productId, products]);

    // If it hasn't loaded yet, show a clean fallback
    if (!productData) {
        return <div className="loading-state">Loading product details...</div>;
    }

    return (
        <div className="product-container">
            <div className="product-layout">
                
                {/* --- LEFT SIDE: IMAGE --- */}
                <div className="product-image-section">
                    <img src={productData.image[0]} alt={productData.name} className="main-image" />
                </div>

                {/* --- RIGHT SIDE: DETAILS & ADD TO CART --- */}
                <div className="product-info-section">
                    <h1 className="product-title">{productData.name}</h1>
                    <p className="product-price">${productData.price}</p>
                    <p className="product-description">{productData.description}</p>

                    {/* --- SIZE SELECTOR --- */}
                    <div className="size-selector">
                        <p>Select Size</p>
                        <div className="size-buttons-container">
                            {productData.sizes.map((item, index) => (
                                <button 
                                    key={index} 
                                    // If this size is selected, give it the 'active' class
                                    className={`size-btn ${item === size ? 'active' : ''}`}
                                    onClick={() => setSize(item)}
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* --- THE MONEY BUTTON --- */}
                    <button 
                        className="add-to-cart-btn"
                        onClick={() => addToCart(productData._id, size)}
                    >
                        ADD TO CART
                    </button>

                    <hr className="divider-line" />

                    {/* Extra Info */}
                    <div className="extra-info">
                        <p>100% Original product.</p>
                        <p>Cash on delivery is available on this product.</p>
                        <p>Easy return and exchange policy within 7 days.</p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Product;