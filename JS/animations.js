// Funcionalidad para el formulario de contacto y copiar email
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
                <svg class="spinner" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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
        // En un entorno real, aquí enviarías los datos a Formspree o tu backend
        // Para esta demo, simularemos una respuesta exitosa después de un retraso
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Simulación de éxito
        showFormStatus(
          "success",
          "¡Mensaje enviado con éxito! Te contactaré pronto."
        );
        contactForm.reset();
      } catch (error) {
        console.error("Error al enviar el formulario:", error);
        showFormStatus(
          "error",
          "Hubo un error al enviar el mensaje. Por favor, contáctame directamente por email."
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

  // Funcionalidad para copiar email al portapapeles
  const copyEmailBtn = document.getElementById("copy-email");
  const copyTooltip = document.getElementById("copy-tooltip");
  const contactEmail = document.getElementById("contact-email");

  if (copyEmailBtn && copyTooltip && contactEmail) {
    copyEmailBtn.addEventListener("click", function () {
      const email = contactEmail.textContent;

      navigator.clipboard
        .writeText(email)
        .then(() => {
          // Cambiar el icono a un check
          document.getElementById("copy-icon").innerHTML = `
                        <polyline points="20 6 9 17 4 12"></polyline>
                    `;

          // Actualizar el tooltip
          copyTooltip.textContent = "¡Copiado!";

          // Restaurar después de 2 segundos
          setTimeout(() => {
            document.getElementById("copy-icon").innerHTML = `
                            <rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect>
                            <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>
                        `;
            copyTooltip.textContent = "Copiar email";
          }, 2000);
        })
        .catch((err) => {
          console.error("Error al copiar el email:", err);
          copyTooltip.textContent = "Error al copiar";

          setTimeout(() => {
            copyTooltip.textContent = "Copiar email";
          }, 2000);
        });
    });
  }

  // Configuración GSAP para animaciones de entrada
  if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
    // Animaciones de entrada para elementos con clase 'animate-in'
    gsap.utils.toArray(".animate-in").forEach((element) => {
      // Determinar si es un elemento del principio (hero section)
      const isHeroSection = element.closest(".hero-section") !== null;

      if (isHeroSection) {
        // Animación desde el costado para elementos del hero
        gsap.fromTo(
          element,
          { x: -100, opacity: 0 }, // Empieza desde la izquierda
          {
            x: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: element,
              start: "top bottom-=100px",
              toggleActions: "play none none none",
            },
          }
        );
      } else {
        // Animación normal para el resto de elementos
        gsap.fromTo(
          element,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: element,
              start: "top bottom-=100px",
              toggleActions: "play none none none",
            },
          }
        );
      }
    });

    // Animación especial para títulos con efecto glitch
    gsap.fromTo(
      ".glitch-container",
      { x: -150, opacity: 0 }, // Desde la izquierda
      {
        x: 0,
        opacity: 1,
        duration: 1.5,
        ease: "elastic.out(1, 0.5)",
      }
    );

    // Animar el botón de tema con un ligero rebote
    gsap.fromTo(
      ".theme-toggle",
      { scale: 0, rotation: -180 },
      { scale: 1, rotation: 0, duration: 1, ease: "back.out(1.7)" }
    );

    // Animaciones con estilo hacker/programador
    // Efecto terminal escribiendo para textos (con loop inverso)
    function typeWriter(element, delay = 0) {
      const text = element.textContent;
      element.textContent = "";
      let i = 0;
      let isErasing = false;

      function animateText() {
        // Limpiar cualquier instancia previa
        gsap.killTweensOf({});

        if (!isErasing) {
          // Escribir el texto
          gsap.to(
            {},
            {
              duration: 0.05,
              repeat: text.length,
              delay: delay,
              onRepeat: () => {
                if (i < text.length) {
                  element.textContent += text.charAt(i);
                  i++;
                }
              },
              onComplete: () => {
                // Pausa antes de comenzar a borrar
                setTimeout(() => {
                  isErasing = true;
                  animateText();
                }, 2000);
              },
            }
          );
        } else {
          // Borrar el texto
          gsap.to(
            {},
            {
              duration: 0.08,
              repeat: text.length - 1,
              delay: 0.5,
              onRepeat: () => {
                if (i > 0) {
                  i--;
                  element.textContent = text.substring(0, i);
                }
              },
              onComplete: () => {
                // Pausa antes de comenzar a escribir de nuevo
                setTimeout(() => {
                  isErasing = false;
                  animateText();
                }, 1000);
              },
            }
          );
        }
      }

      // Comenzar la animación
      animateText();
    }

    // Animación para barras de progreso con estilo terminal
    function animateProgressBars() {
      const progressBars = document.querySelectorAll(".progress");

      progressBars.forEach((bar, index) => {
        const percentage = bar.getAttribute("data-percentage");
        const parent = bar.closest(".skill-item");
        const label = parent ? parent.querySelector(".skill-percentage") : null;

        if (percentage) {
          // Efecto pre-animación: caracteres aleatorios
          if (label) {
            const originalText = label.textContent;
            let counter = 0;

            gsap.to(
              {},
              {
                scrollTrigger: {
                  trigger: bar,
                  start: "top bottom-=100px",
                },
                duration: 0.05,
                repeat: 10,
                onRepeat: () => {
                  counter++;
                  const randomChars = "01".split("");
                  let randomString = "";
                  for (let i = 0; i < 3; i++) {
                    randomString +=
                      randomChars[
                        Math.floor(Math.random() * randomChars.length)
                      ];
                  }
                  label.textContent = randomString + "%";

                  if (counter >= 10) {
                    label.textContent = originalText;
                  }
                },
              }
            );
          }

          // Animación de llenado de barra con efecto escaneado
          gsap.to(bar, {
            width: percentage,
            scrollTrigger: {
              trigger: bar,
              start: "top bottom-=100px",
              toggleActions: "play none none reset",
            },
            duration: 1.5,
            ease: "steps(20)", // Efecto de pasos tipo terminal
            onComplete: function () {
              // Añadir efecto de escaneo después de completar
              bar.classList.add("terminal-scan");

              // Efecto de glitch al completar
              if (label) {
                gsap.to(label, {
                  keyframes: [
                    { x: -3, opacity: 0.8, duration: 0.1 },
                    { x: 3, opacity: 1, duration: 0.1 },
                    { x: 0, opacity: 1, duration: 0.1 },
                  ],
                  repeat: 2,
                  yoyo: true,
                });
              }
            },
          });
        }
      });
    }

    // Animación para títulos de sección con estilo hacker
    gsap.utils.toArray(".section-title").forEach((title) => {
      // Guardar texto original
      const originalText = title.textContent;

      // Animación de entrada con distorsión
      gsap.fromTo(
        title,
        { opacity: 0, x: -30 },
        {
          scrollTrigger: {
            trigger: title,
            start: "top bottom-=150",
            toggleActions: "play none none reset",
          },
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power2.out",
          onStart: function () {
            // Efecto de caracteres aleatorios
            let iteration = 0;
            const maxIterations = 10;

            const interval = setInterval(() => {
              let scrambledText = "";

              // Mezclar caracteres con símbolos de código
              for (let i = 0; i < originalText.length; i++) {
                if (iteration / maxIterations > i / originalText.length) {
                  scrambledText += originalText[i];
                } else {
                  scrambledText += "!@#$%^&*<>/\\"[
                    Math.floor(Math.random() * 14)
                  ];
                }
              }

              title.textContent = scrambledText;

              if (++iteration >= maxIterations) {
                clearInterval(interval);
                title.textContent = originalText;
              }
            }, 80);
          },
        }
      );
    });

    // Modificar la animación de las categorías de habilidades (línea ~348)
    gsap.utils.toArray(".skills-category").forEach((category, index) => {
      // Cambiar de gsap.from a gsap.to para evitar que desaparezcan
      gsap.fromTo(
        category,
        { opacity: 0, y: 20 }, // Estado inicial
        {
          scrollTrigger: {
            trigger: category,
            start: "top bottom-=50", // Disparar la animación antes
            toggleActions: "play none none none", // No resetear
          },
          opacity: 1,
          y: 0,
          duration: 0.7,
          delay: index * 0.15, // Reducir el retraso entre tarjetas
          ease: "power2.out",
          onStart: function () {
            // Efecto de línea de terminal apareciendo
            const categoryTitle = category.querySelector("h3");
            if (categoryTitle) {
              gsap.fromTo(
                categoryTitle,
                { opacity: 0 },
                {
                  opacity: 1,
                  duration: 0.4,
                  onComplete: function () {
                    // Simular comando de terminal
                    const originalText = categoryTitle.textContent;
                    categoryTitle.innerHTML =
                      '<span class="terminal-prompt">> </span>' + originalText;
                  },
                }
              );
            }
          },
        }
      );
    });

    // Iniciar animación de barras de progreso
    animateProgressBars();

    // Efecto de pantalla inicial (hero section)
    gsap.fromTo(
      ".glitch-container",
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1.2,
        onComplete: function () {
          const glitchTitle = document.querySelector(".glitch");
          const subtitle = document.querySelector(".glitch-subtitle");

          // Elimina esta parte para evitar conflictos
          // if (glitchTitle) {
          //   setInterval(() => {
          //     glitchTitle.classList.add("active-glitch");
          //     setTimeout(() => {
          //       glitchTitle.classList.remove("active-glitch");
          //     }, 200);
          //   }, 4000);
          // }

          // Efecto de terminal escribiendo para el subtítulo
          if (subtitle) {
            typeWriter(subtitle, 0.8);
          }

          // Activar la función aquí
          applyNameGlitch();
        },
      }
    );

    // Animar botón de tema con glitch
    gsap.fromTo(
      ".theme-toggle",
      { scale: 0, rotation: -90 },
      {
        scale: 1,
        rotation: 0,
        duration: 0.7,
        ease: "back.out(1.7)",
        onComplete: function () {
          // Añadir efecto de glitch ocasional
          const themeBtn = document.querySelector(".theme-toggle");
          if (themeBtn) {
            setInterval(() => {
              gsap.to(themeBtn, {
                keyframes: [
                  { x: -3, y: 2, duration: 0.1 },
                  { x: 2, y: -2, duration: 0.1 },
                  { x: 0, y: 0, duration: 0.1 },
                ],
              });
            }, 5000);
          }
        },
      }
    );

    // Animación para las tarjetas de experiencia en timeline
    // Esta función debe estar dentro del bloque donde inicializas GSAP
    // Seleccionar todas las tarjetas de timeline izquierda
    gsap.utils.toArray(".timeline-item.left").forEach((card) => {
      gsap.fromTo(
        card,
        {
          x: -100,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top bottom-=100px",
            toggleActions: "play none none reset",
            // markers: true, // Útil para depuración, quitar en producción
          },
        }
      );
    });

    // Seleccionar todas las tarjetas de timeline derecha
    gsap.utils.toArray(".timeline-item.right").forEach((card) => {
      gsap.fromTo(
        card,
        {
          x: 100,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top bottom-=100px",
            toggleActions: "play none none reset",
            // markers: true, // Útil para depuración, quitar en producciónz
          },
        }
      );
    });

    // Versión alternativa con animación secuencial
    // Todas las tarjetas de timeline
    gsap.utils.toArray(".timeline-item").forEach((card, i) => {
      const direction = card.classList.contains("left") ? -100 : 100;

      gsap.fromTo(
        card,
        {
          x: direction,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          delay: i * 0.2, // Retraso secuencial para efecto cascada
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top bottom-=100px",
            toggleActions: "play none none reset",
          },
        }
      );
    });
  }

  // Efecto glitch específico para el nombre Jafeth Gamboa
  function applyNameGlitch() {
    const nameElement = document.querySelector(".glitch"); // Asegúrate de que tu nombre tenga esta clase

    if (nameElement) {
      // Efecto de glitch más intenso y frecuente
      setInterval(() => {
        nameElement.classList.add("active-glitch");

        // Múltiples pulsos de glitch en secuencia
        setTimeout(() => {
          nameElement.classList.remove("active-glitch");
          setTimeout(() => {
            nameElement.classList.add("active-glitch");
            setTimeout(() => {
              nameElement.classList.remove("active-glitch");
              setTimeout(() => {
                nameElement.classList.add("active-glitch");
                setTimeout(() => {
                  nameElement.classList.remove("active-glitch");
                }, 100);
              }, 100);
            }, 50);
          }, 50);
        }, 200);
      }, 3000);
    }
  }

  // Llama a esta función al final de tus inicializaciones
  // applyNameGlitch();
});
