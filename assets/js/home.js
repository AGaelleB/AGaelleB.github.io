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
                applyThemeToLoadedPage();
            }, 100);
        })
        .catch(err => console.error('Error loading page:', err));
}


export function initTypewriter() {
    const welcomeTitle = document.getElementById('welcome-title');
    const welcomeSubtitle = document.getElementById('welcome-subtitle');
    const welcomeImage = document.querySelector('.hex-container');

    if (!welcomeTitle || !welcomeSubtitle || !welcomeImage) {
        console.error("Les éléments 'welcome-title', 'welcome-subtitle' ou l'image sont introuvables.");
        return;
    }

    const titleText = "Bienvenue";
    const subtitleText = "Découvrez mes projets réalisés lors de ma formation à l'École 42 et plus encore !";
    let titleIndex = 0;
    let subtitleIndex = 0;

    // Vider les éléments au cas où
    welcomeTitle.textContent = '';
    welcomeSubtitle.textContent = '';
    
    // Cacher l'image hexagonale au démarrage
    // welcomeImage.style.opacity = '0';
    // welcomeImage.style.transition = 'opacity 1s ease-in-out';

    // Effet de frappe pour le titre
    function typeWriterTitle() {
        if (titleIndex < titleText.length) {
            welcomeTitle.textContent += titleText.charAt(titleIndex);
            titleIndex++;
            setTimeout(typeWriterTitle, 70); // Vitesse
        } else {
            setTimeout(typeWriterSubtitle, 500);
        }
    }

    // Effet de frappe pour le sous-titre
    function typeWriterSubtitle() {
        if (subtitleIndex < subtitleText.length) {
            welcomeSubtitle.textContent += subtitleText.charAt(subtitleIndex);
            subtitleIndex++;
            setTimeout(typeWriterSubtitle, 35); // Vitesse
        } else {
            // Afficher l'image après l'animation du sous-titre
            setTimeout(() => {
                welcomeImage.style.opacity = '1';
            }, 300);
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
