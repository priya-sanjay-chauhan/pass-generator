import { useCallback, useEffect, useRef, useState } from 'react';
import './App.css'

function App() {

  const [length,setLength]=useState(8);
  const [numberAllow,setNumberAllow]=useState(false)
  const [charAllow,setCharAllow]=useState(false)
  const [password,setPassword]=useState("")


  const passwordRef=useRef(null)

  const passwordGenerator=useCallback(()=>{
     let pass=""
     let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
     if(numberAllow){
      str+="0123456789"
     }
     if(charAllow){
      str+="!@#$%^&*()_{}[],~`"
     }

     for(let i=1;i<=length;i++){
      let char=Math.floor(Math.random()*str.length)+1;
      pass+=str.charAt(char);
     }

     setPassword(pass)

  },[length,numberAllow,charAllow,setPassword])


const copyVal=useCallback((e)=>{
  passwordRef.current?.select();  // to select text
  window.navigator.clipboard.writeText(password)  // to paste on window
 },[password])

useEffect(()=>{
  passwordGenerator()
},[length,numberAllow,charAllow,passwordGenerator])

  return (
    <div className="main">
      <h2>Password Generator </h2>
      <div className='inputVal'>

        <input type='text' className='inputGen' value={password}  readOnly ref={passwordRef}></input>
        <button className='copy' onClick={copyVal}>Copy</button>
      </div>
      <div className='value'>
        <div className='type'>

          <input type='range' min={6} max={50} value={length} onChange={(e)=>{setLength(e.target.value)}}/>
          <label>Length: {length}</label>
        </div>

        <div className='type' >

          <input type='checkbox' value={numberAllow} onChange={()=>{setNumberAllow(prev=> !prev)}}/>
          <label>Numbers</label>
        </div>
        <div className='type'>

          <input type='checkbox' value={charAllow} onChange={()=>{setCharAllow(prev=> !prev)}}/>
          <label>Characters</label>
        </div>
      </div>
    </div>
  );
}

export default App;
