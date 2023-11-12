const searchBusqueda = document.querySelector(".busqueda");
const searchSinopsis = document.querySelector(".ampliar-sinopsis");
var textoBusqueda
let dataPelicula

const getInpuntValue = (event) => {
    event.preventDefault();
    textoBusqueda = searchBusqueda.txtPelicula.value;
    console.log(textoBusqueda);
    BuscarInfoPelicula(textoBusqueda);
}

const getSinopsisAmpliada = (event) => {
    event.preventDefault();
    console.log("Buscando sinopsis ampliada de: ", textoBusqueda);
    BuscaSinopsisAmpliada(textoBusqueda);
}

/*caputar evento de click o enter en boton de busqueda*/
searchBusqueda.addEventListener("submit", getInpuntValue);
searchSinopsis.addEventListener("submit", getSinopsisAmpliada);

/* Consumir Api y si encuentra info llamar a metodo de presentacion de datos */
const BuscarInfoPelicula = async (ltBusqueda) => {
    let url = `https://www.omdbapi.com/?t=${ltBusqueda}&apikey=760677d9`
    try {
        
        const response = await fetch(url);
        dataPelicula = await response.json();

        if (dataPelicula.Response === "True") {
            CargaDetallePelicula(dataPelicula);
        } else {
            console.log("No se encontraron datos para la búsqueda proporcionada.");
            window.alert("No se encontraron datos para la búsqueda proporcionada.");
        }

    } catch (error) {
        console.log(error);
    }
}

/*Presentar sinopsis ampliada*/
const BuscaSinopsisAmpliada = async (ltBusqueda) => {
    let url = `https://www.omdbapi.com/?t=${ltBusqueda}&plot=full&apikey=760677d9`
    try {
        
        const response = await fetch(url);
        dataPelicula = await response.json();

        if (dataPelicula.Response === "True") {
            document.querySelector(".texto-sinopsis").textContent = dataPelicula.Plot;
        } 

    } catch (error) {
        console.log(error);
    }
}

/* Presentar los datos obtenidos de la Api */
const CargaDetallePelicula = (data) => {
    document.querySelector(".foto-pelicula").innerHTML = `<img src="${data.Poster}" alt="${data.Title}"/>`;
    document.querySelector(".texto-titulo").textContent = data.Title;
    document.querySelector(".texto-sinopsis").textContent = data.Plot;

    document.querySelector(".lista-detalle").innerHTML = `
    <li>
        <span>
        <i class="fas fa-film"></i>
        Actores:
        </span>
        <span>${data.Actors}</span>
    </li>    
    <li>
        <span>
        <i class="fas fa-film"></i>
        Año:
        </span>
        <span>${data.Year}</span>
    </li>
    <li>
        <span>
        <i class="fas fa-film"></i>
        Director:
        </span>
        <span>${data.Director}</span>
    </li>
    <li>
        <span>
        <i class="fas fa-film"></i>
        Genero:
        </span>
        <span>${data.Genre}</span>
    </li>
    <li>
        <span>
        <i class="fas fa-film"></i>
        País:
        </span>
        <span>${data.Country}</span>
    </li>
    <li>
        <span>
        <i class="fas fa-film"></i>
        Duración:
        </span>
        <span>${data.Runtime}</span>
    </li>
    <li>
        <span>
        <i class="fas fa-film"></i>
        Idioma:
        </span>
        <span>${data.Language}</span>
    </li>
    `;
}

BuscarInfoPelicula("Marvel");