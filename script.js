// =============== VARIABLES ===============
const header = document.getElementById('header');
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');
const navLinks = document.querySelectorAll('.nav__link');
const scrollTop = document.getElementById('scroll-top');
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

// =============== MENU MÓVIL ===============
if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => { navMenu.classList.add('show-menu'); });
}

if (navClose && navMenu) {
    navClose.addEventListener('click', () => { navMenu.classList.remove('show-menu'); });
}

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu) navMenu.classList.remove('show-menu');
    });
});

// =============== HEADER SCROLL ===============
window.addEventListener('scroll', () => {
    if (header) {
        if (window.scrollY >= 80) header.classList.add('scroll-header');
        else header.classList.remove('scroll-header');
    }
    
    if (scrollTop) {
        if (window.scrollY >= 560) scrollTop.classList.add('show');
        else scrollTop.classList.remove('show');
    }
});

// =============== SCROLL TO TOP ===============
if (scrollTop) {
    scrollTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ... (El resto de tus funciones como ANIMACIONES, CONTADOR, FORMULARIO, etc., deben llevar el mismo formato "if (elemento) { ... }")
// Aplica la misma lógica para contactForm, themeButton, etc.
