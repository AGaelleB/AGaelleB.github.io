// assets/js/main.js

import { initializeApp, setupNavigation } from './home.js';
import { loadProjectPage } from './projects.js';
import { initThemeSystem } from './theme.js';

document.addEventListener('DOMContentLoaded', main);

function main() {
    const content = document.getElementById('content');
    const links = document.querySelectorAll('.nav-link');
    
    initThemeSystem();
    initializeApp(content);
    setupNavigation(links, content);
    loadProjectPage(content);
}
