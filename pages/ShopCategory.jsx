import React, { useContext, useState, useEffect } from 'react';
import './CSS/Shopcategory.css';
import { ShopContext } from '../context/ShopContext';
import Item from '../Components/Item/Item';

const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext);
  const [sortField, setSortField] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  useEffect(() => {
    setCurrentPage(1); // Reset page when category or sorting changes
  }, [props.category, sortField, sortOrder]);

  const handleSortChange = (field) => {
    const order = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortOrder(order);
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

  const filteredProducts = sortedProducts.filter(item => item.category === props.category);

  const displayedProducts = filteredProducts.slice(0, currentPage * productsPerPage);

  const loadMoreProducts = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  return (
    <div className='shop-category'>
      <img className='shopcategory-banner' src={props.banner} alt="" />
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
              <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
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

export default ShopCategory;



