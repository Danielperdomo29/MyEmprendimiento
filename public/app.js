// Variables
// --- Control de visibilidad del header según scroll ---
let lastScroll = 0;
const header = document.getElementById("main-header");

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (!header) return; // Si no se encuentra el header, salimos

  if (currentScroll <= 0) {
    // Al estar en el top, mostramos el header
    header.style.transform = "translateY(0)";
    return;
  }

  if (currentScroll > lastScroll) {
    // Scroll hacia abajo - ocultar
    header.style.transform = "translateY(-100%)";
  } else {
    // Scroll hacia arriba - mostrar
    header.style.transform = "translateY(0)";
  }

  lastScroll = currentScroll;
});
