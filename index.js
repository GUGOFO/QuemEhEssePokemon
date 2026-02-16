const reiniciar = document.getElementById("reiniciar")
let nomes = ["", "", ""], habilidades = ["", "", ""], tipos = ["", "", ""], imagens = ["", "", ""];
let ids = [1,2,3]

reiniciar.addEventListener("click",async () => {
    for(let pokemon = 0; pokemon < 3; pokemon++){
        let id = Math.floor(Math.random() * 1000) + 1;
        console.log(id);
        let dados = await dadosPokemon(id);
        
        ({ name: nomes[pokemon],
          abilities: habilidades[pokemon],
          sprites: { other: { "official-artwork": { front_default: imagens[pokemon] } } },
          types : tipos[pokemon]
        } = dados);

        console.log(nomes[pokemon])
        console.log(habilidades[pokemon])
        console.log(imagens[pokemon])
        console.log(tipos[pokemon])
    }
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