//Domcontentloaded es un evento que se dispara cuando el documento HTML ha sido completamente cargado
document.addEventListener("DOMContentLoaded", () => {
    //variable darkMode que obtiene el valor de la clave darkMode del localStorage para poder manetner el modo oscuro al navegar entre las páginas
    const darkMode = localStorage.getItem('darkMode');
    //Si la variable darkMode (obtenida del localStorage) es igual a true, se añade la clase dark al body, header y footer
    if (darkMode === 'true') {
        document.body.classList.add('dark');
        document.querySelector('header').classList.add('modo-oscuro');
        document.querySelector('footer').classList.add('modo-oscuro');
    }

    // document.body.classList.remove('dark'); //En una primera instancia removia el modo oscuro al recargar la página, pero lo comente ya que no es necesario. No lo borre por si se necesita en un futuro

    // MENU HAMBURGUESA
    //Se obtienen los elementos del DOM con las clases .burger y .nav-links mediante el método querySelector
    const hamburguesa = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');

    //Se añade un evento click al elemento hamburguesa, que al hacer click, añade o remueve la clase active a los elementos hamburguesa y navLinks
    hamburguesa.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburguesa.classList.toggle('active');
    });

    // DARK MODE
    //Se obtiene el elemento del DOM con la clase .switch mediante el método querySelector
    const toggle = document.querySelector('.switch input[type="checkbox"]');

    //Si la variable darkMode (obtenida del localStorage) es igual a true, se añade la clase dark al body y se marca el input checkbox  como checked
    if (darkMode === 'true') {
        document.body.classList.add('dark');
        toggle.checked = true;
    }

    //Se obtienen los elementos del DOM con las clases .sun, .moon, header y footer mediante el método querySelector
    const light = document.querySelector('.sun');
    const dark = document.querySelector('.moon');
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');

    //Se añade un evento change al elemento toggle, que al cambiar de estado, añade o remueve las clases dark y active a los elementos body, light, dark, header y footer, y guarda el estado del toggle en el localStorage
    toggle.addEventListener('change', () => {
        document.body.classList.toggle('dark');
        light.classList.toggle('active');
        dark.classList.toggle('active');
        header.classList.toggle('modo-oscuro');
        footer.classList.toggle('modo-oscuro');
        localStorage.setItem('darkMode', toggle.checked);
    });


    // VALIDACION FORMULARIO DE CONTACTO
    const formulario = document.querySelector('#contacto form');
    const nombreInput = document.querySelector('#nombre');
    const emailInput = document.querySelector('#email');
    const mensajeInput = document.querySelector('#mensaje');
    const submitButton = document.querySelector('#submitButton');

    submitButton.addEventListener('click', (e) => {
        e.preventDefault(); // Prevenir cualquier envío de formulario

        const nombre = nombreInput.value.trim();
        const email = emailInput.value.trim();
        const mensaje = mensajeInput.value.trim();

        //validacion de campos
        //Si el campo nombre está vacío, se muestra un mensaje de error y se enfoca en el campo nombre
        if (nombre === '') {
            Swal.fire({
                title: 'Error',
                text: 'Por favor, ingresa tu nombre',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
            nombreInput.focus();
            return;
        }

        //Si el campo email está vacío, se muestra un mensaje de error y se enfoca en el campo email, tambien verifica que la estructura del email sea correcta asegurandose que contenga un @ y un punto
        if (!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
            Swal.fire({
                title: 'Error',
                text: 'Por favor, ingresa un email válido',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
            emailInput.focus();
            return;
        }

        //Si el campo mensaje está vacío, se muestra un mensaje de error y se enfoca en el campo mensaje
        if (mensaje === '') {
            Swal.fire({
                title: 'Error',
                text: 'Por favor, ingresa un mensaje',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
            mensajeInput.focus();
            return;
        }

        //Si el campo mensaje tiene menos de 10 caracteres, se muestra un mensaje de error y se enfoca en el campo mensaje
        if (mensaje.length < 10) {
            Swal.fire({
                title: 'Error',
                text: 'Por favor, ingresa un mensaje más largo (mínimo 10 caracteres)',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
            mensajeInput.focus();
            return;
        }

        // Validación de reCAPTCHA
        const captchaResponse = grecaptcha.getResponse();
        if (!captchaResponse) {
            Swal.fire({
                title: 'Error',
                text: 'Por favor, completa el captcha',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
            return;
        }

        // Confirmación de mensaje enviado (solo simulado)
        Swal.fire({
            title: 'Gracias por tu mensaje!',
            text: 'Este es un mensaje de confirmación simulado. No se enviarán datos.',
            icon: 'success',
            confirmButtonText: 'Aceptar'
        }).then(() => {
            formulario.reset(); // Limpia el formulario después de la simulación
            grecaptcha.reset(); // Resetea el reCAPTCHA para que se pueda volver a completar
        });
    });




    //DESCARGAR CV
    //Se guarda en la variable botonCV el elemento del DOM con el id boton-cv mediante el método getElementById
    const botonCV = document.getElementById('boton-cv');

    //Se añade un evento click al elemento botonCV, que al hacer click, se crea un enlace con el archivo curriculum.pdf y se descarga el archivo
    botonCV.addEventListener('click', () => {
        const archivo = '../assets/curriculum.pdf';
        const nombreArchivo = 'curriculum.pdf';


        const enlace = document.createElement('a');
        //Se crea un enlace con el archivo curriculum.pdf 
        enlace.href = archivo;
        //Se añaden los atributos target, rel y download al enlace para que se abra en una nueva pestaña, se evite el phishing y se descargue el archivo
        enlace.target = '_blank';
        enlace.rel = 'noopener noreferrer';
        //Se descarga el archivo curriculum.pdf con el nombre curriculum.pdf
        enlace.download = nombreArchivo;
    });
});