import React from 'react';
import './styles.css'

function TextOptions(props) {
    
  return(
    <div className={props.selected ? 'text-options-div selected' : 'text-options-div'}>
        <h1 className='text-options-h1'>{props.name}</h1>
    </div>
  ) ;
}

export default TextOptions;