document.addEventListener('DOMContentLoaded', () => {
    const langFR = document.getElementById('lang-fr');
    const langEN = document.getElementById('lang-en');
    // Sélectionne tous les éléments qui ont au moins une traduction FR (et donc EN)
    const elementsToTranslate = document.querySelectorAll('[data-lang-fr]');

    // Fonction pour basculer la langue
    const setLanguage = (lang) => {
        const langAttr = `data-lang-${lang}`;
        
        // 1. Traduire les éléments de la page
        elementsToTranslate.forEach(el => {
            if (el.hasAttribute(langAttr)) {
                // Pour les éléments simples, on remplace le contenu textuel
                if (el.tagName !== 'SPAN') {
                    el.textContent = el.getAttribute(langAttr);
                } else {
                    // Pour les SPAN (comme dans les diplômes), on remplace le contenu sans affecter les balises internes
                    el.innerText = el.getAttribute(langAttr);
                }
            }
        });

        // 2. Traduire le titre de la page (dans l'onglet du navigateur)
        const titleElement = document.querySelector('title');
        if (titleElement && titleElement.hasAttribute(langAttr)) {
            titleElement.textContent = titleElement.getAttribute(langAttr);
        }

        // 3. Mettre à jour la classe active sur les boutons
        langFR.classList.remove('active');
        langEN.classList.remove('active');
        if (lang === 'fr') {
            langFR.classList.add('active');
            document.documentElement.lang = 'fr';
        } else {
            langEN.classList.add('active');
            document.documentElement.lang = 'en';
        }

        // 4. Stocker la préférence de langue pour la prochaine visite
        localStorage.setItem('portfolioLang', lang);
    };

    // Écouteurs d'événements pour les boutons
    if (langFR && langEN) {
        langFR.addEventListener('click', () => setLanguage('fr'));
        langEN.addEventListener('click', () => setLanguage('en'));
    }

    // Charger la langue préférée au démarrage (ou français par défaut)
    const preferredLang = localStorage.getItem('portfolioLang') || 'fr';
    setLanguage(preferredLang);
});