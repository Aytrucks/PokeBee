import { useState } from "react"
import { useEffect } from "react"
import { motion } from "framer-motion"
import Pokedex from '../services/pokedex'
import Pokemon from "../models/Pokemon"
import { generation1PokemonNames } from '../services/pokemonNames'
import question_mark from '../assets/question.png'
import FilterSuggestion from "./FilterSuggestion"

const gen1 = generation1PokemonNames

//contains all logic about rendering poke img, types abilites, how input works, etc
const BattlePage = (props) => {
    //TODO: Make a object state that holds all the values of the answer poke and the guess poke
    const [display, setDisplay] = useState({
        guess: "What is your guess?",
        guessClass: "test_text",
        img: question_mark,
        type1: "?",
        attrib1: "attrib",
        type2: "?",
        attrib2: "attrib",
        ability1: "?",
        ability2: "?"
    })

    const [poke, setPoke] = useState({})
    const [textboxClass, setTextboxClass] = useState("")
    const [name, setName] = useState("")
    const [possibleNames, setPossibleNames] = useState([])
    
    useEffect(() => {
        async function hook(){
        try{
            const res = await Pokedex.getAll()
  
            const mainPoke = new Pokemon(res)
            setPoke(mainPoke)
            console.log(mainPoke)
        }
        catch(error){
            console.error("Pokemon not received from API request due to error", error)
        }
        }
        hook()
    }, [])

    const handleSetName = (event) => {       
        const inputName = event.target.value
        setName(inputName)    
        setPossibleNames(generation1PokemonNames.filter(pokename=>pokename.toLowerCase().includes(inputName.toLowerCase())))
    }

    const setFeedback = (type) =>{
        setTextboxClass(type);
        setTimeout(() => setTextboxClass(""), 1000);
    }

    const submitName = async (event) => {
        event.preventDefault()
        //console.log(`The name of the poke is ${poke.name}`)
        
        if(name.toLowerCase() === poke.name){
            setFeedback("feedback_right")
            setDisplay(prevDisplay =>({
                ...prevDisplay,
                img: poke.img,
                guess:`${poke.name}`,
                guessClass:"test_text correct",
                type1: `${poke.type1}`,
                attrib1: `attrib ${poke.type1}`,
                type2: `${poke.type2}`,
                attrib2: `attrib ${poke.type2}`,
                ability1: `${poke.ability1}`,
                ability2: `${poke.ability2}`
            }))
            console.log(display)
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
                    const guessTypes = [guessPoke.type1, guessPoke.type2]
                    const guessAbilites = [guessPoke.ability1, guessPoke.ability2]
                    setDisplay((prevDisplay)=>({
                        ...prevDisplay,
                        guess: `${guessPoke.name}`
                    }))
                    //console.log(guessPoke)
                    //console.log(poke)

                    const checkPoke = [
                        {
                            value: poke.type1,
                            guess: guessTypes,
                            action: ()=>{

                                setDisplay((prevDisplay)=>({
                                    ...prevDisplay,
                                    type1: `${poke.type1}`,
                                    attrib1: `attrib ${poke.type1}`
                                }))
                                
                            }
                        },
                        {
                            value: poke.type2,
                            guess: guessTypes,
                            action: ()=>{

                                setDisplay((prevDisplay)=>({
                                    ...prevDisplay,
                                    type2: `${poke.type2}`,
                                    attrib2: `attrib ${poke.type2}`
                                }))
                            }
                        },
                        {
                            value: poke.ability1,
                            guess: guessAbilites,
                            action: ()=>{

                                setDisplay((prevDisplay)=>({
                                    ...prevDisplay,
                                    ability1: `${poke.ability1}`
                                }))
                            }
                        },
                        {
                            value: poke.ability2,
                            guess: guessAbilites,
                            action: ()=>{

                                setDisplay((prevDisplay)=>({
                                    ...prevDisplay,
                                    ability2: `${poke.ability2}`
                                }))
                            }
                        },
                    ]
                    let partial = false
                    for(const check of checkPoke){
                        if(check.value && check.guess.includes(check.value)){
                            check.action()
                            partial = true
                        }
                    }
                    if(partial){
                        setFeedback("feedback_partial")
                    }else{
                        setFeedback("feedback_wrong")
                    }
                    
                }
                catch(error){
                    console.error("Pokemon not able to be sent through POST request due to error", error)
                }
                
            }
            else{
                
                setDisplay(prevDisplay=>({
                    ...prevDisplay,
                    guess: name === "" ? "Nice guess dude." : "Not a Pokemon"
                }))
                setFeedback("feedback_wrong")
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
            <div className={display.guessClass} id="guess_text">
                {display.guess}
            </div>
            
        </div>
      
      <div className="pokebox">
        <img src= {display.img} id="pika"/>
      </div>
      <div className="bottom_container">
                
        <div className="container_poke">
            <div className="subcontainer_poke">
                <div>Type</div>
                <div className={display.attrib1}>
                    {display.type1}
                </div>
            </div>
            
            <div className="subcontainer_poke">Type
                <div className={display.attrib2}>
                {display.type2}
                </div>
            </div>
            
        </div>
        <div className="container_poke">
            <div className="subcontainer_poke">
                Ability
                <div className="attrib">
                {display.ability1}
                </div>
            </div>
            
            <div className="subcontainer_poke">Ability
                <div className="attrib">
                {display.ability2}
                </div>
            </div>
        </div>
        <form onSubmit={submitName} className="test_input">
            <input id="textbox" className={textboxClass} value={name} onChange={handleSetName} autoComplete="off"/>
            <FilterSuggestion list={possibleNames}/>
            <button id="guess_submit" type="submit">Enter</button>
        </form>
      </div>
      
    </motion.div>
  )

}

export default BattlePage