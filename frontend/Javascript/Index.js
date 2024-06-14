document.addEventListener('DOMContentLoaded', function() {
    // Selecciona el formulario
    const form = document.querySelector('form');
    const emailInput = document.getElementById('txtEmail');
    const passwordInput = document.getElementById('txtPassword');
    const submitButton = form.querySelector('input[type="button"]');

    // Función de validación del correo electrónico
    function isValidEmail(email) {
        const emailPattern = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;
        return emailPattern.test(email);
    }

    // Evento de clic en el botón de aceptar
    submitButton.addEventListener('click', function(event) {
        const email = emailInput.value;
        const password = passwordInput.value;

        // Validación del correo electrónico
        if (!isValidEmail(email)) {
            alert('Por favor, ingrese un correo electrónico válido.');
            return;
        }

        // Validación de la contraseña
        if (password.trim() === '') {
            alert('Por favor, ingrese una contraseña.');
            return;
        }

        // Si ambas validaciones pasan, redirigir a otra página
        alert('Formulario validado exitosamente. Redirigiendo...');
        window.location.href = '1Menu.html'; // Reemplaza 'Menu.html' con la URL de la página a la que deseas redirigir
    });
});
