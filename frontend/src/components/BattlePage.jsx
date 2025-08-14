import { useState } from "react"
import { useEffect } from "react"
import { motion } from "framer-motion"
import Pokedex from '../services/pokedex'
import Pokemon from "../models/Pokemon"
import { generation1PokemonNames } from '../services/pokemonNames'
import question_mark from '../assets/question.png'
import FilterSuggestion from "./FilterSuggestion"
import GuessedList from "./GuessedList"

const gen1 = generation1PokemonNames

//contains all logic about rendering poke img, types abilites, how input works, etc
const BattlePage = (props) => {
    //TODO: Make a object state that holds all the values of the answer poke and the guess poke
    const [display, setDisplay] = useState({
        guess: "What is your guess?",
        guessClass: "general-text",
        img: question_mark,
        type1: "?",
        attrib1: "attrib",
        type2: "?",
        attrib2: "attrib",
        ability1: "?",
        ability2: "?",
        lives: 8
    })

    const [poke, setPoke] = useState({})
    const [textboxClass, setTextboxClass] = useState("")
    const [name, setName] = useState("")
    const [possibleNames, setPossibleNames] = useState([])
    const [guessedList, setGuessedList] = useState({})
    
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

    const updateDisplay = (value, newValue) =>{
        setDisplay((prevDisplay)=>({
            ...prevDisplay,
            value: `${newValue}`,
        }))
    }

    const endGame = () =>{
        setDisplay(prevDisplay =>({
            ...prevDisplay,
            img: poke.img,
            guess:`${poke.name}`,
            guessClass:"general-text correct",
            type1: `${poke.type1}`,
            attrib1: `attrib ${poke.type1}`,
            type2: `${poke.type2}`,
            attrib2: `attrib ${poke.type2}`,
            ability1: `${poke.ability1}`,
            ability2: `${poke.ability2}`
        }))
    }

    const submitName = async (event) => {
        event.preventDefault()
        //console.log(`The name of the poke is ${poke.name}`)
        
        if(name.toLowerCase() === poke.name && display.lives > 0){
            setFeedback("feedback_right")
            setGuessedList(prevGuessedList => ({...prevGuessedList, [name]:"correct"}));
            endGame();
            console.log(display)
            return
        } 
        

        let names = generation1PokemonNames.map(pokename =>{
            return pokename.toLowerCase()
        })
        
        if(names.includes(name.toLowerCase()) && display.lives > 0){
            try{
                const res = await Pokedex.sendPoke({
                    name:`${name}`
                })
                
                const guessPoke = new Pokemon(res)
                const guessTypes = [guessPoke.type1, guessPoke.type2]
                const guessAbilites = [guessPoke.ability1, guessPoke.ability2]
                setDisplay((prevDisplay)=>({
                    ...prevDisplay,
                    "guess": `${guessPoke.name}`
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
                if(partial && display.lives <= 1){
                    setFeedback("feedback_partial")
                    setGuessedList(prevGuessedList => ({...prevGuessedList, [name]:"partial"}));
                    endGame();
                    setDisplay(prevDisplay=>({
                        ...prevDisplay,
                        guess: "Oh well, try again?",
                        lives: prevDisplay["lives"] - 1
                    }))
                    
                    return
                }
                if(partial){
                    setFeedback("feedback_partial")
                    setGuessedList(prevGuessedList => ({...prevGuessedList, [name]:"partial"}));
                }else if(display.lives > 1){
                    setFeedback("feedback_wrong")
                    setGuessedList(prevGuessedList => ({...prevGuessedList, [name]:"incorrect"}));
                }
                console.log(display.lives)
                setDisplay(prevDisplay=>({
                    ...prevDisplay,
                    lives: prevDisplay["lives"] - 1
                }))
                
            }
            catch(error){
                console.error("Pokemon not able to be sent through POST request due to error", error)
            }
            
        }
        else if(display.lives > 0){
        
            setFeedback("feedback_wrong")
            setGuessedList(prevGuessedList => ({...prevGuessedList, [name]:"incorrect"}));
            setDisplay(prevDisplay=>({
                ...prevDisplay,
                guess: name === "" ? "Nice guess dude." : "Not a Pokemon",
                lives: prevDisplay["lives"] - 1
            }))
        }
        else{
            setDisplay(prevDisplay=>({
                ...prevDisplay,
                guess: "No more lives!"
            }))
        }
            
            
        
    }

    return (
    <motion.div
    initial={{ opacity: 0.5 }} // Start invisible
      animate={{ opacity: 1 }} // Fade in
      exit={{ x: "50vw", opacity: 0 }} // Slide out to the left and fade
      transition={{ duration: 0.25 }} // Set animation speed
    >
        <div id="big">
        <div id="section1">
            <GuessedList guesses={guessedList}/>
        </div>
        <div id="section2">
        <div id="battle_header">
            <motion.div
                className="general-text"

                animate={{ rotate: [-20,20,0] }}
                transition={{
                    duration: 0.75,         
                }}
            >
                Dex
            </motion.div>
            <button id="test_btn" onClick={props.click}>
                Back to Home
            </button>
            <div id="lives-guess">
                <div className="general-text" id="lives-text">
                    {display.lives}
                </div>
                <div className={display.guessClass} id="guess_text">
                    
                    {display.guess}
                </div>
            </div>
            
        </div>
      
      <div className="pokebox">
        <motion.div
        id="pika"
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.1 }}>
        <img src= {display.img} />
        </motion.div>
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
      </div>
       <div id="section3"><div>3</div></div>
       </div>
    </motion.div>
  )

}

export default BattlePage