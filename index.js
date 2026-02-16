
dadosPokemon()

async function dadosPokemon() {
    
    try{
        const resposta = await fetch("https://pokeapi.co/api/v2/pokemon/25")

        if(!resposta.ok) throw new Error("deu merda aqui");

        const dados = await resposta.json()
        console.log(dados);
        modificarHtml(dados)
         
    }
    catch(error){
        console.log(error)
    }
}

function modificarHtml(dados){

    const pokemonImage = document.getElementById("pokemon");

    const { name: nome,
            abilities: habilidades,
            sprites: { other: { "official-artwork": { front_default: imagem } } },
            types : tipo
    } = dados

    console.log(nome)
    console.log(habilidades)
    console.log(imagem)
    console.log(tipo)

    pokemonImage.src = imagem
}