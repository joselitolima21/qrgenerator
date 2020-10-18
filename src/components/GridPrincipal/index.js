import React, { useState } from 'react';
import './styles.css'
import logoExample from '../../images/logo-example.png'
import facebook from '../../images/facebook.png'
import instagram from '../../images/instagram.png'
import twitch from '../../images/twitch.png'
import twiter from '../../images/twiter.png'
import temp from '../../images/temp.png'

function GridPrincipal() {

  const [color,setColor] = useState('#060505')

  function changeColor(event) {
    setColor(event.target.value)
  }
  return (
    <div className='grid-principal'>
      <div className="left">
        
        <h1>Digite seu url</h1>
        <input type="text"  className="name-input" name="" id=""/>
        
        <h1>Selecione a cor</h1>

        <div className="pick-color">
          <label htmlFor='box' className='label-color' style={{ backgroundColor:color}}/>
          <input type="color" value={color} onChange={(event)=>changeColor(event)} className="box-color" id='box'/>
          <input type="text" className="text-color" value={color}/>
        </div>

        <div className='option'>
          <div className='line-option'>
            <input type="radio" className="select" id="logos-false"/>
            <label for="logos-false">Não adicionar Logo ao QR</label>
          </div>

          <div className='line-option' >
            <input type="radio" className="select" id="logos-true"/>
            <label for="logos-true">Adicionar Logo ao QR</label>
          </div>
        </div>



        <div className='logo-input'>
          <img src={logoExample} alt="logo-example"/>
          <button className='blue-button'>Upload</button>
        </div>

        <div className="logo-examples">
          <img src={facebook} alt="logo-example" className='logosTeste'/>
          <img src={twiter} alt="logo-example" className='logosTeste'/>
          <img src={twitch} alt="logo-example" className='logosTeste'/>
          <img src={instagram} alt="logo-example" className='logosTeste'/>
        </div>

      </div>
      <div className='right'>
        <img src={temp} alt="temp" className='qrcode'/>
        <div className='download-section'>
            <h1>DOWNLOAD</h1>
            <div className='buttons-download'>
              <button className='white-button'>PNG</button>
              <button className='white-button'>SVG</button>
            </div>
            <div className='buttons-download'>
              <button className='white-button'>PDF</button>
              <button className='white-button'>JPG</button>
            </div>
        </div>
      </div>
    </div>
  )
}

export default GridPrincipal;