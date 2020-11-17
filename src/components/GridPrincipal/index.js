import React, { useState, useRef, useEffect } from 'react';
import './styles.css'
import logoExample from '../../images/logo-example.png'
import facebook from '../../images/facebook.png'
import instagram from '../../images/instagram.png'
import twiter from '../../images/twiter.png'
import QRCode from 'qrcode'
import { jsPDF } from 'jspdf'


function GridPrincipal() {

  const qrCanvas = useRef(null)
  const img = useRef(null)
  const [color,setColor] = useState('#060505')
  const [inputToQr,setInputToQr] = useState('https://www.seusite.com')
  const [selectLogo,setSelectLog] = useState('no-logo')
  const [pathLogo,setPathLogo] = useState(logoExample)
  const [colorInvalid,setColorInvalid] = useState(false)

  useEffect(()=>{
    const image = img.current
    const canvas = qrCanvas.current
    const tam = canvas.width/4
    const distance = canvas.width/2-tam/2
    if(inputToQr) {
      QRCode.toCanvas(canvas,inputToQr, { 
                                                    errorCorrectionLevel: 'H',
                                                    margin: 2,
                                                    width: 300,
                                                    height: 300,
                                                    color: {
                                                      dark: !colorInvalid ? color : '#060505',
                                                      light: '#ffff'
                                                    }  
                                                  }, 
      (err, canvas) => {
        if (err) throw err      
      })
      if(selectLogo === 'logo'){
        const ctx = canvas.getContext('2d')
        ctx.drawImage(image,0,0,image.width,image.height,distance,distance,tam,tam)      
      }
  }

  },[color,inputToQr,pathLogo,selectLogo,colorInvalid])

  // Atualiza o texto
  function handleSetInputQr(event) {
    setInputToQr(event.target.value)
  }
  
  // Atualiza a cor
  function changeColor(event) {
    const validateColorHex = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i
    if(validateColorHex.exec(event.target.value)) {
      setColor(event.target.value)
      setColorInvalid(false)
    } else {
      setColor(event.target.value)
      setColorInvalid(true)
    }
  }

  // Adiciona a logo
  function handleLogoUp(event) {
    if (event.target.files[0]) {
      let reader = new FileReader();
      let file = event.target.files[0];

      reader.onloadend = () => {
        setPathLogo(reader.result)
      }

      reader.readAsDataURL(file)
    }
  }

  // Faz o download do qrCode
  function handleDownload(tipo){
      if(tipo === 'png' || tipo === 'jpg'){
        const image = qrCanvas.current.toDataURL(`image/${tipo}`).replace(`image/${tipo}`, "image/octet-stream");
        const a = document.createElement("a");
        a.href = image; 
        a.download = `qrcode.${tipo}`;
        a.click();
      } else if(tipo === 'svg'){
        const image = qrCanvas.current.getContext('2d').getSerializedSvg()
        //(`image/${tipo}`).replace(`image/${tipo}`, "image/octet-stream");
        const a = document.createElement("a");
        a.href = image; 
        a.download = `qrcode.${tipo}`;
        a.click();
      } else if(tipo === 'pdf') {
        const image =  qrCanvas.current.toDataURL("image/jpeg", 1.0);
        const pdf = new jsPDF();
        pdf.addImage(image, 'JPEG', 0, 0);
        pdf.save(`qrcode.${tipo}`);
      }
  }

  return (
    <div className='grid-principal'>
      <div className="left">
        
        <h1>Digite o que quiser!</h1>
        <input 
          type="text"  
          className="name-input" 
          placeholder='https://www.seusite.com' 
          onChange={(event)=>handleSetInputQr(event)}
        />
        
        <h1>Selecione a cor</h1>

        <div className="pick-color">
          <label htmlFor='box' className='label-color' style={{ backgroundColor:color}}/>
          <input type="color" defaultValue={color} onChange={(event)=>changeColor(event)} className="box-color" id='box'/>
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
                              }} 
            src={facebook} alt="logo-example" id='face' className='logosTeste'/>
          <img onClick={()=> {  setPathLogo(twiter)
                              }} 
            src={twiter} alt="logo-example" id='twiter'className='logosTeste'/>
          <img onClick={()=> {  setPathLogo(instagram)
                              }} 
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
              <button className='white-button neg' onClick={()=>handleDownload('png')} >PNG</button>
            </div>
            <div className='buttons-download'>
              <button className='white-button neg' onClick={()=>handleDownload('pdf')} >PDF</button>
              <button className='white-button neg' onClick={()=>handleDownload('jpg')} >JPG</button>
            </div>
        </div>
      </div>
    </div>
  )
}

// <button className='white-button' onClick={()=>handleDownload('svg')} >SVG</button>
export default GridPrincipal;