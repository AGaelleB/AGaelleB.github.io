// assets/js/home.js

import { applyThemeToLoadedPage } from "./theme.js";


export function initializeApp(contentElement) {
    loadPage('home', contentElement);
}

export function setupNavigation(navigationLinks, contentElement) {
    navigationLinks.forEach(link => {
        link.addEventListener('click', event => {
            event.preventDefault();
            const page = event.target.getAttribute('href');
            loadPage(page, contentElement);
        });
    });
}

function loadPage(page, contentElement) {
    fetch(`templates/${page}.html`)
        .then(response => response.text())
        .then(html => {
            contentElement.innerHTML = html;
            
            setTimeout(() => {
                setupFadeInOnScroll();
                const welcomeTitle = document.getElementById('welcome-title');
                if (welcomeTitle) {
                    initTypewriter();
                }

                const heroSection = document.querySelector('.hero-section');
                if (heroSection && typeof particlesJS !== 'undefined') {
                    initParticlesBackground();
                }

                applyThemeToLoadedPage();
            }, 100);
        })
        .catch(err => console.error('Error loading page:', err));
}


export function initTypewriter() {
    const welcomeTitle = document.getElementById('welcome-title');
    const welcomeSubtitle = document.getElementById('welcome-subtitle');
    const welcomeImage = document.querySelector('.hex-container');

    if (!welcomeTitle || !welcomeSubtitle) { // || !welcomeImage) {
        console.error("Les éléments 'welcome-title', 'welcome-subtitle' ou l'image sont introuvables.");
        return;
    }

    const titleText = "Bienvenue";
    const subtitleText = "Reconvertie et diplômée de l'École 42, je suis passionnée par le développement web,\nà la recherche d'un stage ou d'un poste junior!";

    let titleIndex = 0;
    let subtitleIndex = 0;

    // Vider les éléments au cas où
    welcomeTitle.textContent = '';
    welcomeSubtitle.textContent = '';
    
    // Effet de frappe pour le titre
    function typeWriterTitle() {
        if (titleIndex < titleText.length) {
            welcomeTitle.textContent += titleText.charAt(titleIndex);
            titleIndex++;
            setTimeout(typeWriterTitle, 70); // Vitesse
        }
        else
            setTimeout(typeWriterSubtitle, 500);
    }

    // Effet de frappe pour le sous-titre
    function typeWriterSubtitle() {
        if (subtitleIndex < subtitleText.length) {
            welcomeSubtitle.textContent += subtitleText.charAt(subtitleIndex);
            subtitleIndex++;
            setTimeout(typeWriterSubtitle, 30); // Vitesse
        }
    }
    typeWriterTitle();
}

export function setupFadeInOnScroll() {
    const observer = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible'); // Ajoute la classe pour l'effet
                    observer.unobserve(entry.target); // Stoppe l'observation après l'animation
                }
            });
        },
        {
            threshold: 0.1, // Déclenche lorsque 10% de l'élément sont visibles
        }
    );

    // Ciblez tous les éléments avec la classe fade-in
    const elements = document.querySelectorAll('.fade-in');
    elements.forEach(element => observer.observe(element));
}


function initParticlesBackground() {
    particlesJS('particles-js', {
        "particles": {
            "number": {
                "value": 120,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#ffffff"
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 5
                }
            },
            "opacity": {
                "value": 0.5,
                "random": true,
                "anim": {
                    "enable": true,
                    "speed": 1,
                    "opacity_min": 0,
                    "sync": false
                }
            },
            "size": {
                "value": 3,
                "random": true,
                "anim": {
                    "enable": false,
                    "speed": 4,
                    "size_min": 0.3,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": false,
                "distance": 150,
                "color": "#ffffff",
                "opacity": 0.4,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 1,
                "direction": "none",
                "random": true,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 600
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "bubble"
                },
                "onclick": {
                    "enable": true,
                    "mode": "repulse"
                },
                "resize": true
            },
            "modes": {
                "bubble": {
                    "distance": 250,
                    "size": 0,
                    "duration": 2,
                    "opacity": 0,
                    "speed": 3
                },
                "repulse": {
                    "distance": 400,
                    "duration": 0.4
                }
            }
        },
        "retina_detect": true
    });
}
