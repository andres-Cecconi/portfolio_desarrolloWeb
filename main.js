document.addEventListener("DOMContentLoaded", () => {
    const darkMode = localStorage.getItem('darkMode');

    if (darkMode === 'true') {
        document.body.classList.add('dark');
        document.querySelector('header').classList.add('modo-oscuro');
        document.querySelector('footer').classList.add('modo-oscuro');
    }

    document.body.classList.remove('dark'); // Restablece el modo claro
    // MENU HAMBURGUESA
    const hamburguesa = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');

    hamburguesa.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburguesa.classList.toggle('active');
    });

    // DARK MODE
    const toggle = document.querySelector('.switch input[type="checkbox"]');

    if (darkMode === 'true') {
        document.body.classList.add('dark');
        toggle.checked = true;
    }

    const light = document.querySelector('.sun');
    const dark = document.querySelector('.moon');
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');
    const logo = document.querySelector('.logo img');

    toggle.addEventListener('change', () => {
        document.body.classList.toggle('dark');
        light.classList.toggle('active');
        dark.classList.toggle('active');
        header.classList.toggle('modo-oscuro');
        footer.classList.toggle('modo-oscuro');
        if (toggle.checked) {
            logo.src = '../assets/logo-no-bg.png';
        } else {
            logo.src = '../assets/logo-no-bg.png';//cambiar logos cuando los tenga (un logo para modo light y otro para modo dark)
        }
        localStorage.setItem('darkMode', toggle.checked);
    });

    const formulario = document.querySelector('#contacto form');
    const nombreInput = document.querySelector('#nombre');
    const emailInput = document.querySelector('#email');
    const mensajeInput = document.querySelector('#mensaje');

    formulario.addEventListener('submit', (e) => {
        e.preventDefault();

        const nombre = nombreInput.value.trim();
        const email = emailInput.value.trim();
        const mensaje = mensajeInput.value.trim();

        if (nombre === '') {
            alert('Por favor, ingresa tu nombre');
            nombreInput.focus();
            return;
        }

        if (!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
            alert('Por favor, ingresa un email válido');
            emailInput.focus();
            return;
        }

        if (mensaje === '') {
            alert('Por favor, ingresa un mensaje');
            mensajeInput.focus();
            return;
        }

        if (mensaje.length < 10) {
            alert('Por favor, ingresa un mensaje más largo (mínimo 10 caracteres)');
            mensajeInput.focus();
            return;
        }

        // Si todo está bien, envía el formulario
        alert('Formulario enviado correctamente');
        formulario.reset();
    });
});