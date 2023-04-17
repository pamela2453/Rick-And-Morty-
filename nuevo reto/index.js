const API = "https://rickandmortyapi.com/api";

let characters = `${API}/character`;
const container = document.querySelector('#container');

const buscar = document.querySelector('#buscar');
const inputBuscar = document.querySelector("#inputbuscar");

const Regresar = document.querySelector("#Regresar");
const Siguiente = document.querySelector("#Siguiente");

const filters = document.querySelectorAll(".btn-check")
let items;


const dibujarCards = (results) => {
    let cardAcumuladas = ""
    for (i = 0; i < results.length; i++) {

        let card = `
        <div class="col-4 mb-3 d-flex justify-content-center ">
            <div class="card mb-4 bg-dark" style="width: 17rem; height: 28rem; align-items: center; border: 3px aqua solid;  outline: 4px solid lime;">
            <h5 class="card-title text-danger"> Nombre : ${results[i].name}</h5>
            <img pt-5 src=" ${results[i].image}" class="card-img-top border" alt="...">
                <div class="card-body">
                <p class="card-text text-warning"> Genero : ${results[i].gender}</p>
                <p class="card-text text-warning"> Espacie : ${results[i].species}</p>
                <p class="card-text text-warning"> dimencion : ${results[i].origin.name}</p>
            </div>
        </div>
      </div>`

        cardAcumuladas += card
    }
    container.innerHTML = cardAcumuladas
}

const buscarAction = () => {
    characters = `${API}/character/?name=${inputBuscar.value}`
    cargarDatos();
}



buscar.addEventListener('click', buscarAction)



Siguiente.addEventListener("click", () => {
    if (items.info.next) {
        Siguiente.disabled = true
        characters = items.info.next;
        cargarDatos();
    }
})



Regresar.addEventListener("click", () => {
    if (items.info.prev) {
        characters = items.info.prev
        cargarDatos();
    }
})


const addFilterCharacter = (value, origin) => {
    let queryString = "";
    switch(origin)
    {
        case "status":
            queryString = `status=${value}`
        break;
        case "species":
            queryString = `species=${value}`
        break;
        case "gender":
            queryString = `gender=${value}`
        break;
    }
    
    if(characters.includes('?'))
    {
        characters = characters.concat(`&${queryString}`)
    }else{
        characters =  characters.concat(`?${queryString}`)
    }
    
    cargarDatos();
}

filters.forEach(item => item.addEventListener('click', (event) => {
    addFilterCharacter(event.target.labels[0].textContent, event.target.name);
}))


const cargarDatos = () => {
    window.fetch(characters)
        .then((response) => response.json())
        .then((responseJson) => {
            dibujarCards(responseJson.results)
            items = responseJson
            Siguiente.disabled = false
        })
        .catch(error => { 
            container.innerHTML = "No se encontro nada en su FILTRO"
        })
}

cargarDatos();
