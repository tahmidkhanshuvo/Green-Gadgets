import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Product-Search.css';

// Combined products array with additional products (30 products in total)
const products = [
  { id: 1, title: 'Refurbished Laptop', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9lE9_0e_RNqR6jcNlwWqNzlp24a5iMSCNrA&s', price: 200, category: 'Refurbished', location: 'Dhaka' },
  { id: 2, title: 'Recycled Phone', image: 'https://blog.bikroy.com/en/wp-content/uploads/2014/09/blackberry-10.jpg', price: 120, category: 'Recycled', location: 'Chittagong' },
  { id: 3, title: 'Smartwatch', image: 'https://i.bikroy-st.com/apple-watch-series-5-44mm-original-milanese-loop-for-sale-dhaka/ad8244d4-5108-48c8-94bf-dc8d627ce46f/1200/630/fitted.jpg', price: 50, category: 'Reused', location: 'Dhaka' },
  { id: 4, title: 'Recycled Tablet', image: 'https://i.bikroy-st.com/old-tablet-sell-for-sale-dhaka/07a620fa-57a4-4741-a5d5-e0dddc8df62f/1200/800/fitted.jpg', price: 150, category: 'Recycled', location: 'Sylhet' },
  { id: 5, title: 'Refurbished Camera', image: 'https://i.bikroy-st.com/washica-dx38mm-lens-for-sale-dhaka/c273b9fb-6646-496d-a6c6-ab6505fbc88a/1200/630/fitted.jpg', price: 250, category: 'Refurbished', location: 'Chittagong' },
  { id: 6, title: 'Used Headphones', image: 'https://i.bikroy-st.com/apple-master-copy-earbud-for-sale-khulna/2ae74ee5-7a8c-4f5d-9c8c-971e5bfc1074/1200/800/fitted.jpg', price: 60, category: 'Reused', location: 'Khulna' },
  { id: 7, title: 'Recycled Keyboard', image: 'https://i.ebayimg.com/images/g/isUAAOSwJKtik5WI/s-l640.jpg', price: 40, category: 'Recycled', location: 'Rajshahi' },
  { id: 8, title: 'Recycled Mouse', image: 'https://5.imimg.com/data5/OV/LP/OU/SELLER-34757003/dell-mouse-old-500x500.jpg', price: 20, category: 'Recycled', location: 'Barishal' },
  { id: 9, title: 'Used Monitor', image: 'https://i.bikroy-st.com/used-monitor-for-sale-dhaka/07a620fa-57a4-4741-a5d5-e0dddc8df62f/1200/800/fitted.jpg', price: 100, category: 'Reused', location: 'Comilla' },
  { id: 10, title: 'Used TV', image: 'https://image.shutterstock.com/image-photo/old-television-screen-260nw-1603017281.jpg', price: 100, category: 'Reused', location: 'Dhaka' },
  { id: 11, title: 'Recycled Speakers', image: 'https://image.shutterstock.com/image-photo/recycled-speakers-260nw-1852081184.jpg', price: 80, category: 'Recycled', location: 'Sylhet' },
  { id: 12, title: 'Refurbished Air Conditioner', image: 'https://image.shutterstock.com/image-photo/refurbished-air-conditioner-260nw-1027010306.jpg', price: 250, category: 'Refurbished', location: 'Chittagong' },
  { id: 13, title: 'Reused Fridge', image: 'https://image.shutterstock.com/image-photo/used-fridge-sale-260nw-1829276586.jpg', price: 150, category: 'Reused', location: 'Rajshahi' },
  { id: 14, title: 'Smartphone', image: 'https://image.shutterstock.com/image-photo/smartphone-sale-260nw-1010912985.jpg', price: 200, category: 'Recycled', location: 'Khulna' },
  { id: 15, title: 'Used Washing Machine', image: 'https://image.shutterstock.com/image-photo/used-washing-machine-sale-260nw-1090902330.jpg', price: 120, category: 'Reused', location: 'Barishal' },
  { id: 16, title: 'Refurbished Microwave', image: 'https://image.shutterstock.com/image-photo/refurbished-microwave-260nw-1337174922.jpg', price: 180, category: 'Refurbished', location: 'Comilla' },
  { id: 17, title: 'Recycled Lamp', image: 'https://image.shutterstock.com/image-photo/recycled-lamp-260nw-1084961118.jpg', price: 60, category: 'Recycled', location: 'Chittagong' },
  { id: 18, title: 'Used Sofa', image: 'https://image.shutterstock.com/image-photo/used-sofa-sale-260nw-1024992372.jpg', price: 130, category: 'Reused', location: 'Dhaka' },
  { id: 19, title: 'Recycled Speaker', image: 'https://image.shutterstock.com/image-photo/recycled-speaker-260nw-1195945271.jpg', price: 45, category: 'Recycled', location: 'Sylhet' },
  { id: 20, title: 'Used Refrigerator', image: 'https://image.shutterstock.com/image-photo/used-refrigerator-for-sale-260nw-1043223477.jpg', price: 300, category: 'Reused', location: 'Chittagong' },
  { id: 21, title: 'Refurbished Washing Machine', image: 'https://image.shutterstock.com/image-photo/refurbished-washing-machine-260nw-1090955367.jpg', price: 250, category: 'Refurbished', location: 'Rajshahi' },
  { id: 22, title: 'Used Air Conditioner', image: 'https://image.shutterstock.com/image-photo/used-air-conditioner-for-sale-260nw-1319433186.jpg', price: 220, category: 'Reused', location: 'Khulna' },
  { id: 23, title: 'Recycled Microwave', image: 'https://image.shutterstock.com/image-photo/recycled-microwave-260nw-1252452854.jpg', price: 140, category: 'Recycled', location: 'Comilla' },
  { id: 24, title: 'Used Table', image: 'https://image.shutterstock.com/image-photo/used-table-for-sale-260nw-1092848990.jpg', price: 60, category: 'Reused', location: 'Dhaka' },
  { id: 25, title: 'Refurbished Coffee Maker', image: 'https://image.shutterstock.com/image-photo/refurbished-coffee-maker-260nw-1342501042.jpg', price: 90, category: 'Refurbished', location: 'Barishal' },
  { id: 26, title: 'Recycled Desk', image: 'https://image.shutterstock.com/image-photo/recycled-desk-260nw-1255612375.jpg', price: 150, category: 'Recycled', location: 'Rajshahi' },
  { id: 27, title: 'Used Washing Machine', image: 'https://image.shutterstock.com/image-photo/used-washing-machine-260nw-1202151177.jpg', price: 180, category: 'Reused', location: 'Khulna' },
  { id: 28, title: 'Refurbished Fridge', image: 'https://image.shutterstock.com/image-photo/refurbished-fridge-260nw-1365280001.jpg', price: 350, category: 'Refurbished', location: 'Comilla' },
  { id: 29, title: 'Used TV Stand', image: 'https://image.shutterstock.com/image-photo/used-tv-stand-260nw-1372157738.jpg', price: 80, category: 'Reused', location: 'Dhaka' },
  { id: 30, title: 'Recycled Lighting', image: 'https://image.shutterstock.com/image-photo/recycled-lighting-260nw-1108479210.jpg', price: 60, category: 'Recycled', location: 'Sylhet' }
];

const ProductSearch = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAllLocations, setShowAllLocations] = useState(false);
  const [displayLimit, setDisplayLimit] = useState(20);
  const [sortOption, setSortOption] = useState('default');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = displayLimit;

  const navigate = useNavigate();

  const handleCategoryChange = (category) => setSelectedCategory(category);
  const handleLocationChange = (location) => setSelectedLocation(location);
  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const handleDisplayLimitChange = (limit) => {
    setDisplayLimit(limit);
    setCurrentPage(1); // Reset to page 1 when the display limit is changed
  };
  const handleSortChange = (option) => setSortOption(option);
  const toggleShowLocations = () => setShowAllLocations(!showAllLocations);

  const uniqueLocations = [...new Set(products.map(product => product.location))];
  const displayedLocations = showAllLocations ? uniqueLocations : uniqueLocations.slice(0, 5);

  let filteredProducts = products
    .filter(product =>
      (selectedCategory === 'All' || product.category === selectedCategory) &&
      (selectedLocation === 'All' || product.location === selectedLocation) &&
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

  if (sortOption === 'lowToHigh') {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortOption === 'highToLow') {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const currentProducts = filteredProducts.slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage);

  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <div className="product-search">
      <div className="product-container">
        <div className="sidebar">
          <h2>Categories</h2>
          {['All', 'Recycled', 'Refurbished', 'Reused'].map(category => (
            <button key={category} className={selectedCategory === category ? 'active' : ''} onClick={() => handleCategoryChange(category)}>
              {category}
            </button>
          ))}

          <h2>Location ({uniqueLocations.length})</h2>
          {['All', ...displayedLocations].map(location => (
            <button key={location} className={selectedLocation === location ? 'active' : ''} onClick={() => handleLocationChange(location)}>
              {location}
            </button>
          ))}
          {uniqueLocations.length > 5 && (
            <button className="show-more" onClick={toggleShowLocations}>
              {showAllLocations ? 'Show Less' : 'Show More'}
            </button>
          )}
        </div>

        <div className="product-section">
          <div className="search-filter-container">
            <div className="search-bar">
              <input 
                type="text" 
                placeholder="Search for products..." 
                value={searchTerm} 
                onChange={handleSearchChange} 
              />
            </div>

            <div className="filter-section">
              <label>Show: </label>
              <select onChange={(e) => handleDisplayLimitChange(Number(e.target.value))}>
                {[20, 24, 48, 75, 90].map(limit => (
                  <option key={limit} value={limit}>{limit}</option>
                ))}
              </select>

              <select onChange={(e) => handleSortChange(e.target.value)}>
                <option value="default">Default</option>
                <option value="lowToHigh">Low to High</option>
                <option value="highToLow">High to Low</option>
              </select>
            </div>
          </div>

          <div className="product-list">
            {currentProducts.map((product) => (
              <div key={product.id} className="product-item">
                <div className="image-container">
                  <span className="badge">{product.category}</span>
                  <img src={product.image} alt={product.title} />
                </div>
                <div className="product-details">
                  <h3>{product.title}</h3>
                  <p>${product.price}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination at the Bottom */}
          <div className="pagination">
            <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>PREV</button>
            {[...Array(totalPages)].map((_, index) => (
              <button key={index + 1} className={currentPage === index + 1 ? 'active' : ''} onClick={() => handlePageChange(index + 1)}>
                {index + 1}
              </button>
            ))}
            <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>NEXT</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSearch;
