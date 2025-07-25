import { useState } from "react"

const BattlePage = (props) => {
    
    const [name, setName] = useState("")
    const [guess, setGuess] = useState("What is your guess?")
    const [type1, setType1] = useState("?")
    const [attrib1, setAttrib1] = useState("attrib")
    const [type2, setType2] = useState("?")
    const [attrib2, setAttrib2] = useState("attrib")

    const handleSetName = (event) => {
        setName(event.target.value)       
    }

    const submitName = (event) => {
        event.preventDefault()
        console.log(name)
        if(name === ""){
            setGuess("Nice guess dude.")
        }
        else{
            setGuess(name)
        }
        if(name === "Ivysaur"){
            setType1("Grass")
            setAttrib1("attrib grass")
            setType2("Poison")
            setAttrib2("attrib poison")
        }  
    }

    return (
    <>
        <div id="battle_header">
            <div className="test_text">
            Dex
            </div>
            <button id="test_btn" onClick={props.click}>
                Back to Home
            </button>
            <div className="test_text" id="guess_text">
                {guess}
            </div>
            
        </div>
      
      <div className="pokebox">
        <img src="../src/assets/bulbapedia_ivysaur.png" id="pika"/>
      </div>
      <div>
        
        <div className="container_poke">
            <div className={attrib1}>
                {type1}
            </div>
            <div className={attrib2}>
                {type2}
            </div>
        </div>
        <div className="container_poke">
            <div className="attrib">
                Ability1
            </div>
            <div className="attrib">
                Ability 2
            </div>
        </div>
        <form onSubmit={submitName} className="test_input">
            <input id="textbox" value={name} onChange={handleSetName}/>
            <button id="guess_submit" type="submit">Enter</button>
        </form>
      </div>
      
    </>
  )

}

export default BattlePage