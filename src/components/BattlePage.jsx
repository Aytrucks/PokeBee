import { useState } from "react"

const BattlePage = (props) => {
    
    const [name, setName] = useState("")

    const handleSetName = (event) => {
        setName(event.target.value)
    }

    const submitName = (event) => {
        event.preventDefault()
        console.log(name)
    }

    return (
    <>
        <div>
            <div id="test_text">
            Dex
        </div>
        <button id="test_btn" onClick={props.click}>
            Back to Home
        </button>
        </div>
      
      <div className="pokebox">
        <img src="../src/assets/bulbapedia_ivysaur.png" id="pika"/>
      </div>
      <div>
        
        <div className="container_poke">
            <div className="attrib">
                Type1
            </div>
            <div className="attrib">
                Type2
            </div>
        </div>
        <div className="container_poke">
            <div className="attrib">
                Ability 1
            </div>
            <div className="attrib">
                Ability 2
            </div>
        </div>
        <form onSubmit={submitName} className="test_input">
            <input id="textbox" value={name} onChange={handleSetName}/>
        </form>
      </div>
      
    </>
  )

}

export default BattlePage