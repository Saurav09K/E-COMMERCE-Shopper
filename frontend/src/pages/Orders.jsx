import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import '../css/Orders.css';

const Orders = () => {
    const { products } = useContext(ShopContext);

    // We are grabbing a few items from your inventory to act as "fake orders" 
    // just so we can build the visual layout. Later, this will be real backend data!
    const orderData = products.slice(1, 4);

    return (
        <div className="orders-container">
            <div className="orders-title">
                <h2>MY <span className="text-gray">ORDERS</span></h2>
                <hr />
            </div>

            <div className="orders-list">
                {orderData.map((item, index) => (
                    <div key={index} className="order-card">
                        
                        {/* Left Side: Image and Basic Info */}
                        <div className="order-info-section">
                            <img src={item.image[0]} alt={item.name} className="order-image" />
                            <div>
                                <p className="order-item-name">{item.name}</p>
                                <div className="order-details">
                                    <p className="order-price">${item.price}</p>
                                    <p>Quantity: 1</p>
                                    <p>Size: M</p>
                                </div>
                                <p className="order-date">
                                    Date: <span>25 Jul, 2024</span>
                                </p>
                            </div>
                        </div>

                        {/* Right Side: Status and Action Button */}
                        <div className="order-status-section">
                            <div className="status-indicator">
                                <span className="status-dot"></span>
                                <p>Ready to ship</p>
                            </div>
                            <button className="track-order-btn">Track Order</button>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
};

export default Orders;