// assets/js/switchLanguage.js

let translations = {};
let currentLanguage = localStorage.getItem('language') || 'fr';

export async function initLanguage() {
    await loadTranslations(currentLanguage);
}

async function loadTranslations(lang) {
    try {
        const response = await fetch(`assets/translations/${lang}.json`);
        if (!response.ok) {
            throw new Error(`Erreur lors du chargement de ${lang}.json`);
        }
        translations = await response.json();
        currentLanguage = lang;
        localStorage.setItem('language', lang);
        console.log(`Langue chargée : ${lang}`);
    } catch (error) {
        console.error('Erreur de chargement des traductions:', error);
        if (lang !== 'fr') {
            await loadTranslations('fr');
        }
    }
}

export async function setLanguage(lang) {
    if (lang !== currentLanguage) {
        await loadTranslations(lang);
        window.location.reload();
    }
}

export function getTranslation(key) {
    const keys = key.split('.');
    let result = translations;
    
    for (const k of keys) {
        if (result && result[k]) {
            result = result[k];
        } else {
            console.warn(`Traduction manquante pour la clé: ${key}`);
            return key;
        }
    }
    
    return result;
}

export function getCurrentLanguage() {
    return currentLanguage;
}

export function applyTranslations() {
    const elements = document.querySelectorAll('[data-i18n]');
    
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        const translation = getTranslation(key);
        
        if (element.placeholder !== undefined) {
            element.placeholder = translation;
        } else {
            element.textContent = translation;
        }
    });
}

export function updateLanguageButton() {
    const langButton = document.getElementById('language-toggle');
    if (langButton) {
        langButton.textContent = currentLanguage === 'fr' ? '🇬🇧 EN' : '🇫🇷 FR';
    }
}