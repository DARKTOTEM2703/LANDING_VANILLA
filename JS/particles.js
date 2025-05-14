// Juego interactivo con Canvas
document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("game-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  // Elementos de control del juego
  const startBtn = document.getElementById("start-game");
  const pauseBtn = document.getElementById("pause-game");
  const resetBtn = document.getElementById("reset-game");
  const scoreElement = document.getElementById("game-score");

  // Variables del juego
  let score = 0;
  let isPlaying = false;
  let animationId = null;
  let player = {
    x: canvas.width / 2,
    y: canvas.height - 50,
    size: 20,
    color:
      getComputedStyle(document.documentElement)
        .getPropertyValue("--primary-color")
        .trim() || "#0ae6b4",
  };
  let targets = [];

  // Configurar tamaño del canvas
  function resizeCanvas() {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    // Reiniciar posición del jugador
    player.x = canvas.width / 2;
    player.y = canvas.height - 50;
  }

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  // Manejar movimiento del mouse
  canvas.addEventListener("mousemove", function (e) {
    if (!isPlaying) return;

    const rect = canvas.getBoundingClientRect();
    player.x = e.clientX - rect.left;
  });

  // Dibujar jugador
  function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.beginPath();
    ctx.moveTo(player.x, player.y - player.size);
    ctx.lineTo(player.x + player.size, player.y + player.size);
    ctx.lineTo(player.x - player.size, player.y + player.size);
    ctx.closePath();
    ctx.fill();
  }

  // Crear objetivos
  function createTarget() {
    if (!isPlaying) return;

    const target = {
      x: Math.random() * (canvas.width - 30) + 15,
      y: -20,
      size: Math.random() * 10 + 10,
      color: `hsl(${Math.random() * 360}, 80%, 60%)`,
      speed: Math.random() * 2 + 1,
    };

    targets.push(target);

    // Programar la creación de otro objetivo
    if (isPlaying) {
      setTimeout(createTarget, Math.random() * 1000 + 500);
    }
  }

  // Dibujar objetivos
  function drawTargets() {
    targets.forEach((target) => {
      ctx.fillStyle = target.color;
      ctx.beginPath();
      ctx.arc(target.x, target.y, target.size, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  // Actualizar objetivos
  function updateTargets() {
    // Mover objetivos hacia abajo
    targets.forEach((target) => {
      target.y += target.speed;
    });

    // Verificar colisiones
    targets = targets.filter((target) => {
      // Verificar si el objetivo salió de la pantalla
      if (target.y > canvas.height + target.size) {
        return false;
      }

      // Verificar colisión con el jugador
      const dx = target.x - player.x;
      const dy = target.y - player.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < target.size + player.size) {
        // Colisión detectada
        score++;
        scoreElement.textContent = score;
        return false;
      }

      return true;
    });
  }

  // Loop principal del juego
  function gameLoop() {
    if (!isPlaying) return;

    // Limpiar canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Actualizar objetivos
    updateTargets();

    // Dibujar elementos
    drawPlayer();
    drawTargets();

    // Continuar el loop
    animationId = requestAnimationFrame(gameLoop);
  }

  // Iniciar juego
  function startGame() {
    if (isPlaying) return;

    isPlaying = true;
    score = 0;
    scoreElement.textContent = score;
    targets = [];

    // Actualizar botones
    startBtn.style.display = "none";
    pauseBtn.style.display = "flex";

    // Crear objetivos iniciales
    createTarget();

    // Iniciar loop del juego
    gameLoop();
  }

  // Pausar juego
  function pauseGame() {
    isPlaying = false;

    if (animationId) {
      cancelAnimationFrame(animationId);
      animationId = null;
    }

    // Actualizar botones
    startBtn.style.display = "flex";
    pauseBtn.style.display = "none";
  }

  // Reiniciar juego
  function resetGame() {
    pauseGame();

    score = 0;
    scoreElement.textContent = score;
    targets = [];

    player.x = canvas.width / 2;
    player.y = canvas.height - 50;

    // Redibujar el canvas limpio
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();
  }

  // Eventos de los botones
  if (startBtn) {
    startBtn.addEventListener("click", startGame);
  }

  if (pauseBtn) {
    pauseBtn.addEventListener("click", pauseGame);
  }

  if (resetBtn) {
    resetBtn.addEventListener("click", resetGame);
  }

  // Dibujar el estado inicial
  drawPlayer();
});

document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("particles-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");

  // Obtener colores del tema actual
  const primaryColor =
    getComputedStyle(document.documentElement)
      .getPropertyValue("--primary-color")
      .trim() || "#0ae6b4";

  // Configurar tamaño del canvas
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  // Configuración de partículas
  const particlesArray = [];
  const numberOfParticles = 100;

  // Clase Partícula
  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 3 + 1;
      this.speedX = Math.random() * 1 - 0.5;
      this.speedY = Math.random() * 1 - 0.5;
      this.color = primaryColor;
      this.alpha = Math.random() * 0.6 + 0.1;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      // Rebote en los límites del canvas
      if (this.x > canvas.width || this.x < 0) {
        this.speedX = -this.speedX;
      }

      if (this.y > canvas.height || this.y < 0) {
        this.speedY = -this.speedY;
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.globalAlpha = this.alpha;
      ctx.fill();
      ctx.globalAlpha = 1;
    }
  }

  // Inicializar partículas
  function init() {
    particlesArray.length = 0;
    for (let i = 0; i < numberOfParticles; i++) {
      particlesArray.push(new Particle());
    }
  }

  // Conectar partículas cercanas con líneas
  function connect() {
    const maxDistance = 150;
    for (let a = 0; a < particlesArray.length; a++) {
      for (let b = a; b < particlesArray.length; b++) {
        const dx = particlesArray[a].x - particlesArray[b].x;
        const dy = particlesArray[a].y - particlesArray[b].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < maxDistance) {
          ctx.beginPath();
          ctx.strokeStyle = particlesArray[a].color;
          ctx.globalAlpha = 0.1 * (1 - distance / maxDistance);
          ctx.lineWidth = 0.8;
          ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
          ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
      }
    }
  }

  // Función de animación
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particlesArray.length; i++) {
      particlesArray[i].update();
      particlesArray[i].draw();
    }

    connect();
    requestAnimationFrame(animate);
  }

  init();
  animate();

  // Actualizar colores cuando cambia el tema
  document.addEventListener("themeChanged", function () {
    const newPrimaryColor = getComputedStyle(document.documentElement)
      .getPropertyValue("--primary-color")
      .trim();

    for (let i = 0; i < particlesArray.length; i++) {
      particlesArray[i].color = newPrimaryColor;
    }
  });
});
