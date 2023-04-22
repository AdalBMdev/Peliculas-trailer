const form = document.getElementById("form-add");
const enviar = document.getElementById("enviar");
const Idrol = localStorage.getItem('administrador');
const btn = document.getElementById("btn");

btn.addEventListener('click', () => {
  console.log('botón clickeado');
    window.location.replace("Agregar.html");

  });

if(Idrol == 1)
{
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
        Idrol: Idrol,
        titulo: Titulo,
        año: Año,
        director: Director,
        actores: Actores,
        poster: Poster,
        reseña: Reseña,
        link: encodeURIComponent(Link)
    };

      fetch("https://localhost:7011/Peliculas/registrarPelicula", {
        method: "POST",
        body: JSON.stringify(datos),
        headers: {"Content-Type": "application/json"},
      }).then(response => response.json())
      .then(response => console.log('Success:', response))
      .catch(error => console.error('Error:', error));
    
  });
}
