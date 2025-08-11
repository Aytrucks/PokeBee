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
        }, 700)
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
                    const guessTypes = [guessPoke.type1, guessPoke.type2]
                    const guessAbilites = [guessPoke.ability1, guessPoke.ability2]
                    //console.log(guessPoke)
                    //console.log(poke)

                    const checkPoke = [
                        {
                            value: poke.type1,
                            guess: guessTypes,
                            action: ()=>{
                                setType1(`${poke.type1}`)
                                setAttrib1(`attrib ${poke.type1}`)
                            }
                        },
                        {
                            value: poke.type2,
                            guess: guessTypes,
                            action: ()=>{
                                setType2(`${poke.type2}`)
                                setAttrib2(`attrib ${poke.type2}`)
                            }
                        },
                        {
                            value: poke.ability1,
                            guess: guessAbilites,
                            action: ()=>{
                                setAbility1(`${poke.ability1}`)
                            }
                        },
                        {
                            value: poke.ability2,
                            guess: guessAbilites,
                            action: ()=>{
                                setAbility2(`${poke.ability2}`)
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
                setGuess(name === "" ? "Nice guess dude." : "Not a Pokemon");
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
            <div className={guessClass} id="guess_text">
                {guess}
            </div>
            
        </div>
      
      <div className="pokebox">
        <img src= {img} id="pika"/>
      </div>
      <div className="bottom_container">
                
        <div className="container_poke">
            <div className="subcontainer_poke">
                <div>Type</div>
                <div className={attrib1}>
                    {type1}
                </div>
            </div>
            
            <div className="subcontainer_poke">Type
                <div className={attrib2}>
                {type2}
                </div>
            </div>
            
        </div>
        <div className="container_poke">
            <div className="subcontainer_poke">
                Ability
                <div className="attrib">
                {ability1}
                </div>
            </div>
            
            <div className="subcontainer_poke">Ability
                <div className="attrib">
                {ability2}
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