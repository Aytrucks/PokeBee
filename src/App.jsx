import { useState } from 'react'
import './App.css'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        Test
      </div>
      <button>
        TEST BUTTON
      </button>
      <div>
        <img className="poke_elec" src="/stuffed_pika.jpg"/>
      </div>
    </>
  )
}

export default App
