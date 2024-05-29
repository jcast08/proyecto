let botoSiguiente = document.querySelector("#Siguiente")
let botonAnterior = document.querySelector("#Anterior")
let divpersonales = document.querySelector("#grilla-personajes")
let PreviewsPage = 'https://pokeapi.co/api/v2/pokemon?offset=20&limit=20'

mostrarobjetos()

botonAnterior.setAttribute('data-mostrar-personajes', 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=20')
botoSiguiente.setAttribute('data-mostrar-personajes', 'https://pokeapi.co/api/v2/pokemon?offset=40&limit=20')


botoSiguiente.addEventListener('click', function (e) {
    let urlNext = e.target.getAttribute('data-mostrar-personajes')
    if (urlNext != "null") {
        mostrarobjetos(urlNext)
    }
})

botonAnterior.addEventListener('click', function (e) {
    if (e.target.dataset.mostrarPersonajes) {
        mostrarobjetos(e.target.dataset.mostrarPersonajes)
    }
})


function mostrarobjetos(url_pokeapi = 'https://pokeapi.co/api/v2/pokemon') {
    let dataAPI_pokeapi = fetch(url_pokeapi)
    dataAPI_pokeapi.then(respuestaPromesa => respuestaPromesa.json())
        .then(infojson => {
            divpersonales.innerHTML = ''
            infojson.results.forEach(element => {
                let urlPokemon = element.url
                let consumoPokemon = fetch(urlPokemon)
                consumoPokemon.then(respuestaPromesa => respuestaPromesa.json())
                    .then(infoPokemon => {

                        divpersonales.innerHTML += `
                        <div class="col">                        
                            <div class="card cartaColor">
                            <div id="carousePokemones_${infoPokemon.id}" class="carousel slide">
                            <div class="carousel-inner">
                            <div class="carousel-item active">
                                <img src="${infoPokemon.sprites.other["official-artwork"].front_default}" class="d-block w-100" card-img-top" alt="..."">
                            </div>
                            <div class="carousel-item">
                                <img src="${infoPokemon.sprites.other.home.front_default}" class="d-block w-100" card-img-top" alt="...">
                            </div>
                            <div class="carousel-item">
                                <img src="${infoPokemon.sprites.other.dream_world.front_default}" class="d-block w-100" card-img-top" alt="...">
                            </div>
                            </div>
                            <button class="carousel-control-prev" type="button" data-bs-target="#carousePokemones_${infoPokemon.id}" data-bs-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Previous</span>
                            </button>
                            <button class="carousel-control-next" type="button" data-bs-target="#carousePokemones_${infoPokemon.id}" data-bs-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Next</span>
                            </button>
                        </div>
                                
                                    <div class="card-body">
                                    <h5 class="card-title">${infoPokemon.name}</h5>
                                    </div>
                            </div>
                        </div>
                        `
                    })

            })
            botonAnterior.setAttribute('data-mostrar-personajes', infojson.previous)
            botoSiguiente.setAttribute('data-mostrar-personajes', infojson.next)
        })

}

