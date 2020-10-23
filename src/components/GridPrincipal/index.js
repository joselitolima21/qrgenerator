import React, { useState, useRef, useEffect } from 'react';
import './styles.css'
import logoExample from '../../images/logo-example.png'
import facebook from '../../images/facebook.png'
import instagram from '../../images/instagram.png'
import twitch from '../../images/twitch.png'
import twiter from '../../images/twiter.png'
import QRCode from 'qrcode'


function GridPrincipal() {

  // Qr 
  const qrCanvas = useRef(null)
  const img = useRef(null)
  
  const options = { 
    errorCorrectionLevel: 'H',
    margin: 2,
    width: 300,
    height: 300,
    color: {
      dark:'#000000',
      light: '#ffff'
    }  
  }

  const [color,setColor] = useState('#060505')
  const [inputToQr,setInputToQr] = useState('https://www.seusite.com')
  const [selectLogo,setSelectLog] = useState('no-logo')
  const [pathLogo,setPathLogo] = useState(logoExample)

  useEffect(()=>{
    const image = img.current
    const canvas = qrCanvas.current
    const tam = canvas.width/4.5
    const distance = canvas.width/2-tam/2
    QRCode.toCanvas(qrCanvas.current,'https://www.seusite.com', options, (err, canvas) => {
      if (err) throw err      
    })
    const ctx = canvas.getContext('2d')
    ctx.drawImage(image,0,0,image.width,image.height,distance,distance,tam,tam)

  },[]) // eslint-disable-line

  function updateQr(text) {
    const image = img.current
    const canvas = qrCanvas.current
    const tam = canvas.width/4.5
    const distance = canvas.width/2-tam/2
    if(text) {
      QRCode.toCanvas(canvas,text, options, (err, canvas) => {
        if (err) throw err
        const ctx = canvas.getContext('2d')
        ctx.drawImage(image,0,0,image.width,image.height,distance,distance,tam,tam)      
      })
    }
      
  }
  // Qr 

  function handleSetInputQr(event) {
    setInputToQr(event.target.value)
    updateQr(event.target.value)
  }

  function changeColor(event) {
    setColor(event.target.value)
  }

  function handleLogoUp(event) {
    if (event.target.files[0]) {
      let reader = new FileReader();
      let file = event.target.files[0];

      reader.onloadend = () => {
        setPathLogo(reader.result)
        updateQr(inputToQr)
      }

      reader.readAsDataURL(file)
    }
  }

  return (
    <div className='grid-principal'>
      <div className="left">
        
        <h1>Digite seu url</h1>
        <input 
          type="text"  
          className="name-input" 
          placeholder='https://www.seusite.com' 
          onChange={(event)=>handleSetInputQr(event)}
        />
        
        <h1>Selecione a cor</h1>

        <div className="pick-color">
          <label htmlFor='box' className='label-color' style={{ backgroundColor:color}}/>
          <input type="color" value={color} onChange={(event)=>changeColor(event)} className="box-color" id='box'/>
          <input type="text" className="text-color" onChange={(event)=>changeColor(event)} value={color}/>
        </div>

        <div className='option' onChange={(event)=>setSelectLog(event.target.value)}>
          <div className='line-option'>
            <input readOnly checked={selectLogo === 'no-logo'} type="radio" value='no-logo' className="select" name='logo-select' id="logos-false"/>
            <label htmlFor="logos-false">Não adicionar Logo ao QR</label>
          </div>

          <div className='line-option' >
            <input readOnly checked={selectLogo === 'logo'} type="radio" value='logo' className="select" name='logo-select' id="logos-true"/>
            <label htmlFor="logos-true">Adicionar Logo ao QR</label>
          </div>
        </div>



        <div className='logo-input'>
          <img src={pathLogo} width='80' heigth='80' alt="logo-example"/>
          <label className='blue-button'>
            Upload
          <input
            className='input-upload'
            type="file"
            accept='image/jpg,image/png,image/jpeg'
            onChange={(event) => handleLogoUp(event)}
          />
          </label>
        </div>

        <div className="logo-examples">
          <img onClick={()=> {  setPathLogo(facebook)
                                img.current.src = facebook;
                                updateQr(inputToQr)}} 
            src={facebook} alt="logo-example" id='face' className='logosTeste'/>
          <img onClick={()=> {  setPathLogo(twiter)
                                img.current.src = twiter;
                                updateQr(inputToQr)}} 
            src={twiter} alt="logo-example" id='twiter'className='logosTeste'/>
          <img onClick={()=> {  setPathLogo(twitch) 
                                img.current.src = twitch;
                                updateQr(inputToQr)}} 
            src={twitch} alt="logo-example" id='twitch' className='logosTeste'/>
          <img onClick={()=> {  setPathLogo(instagram) 
                                img.current.src = instagram;
                                updateQr(inputToQr)}} 
            src={instagram} alt="logo-example" id='insta' className='logosTeste'/>
        </div>
 
      </div>
      <div className='right'>
        <div className='qrcode' >
          <canvas id='qrCanvas' ref={qrCanvas}/>
          <img src={pathLogo} alt='' ref={img} style={{display: 'none'}}/>
        </div>
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