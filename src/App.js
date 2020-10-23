import React from 'react';
import NavBar from './components/NavBar'
import InputOptions from './components/InputOptions'
import GridPrincipal from './components/GridPrincipal'

function App() {

  return (
    <>
     <NavBar/>
      <div className='show-div'>
        <InputOptions/>
        <GridPrincipal/>
      </div>
    </>
  );
}

export default App;

