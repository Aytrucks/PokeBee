import axios from "axios"

const url = "/api/test"

const getAll = () =>{
    const req = axios.get(url)

    return req
    .then(output=>{
        return output.data
    }).catch(error=>{
        console.log("Error occurd")
    })
}

const sendPoke = (poke) => {
    const req = axios.post(url, poke)
    return req.then(output => output.data).catch(error=>console.log("There has been an error"))
}

export default {
    getAll : getAll,
    sendPoke : sendPoke,
}