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
        })
        .catch(err => console.error('Error loading page:', err));
}

