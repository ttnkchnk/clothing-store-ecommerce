import React from 'react'
import './Breadcrum.css'
import arrow_icon from '../assets/side_arrow.png'

const Breadcrum = (props) => {
  const {product} = props;
  return (
    <div className='breadcrum'>
      Головна <img src={arrow_icon} alt="" /> Магазин <img src={arrow_icon} alt="" /> {product.category} <img src={arrow_icon} alt="" /> {product.name}
    </div>
  )
}

export default Breadcrum
