const express = require('express')
const axios = require('axios')
const app = express()

app.use(express.json())



app.get('/', async (req, res)=>{
    const imageurl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/2.gif"
    try{
        const response = await axios.get(imageurl, { responseType:'arraybuffer'})
        
        res.send(response.data)
    }catch(error){
        res.status(500).send('Damn image failed')
    }
    
})

app.get('/api/test', async (req, res)=>{
    const url = "https://pokeapi.co/api/v2/pokemon/ivysaur"
    try{
        const req2 = await axios.get(url)
        const data = req2.data
        console.log("Trying to send from the EP")
        res.json(data)
    }
    catch(error){
        res.status(500).send("FUCK DUDE")
    }
    
})

const PORT = process.env.PORT || 3002
app.listen(PORT, () => {
  console.log(`Server b runnin on that port over on ${PORT}`)
})