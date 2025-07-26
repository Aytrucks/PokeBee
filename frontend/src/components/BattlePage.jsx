import { useState } from "react"
import { useEffect } from "react"
import Pokemon from '../services/pokedex'

const BattlePage = (props) => {
    
    const [data, setData] = useState(null)
    const [name, setName] = useState("")
    const [guess, setGuess] = useState("What is your guess?")
    const [img, setImg] = useState("../src/assets/react.svg")

    const [type1, setType1] = useState("?")
    const [attrib1, setAttrib1] = useState("attrib")
    const [ability1, setAbility1] = useState("?")

    const [type2, setType2] = useState("?")
    const [attrib2, setAttrib2] = useState("attrib")
    const [ability2, setAbility2] = useState("?")

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
        console.log(data)
        console.log(data.abilities[0].ability.name)
        setGuess(name === "" ? "Nice guess dude." : name);

        if(name.toLowerCase() === "ivysaur"){
            setImg("../src/assets/bulbapedia_ivysaur.png")

            setType1("Grass")
            setAttrib1(`attrib ${data.types[0].type.name}`)
            setAbility1(data.abilities[0].ability.name)

            setType2("Poison")
            setAttrib2(`attrib ${data.types[1].type.name}`)
            setAbility2(data.abilities[1].ability.name)
        } 
        else{
            setImg("../src/assets/react.svg")
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
        <img src= {img} id="pika"/>
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
                {ability1}
            </div>
            <div className="attrib">
                {ability2}
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