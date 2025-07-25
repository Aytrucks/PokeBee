import { useState } from "react"
import { useEffect } from "react"
import Pokemon from '../services/pokedex'

const BattlePage = (props) => {
    
    const [data, setData] = useState(null)
    const [name, setName] = useState("")
    const [guess, setGuess] = useState("What is your guess?")
    const [type1, setType1] = useState("?")
    const [attrib1, setAttrib1] = useState("attrib")
    const [type2, setType2] = useState("?")
    const [attrib2, setAttrib2] = useState("attrib")

    const hook = () => {
        Pokemon.getAll().then(response=>{
            setData(response)
        })
    }
    useEffect(hook, [])

    const handleSetName = (event) => {
        setName(event.target.value)       
    }

    const submitName = (event) => {
        event.preventDefault()
        console.log(`The name of the poke is ${data.name}`)
        console.log(data.types[0].type.name)
        console.log(data.types[1].type.name)
        setGuess(name === "" ? "Nice guess dude." : name);

        if(name.toLowerCase() === "ivysaur"){
            setType1("Grass")
            setAttrib1(`attrib ${data.types[0].type.name}`)
            setType2("Poison")
            setAttrib2(`attrib ${data.types[1].type.name}`)
        } 
        else{
            setType1("?")
            setAttrib1("attrib")
            setType2("?")
            setAttrib2("attrib")
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