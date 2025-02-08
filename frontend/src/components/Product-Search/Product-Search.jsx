import React, { useState } from 'react';
import './Product-Search.css';

const products = [
  { id: 1, title: 'Refurbished Laptop', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9lE9_0e_RNqR6jcNlwWqNzlp24a5iMSCNrA&s', price: '$200' },
  { id: 2, title: 'Recycled Phone', image: 'https://blog.bikroy.com/en/wp-content/uploads/2014/09/blackberry-10.jpg', price: '$120' },
  { id: 3, title: 'Smartwatch', image: 'https://i.bikroy-st.com/apple-watch-series-5-44mm-original-milanese-loop-for-sale-dhaka/ad8244d4-5108-48c8-94bf-dc8d627ce46f/1200/630/fitted.jpg', price: '$50' },
  { id: 4, title: 'Recycled Tablet', image: 'https://i.bikroy-st.com/old-tablet-sell-for-sale-dhaka/07a620fa-57a4-4741-a5d5-e0dddc8df62f/1200/800/fitted.jpg', price: '$150' },
  { id: 5, title: 'Refurbished Camera', image: 'https://i.bikroy-st.com/washica-dx38mm-lens-for-sale-dhaka/c273b9fb-6646-496d-a6c6-ab6505fbc88a/1200/630/fitted.jpg', price: '$250' },
  { id: 6, title: 'Used Headphones', image: 'https://i.bikroy-st.com/apple-master-copy-earbud-for-sale-khulna/2ae74ee5-7a8c-4f5d-9c8c-971e5bfc1074/1200/800/fitted.jpg', price: '$60' },
  { id: 7, title: 'Recycled Keyboard', image: 'https://i.ebayimg.com/images/g/isUAAOSwJKtik5WI/s-l640.jpg', price: '$40' },
  { id: 8, title: 'Recycled Mouse', image: 'https://5.imimg.com/data5/OV/LP/OU/SELLER-34757003/dell-mouse-old-500x500.jpg', price: '$20' },
];

const ProductSearch = () => {
  const [sortOption, setSortOption] = useState('default');
  const [theme, setTheme] = useState('light');

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const handleThemeChange = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const sortedProducts = [...products].sort((a, b) => {
    if (sortOption === 'price') {
      return parseFloat(a.price.slice(1)) - parseFloat(b.price.slice(1));
    }
    if (sortOption === 'title') {
      return a.title.localeCompare(b.title);
    }
    return 0; // Default sorting
  });

  return (
    <div className={`product-search ${theme}`}>
      <div className="theme-toggle">
        <button onClick={handleThemeChange}>Toggle Theme</button>
      </div>
      <div className="product-container">
        <div className="sorting-bar">
          <h2>Sort by</h2>
          <select onChange={handleSortChange} value={sortOption}>
            <option value="default">Default</option>
            <option value="price">Price</option>
            <option value="title">Title</option>
          </select>
        </div>
        <div className="product-list">
          {sortedProducts.map((product) => (
            <div key={product.id} className="product-item">
              <img src={product.image} alt={product.title} />
              <div className="product-details">
                <h3>{product.title}</h3>
                <p>{product.price}</p>
                <button className="buy-button">Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductSearch;
