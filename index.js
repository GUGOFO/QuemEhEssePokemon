const reiniciar = document.getElementById("reiniciar")
let nomes = ["", "", ""], habilidades = ["", "", ""], tipos = ["", "", ""], imagens = ["", "", ""];
let nomeResposta, habilidadeResposta, tipoResposta, imagemResposta;
let ids = [1,2,3]

reiniciar.addEventListener("click",async () => {
    for(let pokemon = 0; pokemon < 3; pokemon++){
        let id = Math.floor(Math.random() * 1000) + 1;
        let dados = await dadosPokemon(id);

        ({ name: nomes[pokemon],
            abilities: { 0: { ability: { name: habilidades[pokemon]}}},
            sprites: { other: { "official-artwork": { front_default: imagens[pokemon] } } },
            types : { 0: { type: { name: tipos[pokemon] } } }
        } = dados);
    }

    let indexPokemonResposta = Math.floor(Math.random() * 3);
    nomeResposta = nomes[indexPokemonResposta];
    habilidadeResposta = habilidades[indexPokemonResposta];
    tipoResposta = tipos[indexPokemonResposta];
    imagemResposta = imagens[indexPokemonResposta];

    nomes.sort(() => Math.random() - 0.5);
    habilidades.sort(() => Math.random() - 0.5);
    tipoResposta.sort(() => Math.random() - 0.5);

    console.log(`nome: ${nomeResposta}\n habilidade: ${habilidadeResposta}\n tipo: ${tipoResposta}`)
})

async function dadosPokemon(id) {
    try{
        const resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)

        if(!resposta.ok) throw new Error("deu merda aqui");
        return await resposta.json();
    }
    catch(error){
        console.log(error)
    }
}