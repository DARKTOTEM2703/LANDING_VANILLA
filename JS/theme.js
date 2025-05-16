// Gestión del tema (claro/oscuro) con detección automática

// Función para detectar la preferencia del sistema
function getSystemThemePreference() {
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    return "dark";
  }
  return "light";
}

// Función para aplicar un tema específico
function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  updateThemeIcon(theme);
}

// Función para actualizar el icono del botón según el tema
function updateThemeIcon(theme) {
  const themeIcon = document.getElementById("theme-icon");
  if (themeIcon) {
    if (theme === "light") {
      // Icono de luna para tema claro
      themeIcon.innerHTML = `<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" stroke="currentColor" stroke-width="2" fill="none"></path>`;
    } else {
      // Icono de sol para tema oscuro
      themeIcon.innerHTML = `<circle cx="12" cy="12" r="5" stroke="currentColor" stroke-width="2" fill="none"></circle><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" stroke-width="2"></path>`;
    }
  }
}

// Función para cambiar el tema manualmente
function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "light" ? "dark" : "light";

  // Guardar preferencia en localStorage
  localStorage.setItem("userTheme", newTheme);

  // Aplicar nuevo tema
  applyTheme(newTheme);
}

// Inicialización - ejecutar cuando el DOM esté cargado
document.addEventListener("DOMContentLoaded", () => {
  console.log("Inicializando detector de tema...");

  // Configurar el botón de cambio de tema
  const themeToggle = document.querySelector(".theme-toggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme);
  }

  // Determinar qué tema aplicar inicialmente
  const savedTheme = localStorage.getItem("userTheme");

  if (savedTheme) {
    // Si hay una preferencia guardada por el usuario, usarla
    console.log("Aplicando tema guardado:", savedTheme);
    applyTheme(savedTheme);
  } else {
    // Si no, usar la preferencia del sistema
    const systemTheme = getSystemThemePreference();
    console.log("Aplicando tema del sistema:", systemTheme);
    applyTheme(systemTheme);
  }

  // Escuchar cambios en la preferencia del sistema
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
      // Solo actualizar si no hay preferencia manual guardada
      if (!localStorage.getItem("userTheme")) {
        const newTheme = e.matches ? "dark" : "light";
        applyTheme(newTheme);
      }
    });

  // Actualizar el año en el footer
  const currentYearElement = document.getElementById("current-year");
  if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
  }
});

// Asegurar una correcta visualización inicial antes de que se cargue el DOM completamente
(function () {
  // Detectar tema inicial rápidamente para evitar flash de tema incorrecto
  const savedTheme = localStorage.getItem("userTheme");
  const initialTheme = savedTheme || getSystemThemePreference();
  document.documentElement.setAttribute("data-theme", initialTheme);
})();
