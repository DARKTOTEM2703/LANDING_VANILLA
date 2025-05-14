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
      color: `hsl(${Math.random() * 360}, 100%, 50%)`,
    };
  }
});
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
      color: `hsl(${Math.random() * 360}, 100%, 50%)`,
    };
    targets.push(target);
  }
});
