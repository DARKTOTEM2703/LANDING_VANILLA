// Manejo de temas (claro/oscuro)
console.log("DOMContentLoaded: Iniciando configuración del tema");
const themeToggle = document.querySelector(".theme-toggle");
const themeIcon = document.getElementById("theme-icon");

if (themeToggle && themeIcon) {
  console.log("Elementos del tema encontrados, añadiendo listener");
  themeToggle.addEventListener("click", function () {
    console.log("Botón de tema clickeado");
    try {
      toggleTheme();
    } catch (error) {
      console.error("Error al cambiar el tema:", error);
    }
  });
} else {
  console.error("No se encontraron los elementos del tema:", {
    themeToggle: !!themeToggle,
    themeIcon: !!themeIcon,
  });
}

function toggleTheme() {
  console.log("Ejecutando toggleTheme");
  const htmlElement = document.documentElement;
  const currentTheme = htmlElement.getAttribute("data-theme");
  console.log("Tema actual:", currentTheme);
  const newTheme = currentTheme === "light" ? "dark" : "light";
  console.log("Nuevo tema:", newTheme);

  // Aplicar el nuevo tema
  htmlElement.setAttribute("data-theme", newTheme);

  // Actualizar el icono según el tema
  if (newTheme === "light") {
    // Icono de luna para modo claro
    themeIcon.innerHTML = `<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" stroke="currentColor" stroke-width="2" fill="none"></path>`;
  } else {
    // Icono de sol para modo oscuro con color forzado a blanco
    themeIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><circle cx="12" cy="12" r="5" stroke="#ffffff" stroke-width="2" fill="none"></circle><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="#ffffff" stroke-width="2"></path></svg>`;
  }

  // Disparar evento para notificar cambio de tema
  const event = new Event("themeChanged");
  document.dispatchEvent(event);
  console.log("Evento themeChanged disparado");

  // Guardar preferencia en localStorage
  localStorage.setItem("theme", newTheme);
  console.log("Tema guardado en localStorage");
}

// Comprobar y aplicar el tema guardado al cargar la página
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  document.documentElement.setAttribute("data-theme", savedTheme);

  // Actualizar el icono según el tema guardado
  if (themeIcon) {
    if (savedTheme === "light") {
      themeIcon.innerHTML = `<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" stroke="currentColor" stroke-width="2" fill="none"></path>`;
    } else {
      themeIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><circle cx="12" cy="12" r="5" stroke="#ffffff" stroke-width="2" fill="none"></circle><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="#ffffff" stroke-width="2"></path></svg>`;
    }
  }
}

// Establecer el año actual en el footer
const currentYearElement = document.getElementById("current-year");
if (currentYearElement) {
  currentYearElement.textContent = new Date().getFullYear();
}
