// Funcionalidad para el formulario de contacto sin redirección
document.addEventListener("DOMContentLoaded", function () {
  // Manejar el formulario de contacto
  const contactForm = document.getElementById("contact-form");
  const formStatus = document.getElementById("form-status");
  const submitBtn = document.getElementById("submit-btn");

  if (contactForm) {
    contactForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      // Obtener los valores del formulario
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const message = document.getElementById("message").value;

      // Validación básica
      if (!name || !email || !message) {
        showFormStatus("error", "Por favor completa todos los campos");
        return;
      }

      // Cambiar estado del botón
      const originalBtnContent = submitBtn.innerHTML;
      submitBtn.innerHTML = `
        <svg class="spinner" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="12" y1="2" x2="12" y2="6"></line>
            <line x1="12" y1="18" x2="12" y2="22"></line>
            <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
            <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
            <line x1="2" y1="12" x2="6" y2="12"></line>
            <line x1="18" y1="12" x2="22" y2="12"></line>
            <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
            <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
        </svg>
        <span>Enviando...</span>
      `;
      submitBtn.disabled = true;

      try {
        // Crear FormData del formulario
        const formData = new FormData(contactForm);

        // Enviar el formulario usando fetch API
        const response = await fetch(contactForm.action, {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
          },
        });

        const responseData = await response.json();

        if (response.ok) {
          // Éxito
          showFormStatus(
            "success",
            "¡Mensaje enviado con éxito! Te contactaré pronto."
          );
          contactForm.reset();
        } else {
          // Si hay error de Formspree
          if (responseData.error) {
            // Si requiere captcha, mostrar mensaje especial
            if (responseData.error.includes("captcha")) {
              showFormStatus(
                "error",
                "Por favor intenta de nuevo y completa el captcha que aparecerá"
              );
            } else {
              showFormStatus("error", responseData.error);
            }
          } else {
            showFormStatus(
              "error",
              "Hubo un error al enviar el mensaje. Intenta de nuevo."
            );
          }
        }
      } catch (error) {
        console.error("Error al enviar el formulario:", error);
        showFormStatus(
          "error",
          "Hubo un error en el envío. Por favor, contacta directamente por email."
        );
      } finally {
        submitBtn.innerHTML = originalBtnContent;
        submitBtn.disabled = false;
      }
    });
  }

  // Función para mostrar el estado del formulario
  function showFormStatus(type, message) {
    formStatus.className = "form-status " + type;
    formStatus.innerHTML =
      type === "success"
        ? `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg><p>${message}</p>`
        : `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg><p>${message}</p>`;
    formStatus.style.display = "flex";

    // Ocultar el mensaje después de 5 segundos si es de éxito
    if (type === "success") {
      setTimeout(() => {
        formStatus.style.display = "none";
      }, 5000);
    }
  }
});
