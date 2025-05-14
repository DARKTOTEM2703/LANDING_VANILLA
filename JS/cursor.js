document.addEventListener("DOMContentLoaded", function () {
  const cursor = document.querySelector(".custom-cursor");
  const cursorDot = document.querySelector(".cursor-dot");
  const interactiveElements = document.querySelectorAll(".interactive");

  if (!cursor || !cursorDot) return;

  // Actualizar posición del cursor en movimiento
  document.addEventListener("mousemove", function (e) {
    // Si GSAP está disponible, usar animaciones suaves
    if (typeof gsap !== "undefined") {
      gsap.to(cursor, {
        duration: 0.3,
        left: e.clientX,
        top: e.clientY,
        ease: "power2.out",
      });

      gsap.to(cursorDot, {
        duration: 0.1,
        left: e.clientX,
        top: e.clientY,
        ease: "none",
      });
    } else {
      // Fallback si GSAP no está disponible
      cursor.style.left = e.clientX + "px";
      cursor.style.top = e.clientY + "px";

      cursorDot.style.left = e.clientX + "px";
      cursorDot.style.top = e.clientY + "px";
    }
  });

  // Efecto para elementos interactivos
  interactiveElements.forEach((el) => {
    el.addEventListener("mouseenter", function () {
      cursor.classList.add("cursor-active");
      cursorDot.classList.add("dot-active");
    });

    el.addEventListener("mouseleave", function () {
      cursor.classList.remove("cursor-active");
      cursorDot.classList.remove("dot-active");
    });
  });

  // Ocultar cursor cuando sale de la ventana
  document.addEventListener("mouseout", function (e) {
    if (e.relatedTarget === null) {
      cursor.style.display = "none";
      cursorDot.style.display = "none";
    }
  });

  // Mostrar cursor cuando vuelve a la ventana
  document.addEventListener("mouseover", function () {
    cursor.style.display = "block";
    cursorDot.style.display = "block";
  });

  // Efectos de clic
  document.addEventListener("mousedown", function () {
    cursor.style.transform = "translate(-50%, -50%) scale(0.8)";
    cursorDot.style.transform = "translate(-50%, -50%) scale(0.8)";
  });

  document.addEventListener("mouseup", function () {
    cursor.style.transform = "translate(-50%, -50%) scale(1)";
    cursorDot.style.transform = "translate(-50%, -50%) scale(1)";
  });
});
