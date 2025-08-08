class Pokemon{
    constructor(apiData){
        this.name = apiData.name;
        this.type1 = apiData.types[0].type.name === "fairy" ? "normal" : apiData.types[0].type.name;

        const type2Value = apiData.types[1]?.type.name || "none";
        this.type2 = type2Value === 'fairy' ? 'none' : type2Value;

        this.ability1 = apiData.abilities[0].ability.name;
        this.ability2 = apiData.abilities[1]?.ability.name || "none";
        this.img = apiData.sprites["other"]['official-artwork']['front_default'];
    }

    getBattleData(){
        return this.type1
    }
}

export default Pokemon