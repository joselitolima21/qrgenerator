import React, {useRef,useEffect} from 'react';
import NavBar from './components/NavBar'
import QRCode from 'qrcode'
import image from './images/logo-example.png'

function App() {

  const qrDiv = useRef(null)
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
  
  useEffect(()=>{
    
    QRCode.toCanvas(qrDiv.current,'Exemplo', options, (err, canvas) => {
      if (err) throw err
    })

  },[]) // eslint-disable-line

  function updateQr(event) { 
      const text = event.target.value
      const canvas = qrDiv.current
      const image = img.current
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

  return (
    <>
     <NavBar/>
     <input type="text" onChange={(event)=>updateQr(event)}/>
     <canvas id='qrdiv' ref={qrDiv}/>
     <img src={image} alt='' ref={img} style={{display: 'none'}}/>
    </>
  );
}

export default App;
