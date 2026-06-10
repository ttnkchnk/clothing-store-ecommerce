import React from 'react'
import './Offers.css'
import exclusive_image from '../assets/exclusive_image.png'

const Offers = () => {
  return (
    <div className='offers'>
      <div className="offers-left">
        <h1>Ексклюзивні</h1>
        <h1>пропозиції для тебе</h1>
        <p>ТІЛЬКИ НА БЕСТСЕЛЛЕРИ</p>

      </div>
      <div className="offers-right">
        <img src={exclusive_image} alt="" />
      </div>
    </div>
  )
}

export default Offers
