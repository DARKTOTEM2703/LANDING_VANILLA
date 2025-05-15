// Funcionalidad de la barra de navegación
document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.querySelector(".menu-toggle");
  const navbarLinks = document.querySelector(".navbar-links");
  const navbar = document.querySelector(".navbar");
  const navLinks = document.querySelectorAll(".navbar-link");

  // Alternar menú hamburguesa
  menuToggle?.addEventListener("click", function () {
    menuToggle.classList.toggle("active");
    navbarLinks.classList.toggle("active");
  });

  // Cerrar menú al hacer clic en un enlace
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      menuToggle.classList.remove("active");
      navbarLinks.classList.remove("active");
    });
  });

  // Cambiar estilo de navbar al hacer scroll
  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });
});
