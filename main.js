const hamburguesa = document.querySelector('.hamburguesa');
const navLinks = document.querySelector('.nav-links');

hamburguesa.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});
