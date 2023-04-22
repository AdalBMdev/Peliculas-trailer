const filtroButton = document.getElementById("filtro");
const section = document.getElementById("popular");
const poster = document.getElementById("home");


const cargarPeliculas = async (url) => {
    console.log('q');
  
    const response = await fetch(url);
     const responseData = await response.json();
     console.log('Success:', responseData);
  
     const containerPopular = document.getElementById('peliculas-container');
     const containerGeneral = document.getElementById('peliculas-containerG');
     const cartel = document.getElementById('home');


     containerPopular.innerHTML = '';
     containerGeneral.innerHTML = '';
     cartel.innerHTML = '';

     const peliculaq = responseData[0];
     generarFilaPeliculaCartel(peliculaq);
     
 

     for (let i = 0; i < responseData.length; i++) {
       const pelicula = responseData[i];

       let peliculaElement = generarFilaPeliculaPopular(pelicula);
       containerPopular.appendChild(peliculaElement);

        peliculaElement = generarFilaPeliculaGeneral(pelicula);
        containerGeneral.appendChild(peliculaElement);

     }

  };

  filtroButton.addEventListener('click', async () => {

    const busqueda = document.getElementById("search-input").value;
    if (busqueda.length > 0) {
        
        section.style.display = "none";
        poster.style.display = "none";

    const response = await fetch(`https://localhost:7011/filtroTitulo/${busqueda}`);
    const responseData = await response.json();
    console.log('Success:', responseData);
 
    const containerGeneral = document.getElementById('peliculas-containerG');
    
    containerGeneral.innerHTML = '';

   for (let i = 0; i < responseData.length; i++) {
       const pelicula = responseData[i];
   
           const peliculaElement = generarFilaPeliculaPopular(pelicula);
           containerGeneral.appendChild(peliculaElement);
   
    }
    }
    else {

        section.style.display = "block";
        poster.style.display = "block";
        cargarPeliculas(`https://localhost:7011/Peliculas/mostrarPeliculas/`);

    }

  });  

  function generarFilaPeliculaCartel(pelicula) {
    const idPeliculas = pelicula.idpeliculas;
    const titulo = pelicula.titulo;
    const poster = pelicula.poster;
    const cartel = document.getElementById('home');
    cartel.innerHTML = '';
  
    const fecha = new Date(pelicula.año);
    const fechaString = fecha.toLocaleDateString('es-ES', {year: 'numeric' });
    
    const cartelHTML = `
      <!--Home img-->
      <img src="${poster}" alt="" class="home-img">
      <!--Home Text-->
      <div class="home-text">
        <h1 class="home-title">${titulo}<br>${pelicula.director}</h1>
        <p>${fechaString}</p>
      </div>
    `;
    cartel.innerHTML = cartelHTML;
  
    return cartel;
  }
  
  
  function generarFilaPeliculaPopular(pelicula) {
    const idPeliculas = pelicula.idpeliculas;
    const titulo = pelicula.titulo;
    const poster = pelicula.poster;
  
    const fecha = new Date(pelicula.año);
    const fechaString = fecha.toLocaleDateString('es-ES', {year: 'numeric' });
    
    const peliculaElement = document.createElement('div');
    peliculaElement.classList.add("swiper-slide");
    peliculaElement.setAttribute('data-id', idPeliculas);
    peliculaElement.innerHTML = `
    <div class="movie-box">
        <img src="${poster}" width="800px" heigth="400" alt="" class="movie-box-img">
        <div class="box-text">
            <h2 class="movie-title">${titulo}</h2>
            <span class="movie-type">${fechaString}</span>
            <a href="play-page.html?id=${idPeliculas}" class="watch-btn play-btn">
                <i class='bx bx-right-arrow' id="info-${idPeliculas}" data-id="${idPeliculas}"></i>
            </a>
        </div>
    </div>
    `;

    
    return peliculaElement;
  }

  function generarFilaPeliculaGeneral(pelicula) {
    const idPeliculas = pelicula.idpeliculas;
    const titulo = pelicula.titulo;
    const poster = pelicula.poster;

    const fecha = new Date(pelicula.año);
    const fechaString = fecha.toLocaleDateString('es-ES', {year: 'numeric' });
  
    const peliculaElementSec = document.createElement('div');
    peliculaElementSec.classList.add("swiper-slide");
    peliculaElementSec.setAttribute('data-id', idPeliculas);

    peliculaElementSec.innerHTML = `
    <div class="movie-box">
        <img src="${poster}" alt="" class="movie-box-img">
        <div class="box-text">
            <h2 class="movie-title">${titulo}</h2>
            <span class="movie-type">${fechaString}</span>
            <a href="play-page.html?id=${idPeliculas}" class="watch-btn play-btn" id="info-${idPeliculas}" data-id="${idPeliculas}">
                <i class='bx bx-right-arrow'></i>
            </a>
        </div>
    </div>
    `;
    return peliculaElementSec;
  }
  

  cargarPeliculas(`https://localhost:7011/Peliculas/mostrarPeliculas/`);
