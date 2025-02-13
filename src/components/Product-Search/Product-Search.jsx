import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Product-Search.css';

const products = [
  { id: 1, title: 'Refurbished Laptop', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9lE9_0e_RNqR6jcNlwWqNzlp24a5iMSCNrA&s', price: 200, category: 'Refurbished' },
  { id: 2, title: 'Recycled Phone', image: 'https://blog.bikroy.com/en/wp-content/uploads/2014/09/blackberry-10.jpg', price: 120, category: 'Recycled' },
  { id: 3, title: 'Smartwatch', image: 'https://i.bikroy-st.com/apple-watch-series-5-44mm-original-milanese-loop-for-sale-dhaka/ad8244d4-5108-48c8-94bf-dc8d627ce46f/1200/630/fitted.jpg', price: 50, category: 'Reused' },
  { id: 4, title: 'Recycled Tablet', image: 'https://i.bikroy-st.com/old-tablet-sell-for-sale-dhaka/07a620fa-57a4-4741-a5d5-e0dddc8df62f/1200/800/fitted.jpg', price: 150, category: 'Recycled' },
  { id: 5, title: 'Refurbished Camera', image: 'https://i.bikroy-st.com/washica-dx38mm-lens-for-sale-dhaka/c273b9fb-6646-496d-a6c6-ab6505fbc88a/1200/630/fitted.jpg', price: 250, category: 'Refurbished' },
  { id: 6, title: 'Used Headphones', image: 'https://i.bikroy-st.com/apple-master-copy-earbud-for-sale-khulna/2ae74ee5-7a8c-4f5d-9c8c-971e5bfc1074/1200/800/fitted.jpg', price: 60, category: 'Reused' },
  { id: 7, title: 'Recycled Keyboard', image: 'https://i.ebayimg.com/images/g/isUAAOSwJKtik5WI/s-l640.jpg', price: 40, category: 'Recycled' },
  { id: 8, title: 'Recycled Mouse', image: 'https://5.imimg.com/data5/OV/LP/OU/SELLER-34757003/dell-mouse-old-500x500.jpg', price: 20, category: 'Recycled' },
];

const ProductSearch = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleCategoryChange = (category) => setSelectedCategory(category);
  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const handleProductClick = (id) => navigate(`/product/${id}`);

  const filteredProducts = products.filter(product => 
    (selectedCategory === 'All' || product.category === selectedCategory) &&
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="product-search">
      <div className="product-container">
        {/* Sidebar */}
        <div className="sidebar">
          <h2>Categories</h2>
          {['All', 'Recycled', 'Refurbished', 'Reused'].map(category => (
            <button key={category} className={selectedCategory === category ? 'active' : ''} onClick={() => handleCategoryChange(category)}>
              {category}
            </button>
          ))}
        </div>

        {/* Main Content */}
        <div className="product-section">
          {/* Search Bar */}
          <div className="search-bar">
            <input 
              type="text" 
              placeholder="Search for products..." 
              value={searchTerm} 
              onChange={handleSearchChange} 
            />
          </div>

          {/* Product Listing */}
          <div className="product-list">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div key={product.id} className="product-item" onClick={() => handleProductClick(product.id)}>
                  <div className="image-container">
                    <span className="badge">{product.category}</span>
                    <img src={product.image} alt={product.title} />
                  </div>
                  <div className="product-details">
                    <h3>{product.title}</h3>
                    <p>${product.price}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-results">No products found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSearch;
