import { useState } from 'react'
import './App.css'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div id="test_text">
        Test
      </div>
      <button id="test_btn">
        TEST BUTTON
      </button>
      <div className="poke_elec">
        <img src="/stuffed_pika.jpg"/>
      </div>
    </>
  )
}

export default App
