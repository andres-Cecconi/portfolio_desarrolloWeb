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


    // FORMULARIO DE CONTACTO
    //Se obtienen los elementos del DOM con las clases #contacto, #nombre, #email y #mensaje mediante el método querySelector
    const formulario = document.querySelector('#contacto form');
    const nombreInput = document.querySelector('#nombre');
    const emailInput = document.querySelector('#email');
    const mensajeInput = document.querySelector('#mensaje');

    //Se añade un evento submit al formulario, que al enviar el formulario, previene el comportamiento por defecto, y se obtienen los valores de los campos nombre, email y mensaje, se validan los campos y se muestra un mensaje de error si no se cumple con las validaciones
    formulario.addEventListener('submit', (e) => {
        e.preventDefault();

        //Se obtienen los valores de los campos nombre, email y mensaje, se eliminan los espacios en blanco al inicio y al final de cada valor
        const nombre = nombreInput.value.trim();
        const email = emailInput.value.trim();
        const mensaje = mensajeInput.value.trim();

        //Se validan los campos y se muestra un mensaje de error si no se cumple con las validaciones mediante la librería SweetAlert2
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

        //Se valida que el campo nombre tenga la estructura basica de un mail mediante una expresión regular 
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

        //Validacion del campo mensaje, si el campo mensaje está vacío, se muestra un mensaje de error
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

        //Se valida el captcha
        const captchaResponse = grecaptcha.getResponse();
        const secretKey = '6LezU3oqAAAAAO9ysCE2-bAb1KcmELGxn9VOUb9J';

        fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${captchaResponse}`)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Si el captcha es válido, se envía el formulario
                    Swal.fire({
                        title: 'Gracias por tu mensaje! Te respondere a la brevedad',
                        text: 'Tu mensaje ha sido enviado con éxito',
                        icon: 'success',
                        confirmButtonText: 'Aceptar'
                    });
                    formulario.reset();
                } else {
                    // Si el captcha no es válido, se muestra un mensaje de error
                    Swal.fire({
                        title: 'Error',
                        text: 'Por favor, completa el captcha',
                        icon: 'error',
                        confirmButtonText: 'Aceptar'
                    });
                    return;
                }
            })
            .catch(error => {
                console.error(error);
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