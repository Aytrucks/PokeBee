import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div id="test_text">
        TEST
      </div>
      <button id="test_btn">
        TEST BUTTON
      </button>
      <div className="poke">
        <img src="/stuffed_pika.jpg"/>
      </div>
      <div class="test_input">
        <input class="box"/>
      </div>
    </>
  )
}

export default App
