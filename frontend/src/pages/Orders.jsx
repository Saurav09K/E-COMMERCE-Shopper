import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import '../css/Orders.css';

const Orders = () => {
    const { backendUrl, token } = useContext(ShopContext);
    const [orderData, setOrderData] = useState([]);

    const loadOrderData = async () => {
        try {
            if (!token) return;

            const response = await axios.get(
                `${backendUrl}/api/order/myorders`, 
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (response.data.success) {
                let allOrdersItem = [];
                
                response.data.orders.map((order) => {
                    order.items.map((item) => {
                        item['status'] = order.status;
                        item['payment'] = order.payment;
                        item['paymentMethod'] = order.paymentMethod;
                        item['date'] = order.date;
                        allOrdersItem.push(item);
                    });
                });
                setOrderData(allOrdersItem.reverse());
            }
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    useEffect(() => {
        loadOrderData();
    }, [token]);

    return (
        <div className="orders-container">
            <div className="orders-title">
                <h2>MY <span className="text-gray">ORDERS</span></h2>
                <hr />
            </div>

            <div className="orders-list">
                {orderData.map((item, index) => (
                    <div key={index} className="order-card">
                        
                        <div className="order-info-section">
                            <img src={item.image[0]} alt={item.name} className="order-image" />
                            <div>
                                <p className="order-item-name">{item.name}</p>
                                <div className="order-details">
                                    <p className="order-price">${item.price}</p>
                                    <p>Quantity: {item.quantity}</p>
                                    <p>Size: {item.size}</p>
                                </div>
                                <p className="order-date">
                                   
                                    Date: <span>{new Date(item.date).toDateString()}</span>
                                </p>
                            </div>
                        </div>

                        <div className="order-status-section">
                            <div className="status-indicator">
                                <span className="status-dot"></span>
                                <p>{item.status}</p>
                            </div>
                           
                            <button onClick={loadOrderData} className="track-order-btn">Track Order</button>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
};

export default Orders;