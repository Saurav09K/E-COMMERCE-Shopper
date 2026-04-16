import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';
import '../css/Collection.css';

const Collection = () => {
    const { products } = useContext(ShopContext);
    
    const [showFilter, setShowFilter] = useState(false);
    const [filterProducts, setFilterProducts] = useState([]); 

    const [category, setCategory] = useState([]);
    const [subCategory, setSubCategory] = useState([]);
    const [sortType, setSortType] = useState('relevant');

    const toggleCategory = (e) => {
        if (category.includes(e.target.value)) {
            setCategory(prev => prev.filter(item => item !== e.target.value));
        } else {
            setCategory(prev => [...prev, e.target.value]);
        }
    };

    const toggleSubCategory = (e) => {
        if (subCategory.includes(e.target.value)) {
            setSubCategory(prev => prev.filter(item => item !== e.target.value));
        } else {
            setSubCategory(prev => [...prev, e.target.value]);
        }
    };

  
    const applyFilter = () => {
        let productsCopy = products.slice();

        if (category.length > 0) {
            productsCopy = productsCopy.filter(item => category.includes(item.category));
        }

        if (subCategory.length > 0) {
            productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory));
        }

        switch (sortType) {
            case 'low-high':
                setFilterProducts(productsCopy.sort((a, b) => a.price - b.price));
                break;
            case 'high-low':
                setFilterProducts(productsCopy.sort((a, b) => b.price - a.price));
                break;
            default:
                setFilterProducts(productsCopy);
                break;
        }
    };

    useEffect(() => {
        applyFilter();
    }, [category, subCategory, products, sortType]);

    return (
        <div className="collection-container">
            
            {/* --- LEFT SIDEBAR: FILTERS --- */}
            <div className="filter-section">
                
                {/* Mobile Toggle Button */}
                <p className="filter-title" onClick={() => setShowFilter(!showFilter)}>
                    FILTERS
                    <span className={`mobile-arrow ${showFilter ? 'rotate' : ''}`}>►</span>
                </p>

                {/* Categories Box */}
                <div className={`filter-box ${showFilter ? '' : 'hidden-mobile'}`}>
                    <p className="box-title">CATEGORIES</p>
                    <div className="checkbox-list">
                        <label className="checkbox-label">
                            <input className="checkbox-input" type="checkbox" value="Men" onChange={toggleCategory} /> Men
                        </label>
                        <label className="checkbox-label">
                            <input className="checkbox-input" type="checkbox" value="Women" onChange={toggleCategory} /> Women
                        </label>
                        <label className="checkbox-label">
                            <input className="checkbox-input" type="checkbox" value="Kids" onChange={toggleCategory} /> Kids
                        </label>
                    </div>
                </div>

                {/* Sub-Categories Box */}
                <div className={`filter-box ${showFilter ? '' : 'hidden-mobile'}`}>
                    <p className="box-title">TYPE</p>
                    <div className="checkbox-list">
                        <label className="checkbox-label">
                            <input className="checkbox-input" type="checkbox" value="Topwear" onChange={toggleSubCategory} /> Topwear
                        </label>
                        <label className="checkbox-label">
                            <input className="checkbox-input" type="checkbox" value="Bottomwear" onChange={toggleSubCategory} /> Bottomwear
                        </label>
                        <label className="checkbox-label">
                            <input className="checkbox-input" type="checkbox" value="Winterwear" onChange={toggleSubCategory} /> Winterwear
                        </label>
                    </div>
                </div>
            </div>

            {/* --- RIGHT SIDE: PRODUCT GRID --- */}
            <div className="right-section">
                
                <div className="collection-header">
                    <h2>ALL <span className="text-gray">COLLECTIONS</span></h2>
                </div>

                {/* --- NEW: The Sorting Dropdown --- */}
                <select 
                onChange={(e) => setSortType(e.target.value)} 
                className="sort-dropdown">
                <option value="relevant">Sort by: Relevant</option>
                <option value="low-high">Sort by: Low to High</option>
                <option value="high-low">Sort by: High to Low</option>
                </select>

                {/* The Grid */}
                <div className="collection-grid">
                    {filterProducts.map((item, index) => (
                        <Link to={`/product/${item._id}`} className="collection-product-card" key={index}>
                            <div className="collection-image-container">
                                <img src={item.image[0]} alt={item.name} className="collection-product-image" />
                            </div>
                            <p className="collection-product-name">{item.name}</p>
                            <p className="collection-product-price">${item.price}</p>
                        </Link>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default Collection;