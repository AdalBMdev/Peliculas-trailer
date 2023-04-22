const logoutBtn = document.getElementById("logout");


const logout = async () => {
  try {
    const response = await fetch("https://localhost:7011/Login/logout");
    const data = await response.json();
    console.log('Success:', data);
    localStorage.removeItem('administrador');
    window.location.replace("../lobby/index.html");
  } catch (error) {
    console.error('Error:', error);
  }
}


logoutBtn.addEventListener("click", (event) => {
  event.preventDefault();
  logout();
});
