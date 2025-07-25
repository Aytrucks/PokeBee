import { useState } from 'react'
import './App.css'
import BattlePage from './components/BattlePage'
import HomePage from './components/HomePage'

function App() {
  const [type, setType] = useState("home")

  const test_click = () => {
    console.log("Clicked!")
    setType("dex")
  }

  const home_click = () => {
    console.log("Clicked home_click")
    setType("home")
  }
  if(type === "home"){
    return (
        <div>
          <HomePage click={test_click}/>
          
        </div>
      )
  }
  else if(type === "dex"){
    return (
        <>
          <BattlePage click={home_click}/>
          
        </>
      )    
  }
  
}

export default App
