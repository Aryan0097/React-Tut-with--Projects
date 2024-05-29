import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  
  let [counter,setCounter]=useState(15);

  const addValue=() =>{
    counter=counter+1;
    if(counter>20){
      counter=20;
      return;
    }
    setCounter(counter);
  }

  const removeValue=()=>{
    counter=counter-1;
    if(counter<0){
      counter=0;
      return;
    }
    setCounter(counter);
  }

  return (
    <>
    <h1>Welcome to Counter Project</h1>
    <br />
    <h2>Counter Valur = {counter}</h2>

    <button onClick={addValue}>Add Value</button>
    <br/>
    <button onClick={removeValue}>Remove value</button>
    </>
  )
}

export default App
