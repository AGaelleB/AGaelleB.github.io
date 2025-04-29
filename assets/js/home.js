// assets/js/home.js

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
            
            // effet typewriter 
            if (page === 'home') {
                setTimeout(() => {
                    initTypewriter();
                }, 100);
            }
        })
        .catch(err => console.error('Error loading page:', err));
}

export function initTypewriter() {
    const welcomeTitle = document.getElementById('welcome-title');
    const welcomeSubtitle = document.getElementById('welcome-subtitle');
    const titleText = "Bienvenue dans mon Portfolio";
    const subtitleText = "Découvrez mes projets réalisés lors de ma formation à l'École 42 et plus encore !";
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
            setTimeout(typeWriterTitle, 80); // Vitesse
        }
        else {
            setTimeout(typeWriterSubtitle, 500);
        }
    }
    
    // Effet de frappe pour le sous-titre
    function typeWriterSubtitle() {
        if (subtitleIndex < subtitleText.length) {
            welcomeSubtitle.textContent += subtitleText.charAt(subtitleIndex);
            subtitleIndex++;
            setTimeout(typeWriterSubtitle, 42); // Vitesse
        }
    }
    
    typeWriterTitle();

}

