// main.js

// JavaScript to handle dynamic content loading
document.addEventListener('DOMContentLoaded', () => {
    const content = document.getElementById('content');
    const links = document.querySelectorAll('.nav-link');

    // Function to load page content
    function loadPage(page) {
        fetch(`templates/${page}.html`)
            .then(response => response.text())
            .then(html => {
                content.innerHTML = html;
            })
            .catch(err => console.error('Error loading page:', err));
    }

    // Set initial page to "accueil"
    loadPage('home');

    // Handle navigation
    links.forEach(link => {
        link.addEventListener('click', event => {
            event.preventDefault();
            const page = event.target.getAttribute('href');
            loadPage(page);
        });
    });
});

// document.querySelectorAll('.lang-btn').forEach(button => {
//     button.addEventListener('click', () => {
//         const selectedLang = button.getAttribute('data-lang');
        
//         document.querySelectorAll('[data-lang]').forEach(element => {
//             if (element.getAttribute('data-lang') === selectedLang) {
//                 element.classList.add('lang-active');
//             } else {
//                 element.classList.remove('lang-active');
//             }
//         });
//     });
// });
