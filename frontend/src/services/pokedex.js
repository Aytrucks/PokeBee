import axios from "axios"

const url = "/api/test3"

const getAll = () =>{
    const req = axios.get(url)

    return req
    .then(output=>{
        return output.data
    })
}

const sendPoke = (poke) => {
    const req = axios.post(url, poke)
    return req.then(output => output.data)
}

export default {
    getAll : getAll,
    sendPoke : sendPoke,
}