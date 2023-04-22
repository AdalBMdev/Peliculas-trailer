const formulario = document.getElementById("form-login");
const enviar = document.getElementById("enviarLogin");
const adm = localStorage.getItem('administrador')

console.log(adm);
if(adm === '1'){
  window.location.replace("adminCRUD.html");
}

formulario.addEventListener("submit",(event) => {
    event.preventDefault();

    const Correo = document.getElementById("correo").value;
    const Clave = document.getElementById("clave").value;
   
    // Crear un objeto JSON con los valores del formulario
    const datos = {
      correo: Correo,
      clave: Clave
    }
  
     console.log(datos);
  
// Guardar datos en la API 
  fetch("https://localhost:7011/Login/login", {
  method: "POST",
  body: JSON.stringify(datos),
  headers: {
    "Content-Type": "application/json"
  },
})
.then(response => response.json())
.then(data => {
  console.log('Success:', data);
  // Acceder al ID del usuario desde la respuesta de la API
  const administrador = data.rol;
  
  if(administrador != undefined) {
    // Guardar el id y nickname de usuario en localStorage
    localStorage.setItem('administrador', administrador);

    window.location.replace("adminCRUD.html");
  }
  
})
.catch(error => console.error('Error:', error));

})