import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../../context/ShopContext';
import Item from '../Item/Item';
import './AllProducts.css';

const AllProducts = () => {
  const { all_product } = useContext(ShopContext);
  const [sortField, setSortField] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  useEffect(() => {
    setCurrentPage(1); // Reset page when sorting or category changes
  }, [sortField, sortOrder, selectedCategory]);

  const handleSortChange = (field) => {
    const order = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortOrder(order);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    console.log("Selected Category:", category); // Debug log
  };

  const sortedProducts = [...all_product].sort((a, b) => {
    if (sortField === 'name') {
      return sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
    } else if (sortField === 'new_price') {
      return sortOrder === 'asc' ? a.new_price - b.new_price : b.new_price - a.new_price;
    } else {
      return 0;
    }
  });

  const filteredProducts = selectedCategory === 'all' ? sortedProducts : sortedProducts.filter(item => {
    console.log("Item Category:", item.category.toLowerCase());
    return item.category.toLowerCase() === selectedCategory;
  });

  const displayedProducts = filteredProducts.slice(0, currentPage * productsPerPage);

  const loadMoreProducts = () => {
    setCurrentPage(prevPage => prevPage + 1);
    // Control scroll position after loading more products
    const scrollPosition = window.scrollY;
    window.scrollTo(0, scrollPosition);
  };

  return (
    <div className='all-products'>
      <h1>Всі товари</h1>
      <div className="all-products-sort">
        <span onClick={() => handleSortChange('name')}>
          Сортувати за назвою {sortField === 'name' && (sortOrder === 'asc' ? '(від А до Я)' : '(Від Я до А)')}
        </span>
        <span onClick={() => handleSortChange('new_price')}>
          Сортувати за ціною {sortField === 'new_price' && (sortOrder === 'asc' ? '(від найдешевшого)' : '(від найдорожчого)')}
        </span>
      </div>
      <div className="shopcategory-container">
        <div className="shopcategory-content">
          <div className="shopcategory-indexsort">
            <p>
              <span>Показано {displayedProducts.length}</span> з {filteredProducts.length} товарів
            </p>
          </div>
          <div className="shopcategory-products">
            {displayedProducts.map((item, i) => (
              item && (
                <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
              )
            ))}
          </div>
          {displayedProducts.length < filteredProducts.length && (
            <button className="all-products-loadmore" onClick={loadMoreProducts}>
              Більше товарів
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllProducts;

