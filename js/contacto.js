document.getElementById('contact-form').addEventListener('submit', function (e) {
    e.preventDefault(); // Previene envío real

    // Guardar mensaje en LocalStorage para mostrarlo en index.html
    localStorage.setItem('contactMessage', 'Mensaje enviado con éxito');

    // Redirigir a index.html (en la misma ventana o nueva)
    window.location.href = 'index.html';
});