import axios from "axios"

const url = "https://pokeapi.co/api/v2/pokemon/ivysaur"

const getAll = () =>{
    const req = axios.get(url)

    return req
    .then(output=>{
        return output.data
    }).catch(error=>{
        console.log("Error occurd")
    })
}

export default {
    getAll : getAll,
}