import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import '../css/Cart.css';
import { Link } from 'react-router-dom';

const Cart = () => {
    const { products, cartItems, updateQuantity } = useContext(ShopContext);
    const [cartData, setCartData] = useState([]);

    // This converts the complex cart object into a simple array we can loop through
    useEffect(() => {
        if (products.length > 0) {
            const tempData = [];
            for (const items in cartItems) {
                for (const item in cartItems[items]) {
                    if (cartItems[items][item] > 0) {
                        tempData.push({
                            _id: items,
                            size: item,
                            quantity: cartItems[items][item]
                        });
                    }
                }
            }
            setCartData(tempData);
        }
    }, [cartItems, products]);

    return (
        <div className="cart-container">
            <div className="cart-title">
                <h2>YOUR <span className="text-gray">CART</span></h2>
                <hr />
            </div>

            <div className="cart-items-list">
                {cartData.map((item, index) => {
                    // Find the actual product details (image, name, price) from our global inventory
                    const productData = products.find((product) => product._id === item._id);
                    
                    if (!productData) return null; 

                    return (
                        <div key={index} className="cart-item">
                            
                            <div className="cart-item-info">
                                <img src={productData.image[0]} alt="" className="cart-item-image" />
                                <div>
                                    <p className="item-name">{productData.name}</p>
                                    <div className="item-details">
                                        <p className="item-price">${productData.price}</p>
                                        <p className="item-size">{item.size}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Quantity Input */}
                            <input 
                                onChange={(e) => e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item._id, item.size, Number(e.target.value))}
                                className="quantity-input" 
                                type="number" 
                                min="1" 
                                defaultValue={item.quantity} 
                            />

                            {/* Delete Button (Updates quantity to 0) */}
                            <img 
                                onClick={() => updateQuantity(item._id, item.size, 0)} 
                                src={assets.bin_icon} 
                                alt="Remove" 
                                className="delete-icon" 
                            />

                        </div>
                    );
                })}
            </div>
            
            
            <div className="cart-footer">
                <Link to="/place-order" className="checkout-btn" style={{underline : "none"}}>PROCEED TO CHECKOUT</Link>
            </div>
        </div>
    );
};

export default Cart;