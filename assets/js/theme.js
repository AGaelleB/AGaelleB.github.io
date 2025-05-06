// assets/js/theme.js

// Fonction pour initialiser le système de thème
export function initThemeSystem() {
    // Vérifier si AOS est chargé, sinon le charger
    if (typeof AOS === 'undefined') {
        loadAOS();
    } else {
        setupThemeToggle();
    }
}

// Fonction pour charger dynamiquement AOS (si nécessaire)
function loadAOS() {
    // Charger le CSS d'AOS
    const aosCSS = document.createElement('link');
    aosCSS.rel = 'stylesheet';
    aosCSS.href = 'https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.css';
    document.head.appendChild(aosCSS);

    // Charger le JS d'AOS
    const aosScript = document.createElement('script');
    aosScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.js';
    aosScript.onload = () => {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: false
        });
        setupThemeToggle();
    };
    document.head.appendChild(aosScript);
}

// Fonction pour configurer le commutateur de thème
function setupThemeToggle() {
    const toggleSwitch = document.querySelector('#checkbox');
    const currentTheme = localStorage.getItem('theme') || 'light';

    // Appliquer le thème sauvegardé
    if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        toggleSwitch.checked = true;
        addDarkClassToElements();
    }

    // Événement de changement pour le commutateur
    toggleSwitch.addEventListener('change', switchTheme);
}

// Fonction pour changer de thème
function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        addDarkClassToElements();
        animateThemeChange();
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        removeDarkClassFromElements();
        animateThemeChange();
    }
}

// Ajouter la classe 'dark' aux éléments appropriés
function addDarkClassToElements() {
    const elementsToChange = document.querySelectorAll('.content-section, .home, .carousel-item, section, footer, .hero-section');
    elementsToChange.forEach(element => {
        element.classList.add('dark-mode');
        element.setAttribute('data-aos', 'theme-transition');
    });
}

// Supprimer la classe 'dark' des éléments
function removeDarkClassFromElements() {
    const elementsToChange = document.querySelectorAll('.content-section, .home, .carousel-item, section, footer, .hero-section');
    elementsToChange.forEach(element => {
        element.classList.remove('dark-mode');
        element.setAttribute('data-aos', 'theme-transition');
    });
}

// Animer le changement de thème
function animateThemeChange() {
    if (typeof AOS !== 'undefined') {
        // Actualiser les animations AOS
        setTimeout(() => {
            AOS.refresh();
        }, 100);
    }
}

// Appliquer le thème après chargement d'une nouvelle page
export function applyThemeToLoadedPage() {
    const currentTheme = localStorage.getItem('theme') || 'light';
    if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        addDarkClassToElements();
    }
    
    // Réappliquer AOS aux nouveaux éléments
    if (typeof AOS !== 'undefined') {
        setTimeout(() => {
            AOS.refresh();
        }, 100);
    }
}
