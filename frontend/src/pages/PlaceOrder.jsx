import React, { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import '../css/PlaceOrder.css';

const PlaceOrder = () => {
    const { getCartAmount } = useContext(ShopContext);
    
    const [method, setMethod] = useState('cod'); 

    // We will wire this up to your backend later!
    const onSubmitHandler = async (event) => {
        event.preventDefault();
        alert(`Order Placed using ${method.toUpperCase()}!`);
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
                    <input required type="text" placeholder="First name" className="input-field" />
                    <input required type="text" placeholder="Last name" className="input-field" />
                </div>
                <input required type="email" placeholder="Email address" className="input-field" />
                <input required type="text" placeholder="Street" className="input-field" />
                
                <div className="multi-fields">
                    <input required type="text" placeholder="City" className="input-field" />
                    <input required type="text" placeholder="State" className="input-field" />
                </div>
                <div className="multi-fields">
                    <input required type="number" placeholder="Zip code" className="input-field" />
                    <input required type="text" placeholder="Country" className="input-field" />
                </div>
                <input required type="number" placeholder="Phone" className="input-field" />
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
                        {/* Adding a flat $10 shipping fee for realism */}
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