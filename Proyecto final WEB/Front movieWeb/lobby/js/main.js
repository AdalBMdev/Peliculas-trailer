// Swiper

var swiper = new Swiper(".popular-content", {
    slidesPerView: 1,
    spaceBetween: 10,
    autoplay: {
      delay: 755500,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints:{
        280:{
            slidesPerView: 1,
            spaceBetween: 10,
        },
        320:{
            slidesPerView: 2,
            spaceBetween: 10,
        },
        510:{
            slidesPerView: 2,
            spaceBetween: 10,
        },
        758:{
            slidesPerView: 3,
            spaceBetween: 15,
        },
        900:{
            slidesPerView: 4,
            spaceBetween: 20,
        },
    },
  });

  setTimeout(() => {
    const playButton = document.querySelector('.play-peli');
    const video = document.querySelector('.video-container');
    const closebtn = document.querySelector('.close-video');
    const iframe = document.querySelector('iframe');
    iframe.setAttribute('id', 'myvideo');
    iframe.style.width = '1200px';
    iframe.style.height = '550px';

    playButton.onclick = () => {
      video.classList.add('show-video');
      const src = iframe.getAttribute('src');
      iframe.setAttribute('src', `${src}?autoplay=1`);
    };
  
    closebtn.onclick = () => {
      video.classList.remove('show-video');
    // Obtener la src actual del iframe
    const src = iframe.src;
    // Crear una instancia del objeto URL
    const url = new URL(src);
    // Crear un objeto URLSearchParams a partir de la cadena de consulta
    const params = new URLSearchParams(url.search);
    // Eliminar el parámetro autoplay
    params.delete('autoplay');
    // Crear una nueva instancia de URL con la cadena de consulta modificada
    const newUrl = new URL(`${url.origin}${url.pathname}`);
    newUrl.search = params.toString();
    // Asignar la nueva src al iframe
    iframe.src = newUrl.toString();

    };
  }, 2000); 
  