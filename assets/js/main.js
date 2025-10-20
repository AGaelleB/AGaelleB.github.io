// assets/js/main.js

import { initializeApp, setupNavigation } from './home.js';
import { loadProjectPage } from './projects.js';
import { initLanguage, setLanguage, getCurrentLanguage, updateLanguageButton } from './switchLanguage.js';
// import { initThemeSystem } from './theme.js';

document.addEventListener('DOMContentLoaded', main);

async function main() {
    const content = document.getElementById('content');
    const links = document.querySelectorAll('.nav-link');
    
    await initLanguage();
    
    updateLanguageButton();
    // initThemeSystem();
    initializeApp(content);
    setupNavigation(links, content);
    loadProjectPage(content);
    setupLanguageToggle();
}

function setupLanguageToggle() {
    const langButton = document.getElementById('language-toggle');
    if (langButton) {
        langButton.addEventListener('click', async (e) => {
            e.preventDefault();
            const currentLang = getCurrentLanguage();
            const newLang = currentLang === 'fr' ? 'en' : 'fr';
            await setLanguage(newLang);
        });
    }
}