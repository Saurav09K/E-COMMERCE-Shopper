import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';
import herosection from '../assets/herosection.jpg';
import '../css/Home.css'; 

const Home = () => {

  const { products } = useContext(ShopContext);
    
    //State to hold just the top 10 items
    const [latestProducts, setLatestProducts] = useState([]);

    useEffect(() => {
        if (products && products.length > 0) {
            setLatestProducts(products.slice(0, 10));
        }
    }, [products]);

    return (
        <div className="home-container">
            
            {/* --- HERO SECTION (The Big Banner) --- */}
            <div className="hero-section" style={{ 
                    backgroundImage: `url(${herosection})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }} >
                <div className="hero-content">
                    <div className="hero-text-line">
                        <span className="short-line"></span>
                        <p>OUR BESTSELLERS</p>
                    </div>
                    <h1 className="hero-title">Latest Arrivals</h1>
                    <div className="hero-text-line">
                        <p className="shop-now-text">SHOP NOW</p>
                        <span className="long-line"></span>
                    </div>
                </div>
            </div>

            {/* --- LATEST COLLECTIONS SECTION --- */}
            <div className="latest-section">
                <div className="section-title">
                    <h2>LATEST <span className="text-gray">COLLECTIONS</span></h2>
                    <p>Explore our newest arrivals and refresh your wardrobe today.</p>
                </div>

                {/* --- THE PRODUCT GRID --- */}
                <div className="product-grid">
                    {latestProducts.map((item, index) => (
                        // We wrap each item in a Link so it can be clicked later
                        <Link to={`/product/${item._id}`} className="product-card" key={index}>
                            
                            <div className="image-container">
                                <img src={item.image[0]} alt={item.name} className="product-image" />
                            </div>
                            
                            <p className="product-name">{item.name}</p>
                            <p className="product-price">${item.price}</p>
                            
                        </Link>
                    ))}
                </div>
            </div>
            
        </div>
    );
};

export default Home;