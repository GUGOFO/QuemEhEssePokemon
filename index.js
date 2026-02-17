const reiniciar = document.getElementById("reiniciar");
const btnNomes = document.querySelectorAll(".nomes");
const btnHabilidades = document.querySelectorAll(".habilidades");
const btnTipos = document.querySelectorAll(".tipos");
const imagemPokemon = document.getElementById("pokemon");


let nomes = ["", "", ""], habilidades = ["", "", ""], tipos = ["", "", ""], imagens = ["", "", ""];
let nomeResposta, habilidadeResposta, tipoResposta, imagemResposta;
let ids = [1,2,3];
let click = 0;


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
    tipos.sort(() => Math.random() - 0.5);
    
    console.log(`nome: ${nomeResposta}\n habilidade: ${habilidadeResposta}\n tipo: ${tipoResposta}`)
    adicionarHtml();
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

function adicionarHtml(){
    for(let i = 0; i < 3; i++){
        btnNomes[i].textContent = nomes[i]
        btnHabilidades[i].textContent = habilidades[i]
        btnTipos[i].textContent = tipos[i]
    }

    document.getElementById("divPerguntas").style.display = "block";
    imagemPokemon.style.filter = " brightness(0)"
    imagemPokemon.src = imagemResposta;

    btnNomes.forEach(btn => btn.classList[0] == "botoesAcertou" ? btn.classList.replace("botoesAcertou", "botoes") : btn.classList.replace("botoesErrou", "botoes"));
    btnHabilidades.forEach(btn => btn.classList[0] == "botoesAcertou" ? btn.classList.replace("botoesAcertou", "botoes") : btn.classList.replace("botoesErrou", "botoes"));
    btnTipos.forEach(btn => btn.classList[0] == "botoesAcertou" ? btn.classList.replace("botoesAcertou", "botoes") : btn.classList.replace("botoesErrou", "botoes"));
}

function motrarPokemon(){
    let cancelar = 0;
    btnNomes.forEach(btn => btn.classList[0] != "botoes" || cancelar++);
    btnHabilidades.forEach(btn => btn.classList[0] != "botoes" || cancelar++);
    btnTipos.forEach(btn => btn.classList[0] != "botoes" || cancelar++);
    cancelar == 0 && (imagemPokemon.style.filter = " brightness(1)")
    console.log(cancelar)
}

btnNomes.forEach(btnNome => {
    btnNome.addEventListener("click", () => {
        btnNomes.forEach(btn => {
            if(btn.textContent === nomeResposta) btn.classList.replace("botoes", "botoesAcertou");
            else btn.classList.replace("botoes", "botoesErrou");
        })
        motrarPokemon();
    })
})

btnHabilidades.forEach(btnHabilidade => {
    btnHabilidade.addEventListener("click", () => {
        btnHabilidades.forEach(btn => {
            if(btn.textContent === habilidadeResposta) btn.classList.replace("botoes", "botoesAcertou");
            else btn.classList.replace("botoes", "botoesErrou");
        })
        motrarPokemon()
    })
})

btnTipos.forEach(btnTipo => {
    btnTipo.addEventListener("click", () => {
        btnTipos.forEach(btn => {
            if(btn.textContent === tipoResposta) btn.classList.replace("botoes", "botoesAcertou");
            else btn.classList.replace("botoes", "botoesErrou");
        })
        motrarPokemon()
    })
})