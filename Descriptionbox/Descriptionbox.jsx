import React from 'react'
import './Descriptionbox.css'

const Descriptionbox = () => {
  return (
    <div className='description-box'>
      <div className="descroption-box-navigator">
        <div className="description-box-navbox">
          Опис
        </div>
        <div className="description-box-navbox fade">
          Відгуки (0)
        </div>
      </div>
      <div className="description-box-description">
        <p>Тканина: 100% бавовна.</p>
        <p>Країна виробництва: Україна.</p>

      </div>
    </div>
  )
}

export default Descriptionbox
