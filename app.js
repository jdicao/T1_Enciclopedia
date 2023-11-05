
const searchForm = document.querySelector(".app-header-search");
let searchList = document.getElementById("search-list");
let allData;

const getInpuntValue = (event) => {
    event.preventDefault();
    let searchText = searchForm.search.value;
    fetchAllFilm(searchText);
}
/*caputar evento de click o enter en boton de busqueda*/
searchForm.addEventListener("submit", getInpuntValue);

/* Consumir Api y si encuentra info llamar a metodo de presentacion de datos */
const fetchAllFilm = async (searchText) => {
    let url = `https://www.omdbapi.com/?t=${searchText}&apikey=760677d9`
    try {
        
        const response = await fetch(url);
        allData = await response.json();

        if (allData.Response === "True") {
            console.log("Respuesta exitosa.");
            showInfoFilmDetails(allData);
        } else {
            console.log("No se encontraron datos para la búsqueda proporcionada.");
            window.alert("No se encontraron datos para la búsqueda proporcionada.");
        }

    } catch (error) {
        console.log(error);
    }
}

/* Presentar los datos obtenidos de la Api */
const showInfoFilmDetails = (data) => {
    document.querySelector(".app-body-content-thumbnail").innerHTML = `<img src="${data.Poster}" alt="${data.Title}"/>`;
    document.querySelector(".name").textContent = data.Title;
    document.querySelector(".tab-body-single-sinopsis").innerHTML = `<span>${data.Plot}</span>`;
    document.querySelector(".tab-body-single-actores").innerHTML = `<span>${data.Actors}</span>`;
    document.querySelector(".tab-body-single-detalleinfo").innerHTML = `
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