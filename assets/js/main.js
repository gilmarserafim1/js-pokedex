const pokemonList = document.getElementById("section")
const loadMoreButton = document.getElementById("loadMore")
const maxRecords = 151
const limit = 10
let offset = 0

function convertPokemonToLi(pokemon){
    /* return `
        <li class="card ${pokemon.mainType}">
            <header class="headerPokemon">
                <span class="name">${pokemon.name}</span>
                <span class="number">#${pokemon.number}</span>
            </header>      

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}<li>`).join("")}
                </ol>
                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>            
        </li>
    ` 
    */
    return `
        <span class="card ${pokemon.mainType}">

            <div class="circle">
                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>            

            <span class="idName">${pokemon.number}. ${pokemon.name}</span>

            <ol class="types">
                ${pokemon.types.map((type) => `<li class="type ${type}">${type}<li>`).join("")}
            </ol>
                
        </span>
   `

}

function loadMorePokemons(offset, limit){
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join("")
        pokemonList.innerHTML += newHtml
    })
}

loadMorePokemons(offset, limit)

loadMoreButton.addEventListener("click", () => {
    offset += limit
    const nextRecords = offset + limit
    if(nextRecords >= maxRecords){
        const newLimit = maxRecords - offset
        loadMorePokemons(offset, newLimit)
        loadMoreButton.parentElement.removeChild(loadMoreButton)
    }else{
        loadMorePokemons(offset, limit)
    }
})
