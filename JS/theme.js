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
    themeIcon.innerHTML = `<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>`;
  } else {
    themeIcon.innerHTML = `<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>`;
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
      themeIcon.innerHTML = `<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>`;
    } else {
      themeIcon.innerHTML = `<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>`;
    }
  }
}

// Establecer el año actual en el footer
const currentYearElement = document.getElementById("current-year");
if (currentYearElement) {
  currentYearElement.textContent = new Date().getFullYear();
}
