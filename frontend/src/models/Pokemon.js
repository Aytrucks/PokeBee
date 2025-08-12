class Pokemon{
    constructor(apiData){
        this.name = apiData.name,
        this.type1 = apiData.types[0].type.name,
        this.type2 = apiData.types[1]?.type.name ||"none",
        this.ability1 = apiData.abilities[0].ability.name,
        this.ability2 = apiData.abilities[1]?.ability.name || "none",
        this.img = apiData.sprites["versions"]["generation-v"]["black-white"]["animated"]["front_default"]
    }

    getBattleData(){
        return this.type1
    }
}

export default Pokemon