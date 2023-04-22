const btn = document.getElementById("btn");
const filtroButton = document.getElementById("filtro");

btn.addEventListener('click', () => {
  console.log('botón clickeado');
    window.location.replace("Agregar.html");

  });

const cargarPeliculas = async (url) => {
    console.log('q');
  
    const response = await fetch(url);
     const responseData = await response.json();
     console.log('Success:', responseData);
  
     const containerPopular = document.getElementById('peliculas-container');
     const containerGeneral = document.getElementById('peliculas-containerG');
     let peliculaElement; 

     containerPopular.innerHTML = '';
     containerGeneral.innerHTML = '';

     for (let i = 0; i < responseData.length; i++) {
      const pelicula = responseData[i];

        const idPeliculas = pelicula.idpeliculas;

         peliculaElement = generarFilaPeliculaPopular(pelicula);
        containerPopular.appendChild(peliculaElement);

        peliculaElement = generarFilaPeliculaGeneral(pelicula);
         containerGeneral.appendChild(peliculaElement);

        const editarBtn = document.getElementById(`edit-${idPeliculas}`);
        const eliminarBtn = document.getElementById(`delete-${idPeliculas}`);

        editarBtn.addEventListener('click', async () => {
          const id = editarBtn.getAttribute('data-id');
          window.location.replace(`editar.html?id=${id}`)
        });

        eliminarBtn.addEventListener('click', async () => {
            const id = eliminarBtn.getAttribute('data-id');
            await fetch(`https://localhost:7011/Peliculas/eliminarPeliculas/${id}`, { method: 'DELETE' });
            location.reload();
          });
 
      }
   };

   filtroButton.addEventListener('click', async () => {
    const busqueda = document.getElementById("search-input").value;
    cargarPeliculas(`https://localhost:7011/filtroTitulo/${busqueda}`);

  });   

  
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
        <img src="${poster}" alt="" class="movie-box-img">
        <div class="box-text">
            <h2 class="movie-title">${titulo}</h2>
            <span class="movie-type">${fechaString}</span>
            <a  href="../lobby/play-page.html?id=${idPeliculas}" class="watch-btn play-btn">
                <i  class='bx bx-right-arrow' id="info-${idPeliculas}" data-id="${idPeliculas}"></i>
            </a>
            <a  class="watch-btnAD play-btn">
            <i href="Editar.html?id=${idPeliculas}" class='bx bx-edit-alt' id="edit-${idPeliculas}" data-id="${idPeliculas}"></i>
            <i class='bx bx-trash' id="delete-${idPeliculas}" data-id="${idPeliculas}"></i>
                
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
            <a  class="watch-btn play-btn">
            <i href="play-page.html?id=${idPeliculas}" class='bx bx-right-arrow' id="info-${idPeliculas}" data-id="${idPeliculas}"></i>
            <i class='bx bx-edit-alt' id="edit-${idPeliculas}" data-id="${idPeliculas}"></i>
            <i class='bx bx-trash' id="delete-${idPeliculas}" data-id="${idPeliculas}"></i>
        </a>
        </div>
    </div>
    `;
    return peliculaElementSec;
  }
  
  cargarPeliculas(`https://localhost:7011/Peliculas/mostrarPeliculas/`);

