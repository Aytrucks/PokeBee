import { useState } from "react"
import { useEffect } from "react"
import { motion } from "framer-motion"
import Pokedex from '../services/pokedex'
import Pokemon from "../models/Pokemon"
import { generation1PokemonNames } from '../services/pokemonNames'
import question_mark from '../assets/question.png'

const gen1 = generation1PokemonNames

//Generates the suggest list of pokes based on typed input
const FilterSuggestion = (props) => {
    const [show, setShow] = useState(false)
    const list = props.list

    useEffect(()=>{
        const timer = setTimeout(()=>{
            setShow(true)
        }, 1000)
        return () =>{
            clearTimeout(timer)
            setShow(false)
        }
    },[list])

    if(list.length === 0 && show){
        return <div>
            No Suggestions Yet!
        </div>
    }
    if(list.length <= 10 && show){
        return <ul>
        {
            list.map(item => 
                <li key={item}>{item}</li>
            )
        }
    </ul>
    }
    
}

//contains all logic about rendering poke img, types abilites, how input works, etc
const BattlePage = (props) => {
    //TODO: Make a object state that holds all the values of the answer poke and the guess poke
    
    const [data, setData] = useState(null)
    const [poke, setPoke] = useState({})

    const [guessClass, setGuessClass] = useState("test_text")
    const [textboxClass, setTextboxClass] = useState("")

    const [name, setName] = useState("")
    const [guess, setGuess] = useState("What is your guess?")
    const [img, setImg] = useState(question_mark)

    const [possibleNames, setPossibleNames] = useState([])

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
            const mainPoke = new Pokemon(res)
            setPoke(mainPoke)
        }
        catch(error){
            console.error("We couldn't get the poke")
        }
        }
        hook()
    }, [])

    const handleSetName = (event) => {       
        const inputName = event.target.value
        setName(inputName)    
        setPossibleNames(generation1PokemonNames.filter(pokename=>pokename.toLowerCase().includes(inputName.toLowerCase())))
    }

    const submitName = async (event) => {
        event.preventDefault()
        //console.log(`The name of the poke is ${poke.name}`)
        setTextboxClass("feedback");
        setTimeout(() => setTextboxClass(""), 1000);
        
        if(name.toLowerCase() === poke.name){
            setImg(poke.img)
            setGuess(`${poke.name}`)
            setGuessClass("test_text correct")

            setType1(`${poke.type1}`)
            setAttrib1(`attrib ${poke.type1}`)
            setAbility1(poke.ability1)

            setType2(`${poke.type2}`)
            setAttrib2(`attrib ${poke.type2}`)
            setAbility2(poke.ability2)
        } 
        else{
            let names = generation1PokemonNames.map(pokename =>{
                return pokename.toLowerCase()
            })
            if(names.includes(name.toLowerCase())){
                try{
                    const res = await Pokedex.sendPoke({
                        name:`${name}`
                    })
                    const guessPoke = new Pokemon(res)
                    //console.log(guessPoke)
                    //console.log(poke)
                    if(poke.type1 === guessPoke.type1 || poke.type1 === guessPoke.type2){
                        setType1(`${poke.type1}`)
                        setAttrib1(`attrib ${poke.type1}`)
                    }
                    if(poke.type2 === guessPoke.type1 || poke.type2 === guessPoke.type2){
                        setType2(`${poke.type2}`)
                        setAttrib2(`attrib ${poke.type2}`)
                    }
                    if(poke.ability1 === guessPoke.ability1 || poke.ability1 === guessPoke.ability2){
                        setAbility1(poke.ability1)
                    }
                    if(poke.ability2 === guessPoke.ability1 || poke.ability2 === guessPoke.ability2){
                        setAbility2(poke.ability2)
                    }
                    
                }
                catch(error){
                    console.error(error)
                }
                
            }
            else{
                setGuess(name === "" ? "Nice guess dude." : "Not a Pokemon");
            }
            
            
        }
    }

    return (
    <motion.div
    initial={{ opacity: 0 }} // Start invisible
      animate={{ opacity: 1 }} // Fade in
      exit={{ x: "50vw", opacity: 0 }} // Slide out to the left and fade
      transition={{ duration: 0.25 }} // Set animation speed
    >
        <div id="battle_header">
            <motion.div 
            className="test_text"
            whileHover={{ scale: 1.1 }}
            animate={{ 
                rotate: 360, 
                transition: { duration: 0.25 } 
                }}>
            Dex
            </motion.div>
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
      <div className="bottom_container">
        
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
            <input id="textbox" className={textboxClass} value={name} onChange={handleSetName} autocomplete="off"/>
            <FilterSuggestion list={possibleNames}/>
            <button id="guess_submit" type="submit">Enter</button>
        </form>
      </div>
      
    </motion.div>
  )

}

export default BattlePage