const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('id'); // obtén el ID de la película desde la URL
const apiUrl = `https://localhost:7011/Peliculas/mostrarPeliculas/${movieId}`; // construye la URL de la API
fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    const movie = data[0];
    const fecha = new Date(movie.año);
    const fechaString = fecha.toLocaleDateString('es-ES', {year: 'numeric' });
    const linkDecodificado = decodeURIComponent(movie.link);
    console.log(linkDecodificado);

    const infoTop = document.getElementById("infoTop");
    infoTop.innerHTML = `
    <!--Play image-->
    <img src="${movie.poster}" alt="" class="play-img">
    <!--Play Text-->
    <div class="play-text" >
        <h2>${movie.titulo}</h2>
        <!-- Rating -->
        <div class="rating">
            <i class='bx bxs-star'></i>
            <i class='bx bxs-star'></i>
            <i class='bx bxs-star'></i>
            <i class='bx bxs-star'></i>
            <i class='bx bxs-star-half'></i>
        </div>
        <!-- Tags -->
        <div class="tags">
            <span>${movie.director}</span>
            <span>${fechaString}</span>
            <span>Trailer</span>
        </div>
        <!-- Trailer Button-->
        <a href="#" class="watch-btn">
            <i class='bx bx-right-arrow play play-peli' id="play-peli"></i>
        </a>
        <span>Mirar trailer</span>
    </div>
    
    `;

    const trailer = document.getElementById("trailer");
    trailer.innerHTML = `
    ${linkDecodificado}
    <!-- Close video icon -->
    <i class='bx bx-x close-video' id="close-peli"></i>
    `;
    

    const info = document.getElementById("info");
    info.innerHTML = `
    <h1>${movie.titulo}</h1>
    <h4>${movie.director}-${fechaString}</h4>
    <p>${movie.reseña}</p>
    <h2 class="cast-heading">Reparto</h2>
    <div class="cast">
        <div class="cast-box">
            <span class="cast-title">${movie.actores}</span>
        </div>
    </div>
    `;
  })
  .catch(error => console.error(error));




