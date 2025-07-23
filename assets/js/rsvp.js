document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("rsvpForm");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const codigo = document.getElementById("securityCode").value.trim();
    const mensaje = document.getElementById("rsvpMessage");

    if (!codigo) {
      mensaje.textContent = "Por favor, ingresa un código válido.";
      return;
    }

    // Redirige a confirmacion.html con el código como parámetro
    window.location.href = `confirmation.html?codigo=${encodeURIComponent(codigo)}`;
  });
});