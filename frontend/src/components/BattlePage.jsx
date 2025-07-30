import { useState } from "react"
import { useEffect } from "react"
import Pokedex from '../services/pokedex'
import Pokemon from "../models/Pokemon"
import { generation1PokemonNames } from '../services/pokemonNames'

const gen1 = generation1PokemonNames

const FilterSuggestion = (props) => {
    const list = props.list
    return <div>

    </div>
}

const BattlePage = (props) => {
    //TODO: Make a object state that holds all the values of the answer poke and the guess poke
    
    const [data, setData] = useState(null)
    const [poke, setPoke] = useState({})
    const [guessPoke, setGuessPoke] = useState({})
    const [guessClass, setGuessClass] = useState("test_text")
    const [name, setName] = useState("")
    const [guess, setGuess] = useState("What is your guess?")
    const [img, setImg] = useState("../src/assets/react.svg")

    const [type1, setType1] = useState("?")
    const [attrib1, setAttrib1] = useState("attrib")
    const [ability1, setAbility1] = useState("?")

    const [type2, setType2] = useState("?")
    const [attrib2, setAttrib2] = useState("attrib")
    const [ability2, setAbility2] = useState("?")

    
    useEffect(() => {
        async function hook(){
        try{
            const res = await Pokedex.getAll()
            
            setData(res)
            setPoke({
            name:res.name,
            type1: res.types[0].type.name,
            type2: res.types[1]?.type.name ||"none",
            ability1:res.abilities[0].ability.name,
            ability2:res.abilities[1]?.ability.name || "none"
        })
            console.log("res", res)
            console.log(gen1)
        }
        catch(error){
            console.error("We couldn't get the poke")
        }
        }
        hook()
        
        
    }, [])

    const handleSetName = (event) => {
        setName(event.target.value)       
    }

    const submitName = (event) => {
        event.preventDefault()
        console.log(`The name of the poke is ${poke.name}`)
        
        


        setGuess(name === "" ? "Nice guess dude." : name);

        if(name.toLowerCase() === poke.name){
            setImg("../src/assets/bulbapedia_ivysaur.png")
            setGuessClass("test_text correct")

            setType1("Grass")
            setAttrib1(`attrib ${poke.type1}`)
            setAbility1(data.abilities[0].ability.name)

            setType2("Poison")
            setAttrib2(`attrib ${poke.type2}`)
            setAbility2(data.abilities[1].ability.name)
        } 
        else if(name.toLowerCase() === "bulbasaur"){
                    
            setImg("../src/assets/react.svg")
            setGuessClass("test_text")
            
            setType1("Grass")
            setAttrib1(`attrib ${data.types[0].type.name}`)
            setAbility1(data.abilities[0].ability.name)

            setType2("Poison")
            setAttrib2(`attrib ${data.types[1].type.name}`)
            setAbility2(data.abilities[1].ability.name)
        }
        else{
            setImg("../src/assets/react.svg")
            setGuessClass("test_text")

            setType1("?")
            setAttrib1("attrib")
            setAbility1("?")

            setType2("?")
            setAttrib2("attrib")
            setAbility2("?")
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
            <div className={guessClass} id="guess_text">
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