import React from 'react';
import './styles.css'
import drop from '../../images/drop-down.svg'

function NavBar() {
  return (
    <div className='nav-bar'>
      <h1>QR Code Generator</h1>
      <button className='white-button'>
        <h2>English</h2>
        <img src={drop} alt="drop-down"/>
      </button>
    </div>
  )
}

export default NavBar;