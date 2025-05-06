// assets/js/projects.js

export function initProjects() {
    // Initialise les animations AOS
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: false, // animations se répètent si on scrolle à nouveau
        mirror: false
      });
    }
  }
  
  export function loadProjectPage(contentElement) {
    // Charge le contenu HTML de la page projets
    fetch('templates/home.html')
      .then(response => response.text())
      .then(html => {
        contentElement.innerHTML = html;
        initProjects();
      })
      .catch(err => console.error('Error loading projects page:', err));
  }