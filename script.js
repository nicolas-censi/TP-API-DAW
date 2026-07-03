let btnTodos = document.getElementById("btnTodos");
let btnFiltrar = document.getElementById("btnFiltrar");
let pEstado = document.getElementById("estado");
let contenedorPersonajes = document.getElementById("contenedorPersonajes");

// URL
const API_URL = "https://rickandmortyapi.com/api/character";

//Cargar todos los personajes
btnTodos.addEventListener("click", function() {
    obtenerDatosAPI(API_URL);
});

//Aplicar filtros
btnFiltrar.addEventListener("click", function() {
    // Capturamos los valores de los inputs
    let name = document.getElementById("filtroName").value.trim();
    let status = document.getElementById("filtroStatus").value.trim();
    let species = document.getElementById("filtroSpecies").value.trim();
    let type = document.getElementById("filtroType").value.trim();
    let gender = document.getElementById("filtroGender").value.trim();

    let urlFiltrada = API_URL + "?";
    
    if (name !== "") urlFiltrada += "name=" + name + "&";
    if (status !== "") urlFiltrada += "status=" + status + "&";
    if (species !== "") urlFiltrada += "species=" + species + "&";
    if (type !== "") urlFiltrada += "type=" + type + "&";
    if (gender !== "") urlFiltrada += "gender=" + gender + "&";

    // Hacemos la petición
    obtenerDatosAPI(urlFiltrada);
});

// Función centralizada para hacer el fetch
function obtenerDatosAPI(url) {
    actualizarEstado("Consultando a la base de datos...", "info");
    contenedorPersonajes.innerHTML = ""; 

    fetch(url)
        .then(function(respuesta) {
            // Validación de éxito[cite: 1]
            if (!respuesta.ok) {
                throw new Error("No se encontraron personajes con esos criterios.");
            }
            return respuesta.json();
        })
        .then(function(datos) {
            actualizarEstado("", "oculto"); 
            renderizarTarjetas(datos.results);
        })
        .catch(function(error) {
          
            actualizarEstado(error.message, "error");
            console.log("Error en la solicitud: " + error);
        });
}

// Función auxiliar para manejar el mensaje de estado
function actualizarEstado(mensaje, tipo) {
    pEstado.textContent = mensaje;
    pEstado.className = "mensaje-" + tipo;
}

// Función para inyectar los personajes
function renderizarTarjetas(personajes) {
    for (let i = 0; i < personajes.length; i++) {
        let p = personajes[i];
        
        
        let tarjeta = document.createElement("article");
        tarjeta.className = "tarjeta";
        
        
        tarjeta.innerHTML = `
            <img src="${p.image}" alt="Imagen de ${p.name}">
            <div class="tarjeta-info">
                <h3>${p.name}</h3>
                <p><strong>Estado:</strong> ${p.status}</p>
                <p><strong>Especie:</strong> ${p.species}</p>
                <p><strong>Género:</strong> ${p.gender}</p>
            </div>
        `;
        
        contenedorPersonajes.appendChild(tarjeta);
    }
}