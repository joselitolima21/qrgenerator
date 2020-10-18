import React from 'react';
import './styles.css'
import TextOptions from '../TextOptions'

function InputOptions() {
  return (
    <div className='input-options'>
      <TextOptions name='URL' selected={true}/>
      <TextOptions name='TEXT' selected={false}/>
      <TextOptions name='PHONE' selected={false}/>
    </div>
  )
}

export default InputOptions;