import React, { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios'; 
import '../css/PlaceOrder.css';

const PlaceOrder = () => {
    const { backendUrl, token, cartItems, setCartItems, getCartAmount, products } = useContext(ShopContext);
    
    const [method, setMethod] = useState('cod'); 
    const navigate = useNavigate();

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        
        try {
            const formInputs = new FormData(event.target);
            const address = {
                firstName: formInputs.get('firstName'),
                lastName: formInputs.get('lastName'),
                email: formInputs.get('email'),
                street: formInputs.get('street'),
                city: formInputs.get('city'),
                state: formInputs.get('state'),
                zipcode: formInputs.get('zipcode'),
                country: formInputs.get('country'),
                phone: formInputs.get('phone')
            };

            // Bundle the cart items
            let orderItems = [];
            for (const items in cartItems) {
                for (const item in cartItems[items]) {
                    if (cartItems[items][item] > 0) {
                        const itemInfo = structuredClone(products.find(product => product._id === items));
                        if (itemInfo) {
                            itemInfo.size = item;
                            itemInfo.quantity = cartItems[items][item];
                            orderItems.push(itemInfo);
                        }
                    }
                }
            }

            // The Final Package
            let orderData = {
                address: address,
                items: orderItems,
                amount: getCartAmount() + 10, // Product total + Shipping
            };

            
            if (method === 'cod') {
                const response = await axios.post(`${backendUrl}/api/order/place`, 
                    orderData, 
                    { headers: { Authorization: `Bearer ${token}` } }
                );

                if (response.data.success) {
                    alert("Order Placed Successfully!");
                    setCartItems({}); // Empty the cart
                    navigate('/orders'); 
                } else {
                    alert(response.data.message);
                }
            }
        } catch (error) {
            console.error("Order error:", error);
        }
    }

    return (
        <form onSubmit={onSubmitHandler} className="place-order-container">
            
            {/* --- LEFT SIDE: DELIVERY INFORMATION --- */}
            <div className="delivery-info">
                <div className="title-container">
                    <h2>DELIVERY <span className="text-gray">INFORMATION</span></h2>
                    <hr />
                </div>
                
                <div className="multi-fields">
                    <input required name="firstName" type="text" placeholder="First name" className="input-field" />
                    <input required name="lastName" type="text" placeholder="Last name" className="input-field" />
                </div>
                <input required name="email" type="email" placeholder="Email address" className="input-field" />
                <input required name="street" type="text" placeholder="Street" className="input-field" />
                
                <div className="multi-fields">
                    <input required name="city" type="text" placeholder="City" className="input-field" />
                    <input required name="state" type="text" placeholder="State" className="input-field" />
                </div>
                <div className="multi-fields">
                    <input required name="zipcode" type="number" placeholder="Zip code" className="input-field" />
                    <input required name="country" type="text" placeholder="Country" className="input-field" />
                </div>
                <input required name="phone" type="number" placeholder="Phone" className="input-field" />
            </div>

            {/* --- RIGHT SIDE: CART TOTALS & PAYMENT --- */}
            <div className="order-summary">
                
                {/* Cart Totals Box */}
                <div className="totals-box">
                    <div className="title-container">
                        <h2>CART <span className="text-gray">TOTALS</span></h2>
                        <hr />
                    </div>
                    
                    <div className="totals-row">
                        <p>Subtotal</p>
                        <p>${getCartAmount()}.00</p>
                    </div>
                    <hr className="faint-line"/>
                    <div className="totals-row">
                        <p>Shipping Fee</p>
                        <p>${getCartAmount() === 0 ? 0 : 10}.00</p> 
                    </div>
                    <hr className="faint-line"/>
                    <div className="totals-row bold-row">
                        <p>Total</p>
                        <p>${getCartAmount() === 0 ? 0 : getCartAmount() + 10}.00</p>
                    </div>
                </div>

                {/* Payment Methods */}
                <div className="payment-box">
                    <div className="title-container">
                        <h2>PAYMENT <span className="text-gray">METHOD</span></h2>
                        <hr />
                    </div>
                    
                    <div className="payment-options">
                        <div onClick={() => setMethod('stripe')} className={`payment-method ${method === 'stripe' ? 'selected' : ''}`}>
                            <span className="radio-circle"></span>
                            <p>STRIPE</p>
                        </div>
                        <div onClick={() => setMethod('razorpay')} className={`payment-method ${method === 'razorpay' ? 'selected' : ''}`}>
                            <span className="radio-circle"></span>
                            <p>RAZORPAY</p>
                        </div>
                        <div onClick={() => setMethod('cod')} className={`payment-method ${method === 'cod' ? 'selected' : ''}`}>
                            <span className="radio-circle"></span>
                            <p>CASH ON DELIVERY</p>
                        </div>
                    </div>

                    <button type="submit" className="place-order-btn">PLACE ORDER</button>
                </div>

            </div>
        </form>
    );
};

export default PlaceOrder;