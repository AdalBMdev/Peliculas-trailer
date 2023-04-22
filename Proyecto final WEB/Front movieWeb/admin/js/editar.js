const form = document.getElementById("form-edit");
const enviar = document.getElementById("enviar");
const Idrol = localStorage.getItem('administrador');
const btn = document.getElementById("btn");

btn.addEventListener('click', () => {
    
    window.location.replace("Agregar.html");

  });

  

const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('id'); // obtén el ID de la película desde la URL
console.log(movieId);
const apiUrl = `https://localhost:7011/Peliculas/mostrarPeliculas/${movieId}`; // construye la URL de la API
fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    const movie = data[0];

    // Obtener el elemento h4
    const titulo = document.querySelector('h4');

    // Cambiar el contenido HTML del elemento
    titulo.innerHTML = `Editando la pelicula<span class="adm">-->${movie.titulo}</span>`;
    document.body.style.backgroundImage = `url('${movie.poster}')`;


    document.getElementById("titulo").value = movie.titulo;
    document.getElementById("fecha").value = movie.año;
    document.getElementById("director").value = movie.director;
    document.getElementById("actores").value = movie.actores;
    document.getElementById("poster").value = movie.poster;
    document.getElementById("reseña").value = movie.reseña;
    const linkDecodificado = decodeURIComponent(movie.link);
    document.getElementById("trailer").value = linkDecodificado;
  })
  .catch(error => console.error(error));


      form.addEventListener("submit", (event) => {
        event.preventDefault();
        
         const Titulo = document.getElementById("titulo").value;
          const Año = document.getElementById("fecha").value;
          const Director = document.getElementById("director").value;
          const Actores = document.getElementById("actores").value;
          const Poster = document.getElementById("poster").value;
          const Reseña = document.getElementById("reseña").value;
          const Link = document.getElementById("trailer").value;
          
          const datos = {
            idpeliculas: movieId,
            titulo: Titulo,
            año: Año,
            director: Director,
            actores: Actores,
            reseña: Reseña,
            poster: Poster,
            link: encodeURIComponent(Link)
        };
        
        console.log(datos);
    
          fetch("https://localhost:7011/Peliculas/editarPeliculas", {
            method: "PUT",
            body: JSON.stringify(datos),
            headers: {
                "Content-Type": "application/json"
            },
        })
        .then(response => response.json())
        .then(response => console.log('Success:', response))
        .catch(error => console.error('Error:', error));
        
      });
    


