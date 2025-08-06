import { useState } from 'react'
import './App.css'
import BattlePage from './components/BattlePage'
import HomePage from './components/HomePage'
import { AnimatePresence } from 'framer-motion'

function App() {
  const [type, setType] = useState("home")

  const goToDex = () => {
    console.log("Clicked!")
    setType("dex")
  }

  const goToHome = () => {
    console.log("Clicked home_click")
    setType("home")
  }
  
  return(
    <AnimatePresence mode='wait'>
    {type === "home" ?(
      
          <HomePage key="home" click={goToDex}/>
          
        
    ):null}
    {type === "dex" ? (
      
          <BattlePage key="battle" click={goToHome}/>
          
        
    ):null}
    </AnimatePresence>
  )
  
}

export default App
