document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const themeFilterSelect = document.getElementById('themeFilter'); // Renommé pour clarté
    const appCards = document.querySelectorAll('.app-grid .app-card');
    const sidebarThemeLinks = document.querySelectorAll('.sidebar .theme-list a'); // Nouveaux éléments
    const sidebarThemeCounts = document.querySelectorAll('.sidebar .theme-list .theme-count'); // Nouveaux éléments

    function filterApps() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        const selectedTheme = themeFilterSelect.value; // Thème sélectionné dans le <select>

        let visibleAppCount = 0; // Compteur pour les applications visibles
        const themeVisibilityCounts = {}; // Compteur par thème visible

        // Initialiser les compteurs de thèmes à zéro
        sidebarThemeLinks.forEach(link => {
            const themeSlug = link.dataset.theme;
            if (themeSlug) {
                themeVisibilityCounts[themeSlug] = 0;
            }
        });

        appCards.forEach(card => {
            const title = card.querySelector('h2').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();
            const cardThemeElement = card.querySelector('.app-theme');
            const cardThemeText = cardThemeElement ? cardThemeElement.textContent.toLowerCase() : ''; // Récupère le thème affiché

            // Assurez-vous que le slug du thème de la carte correspond au format du slug du filtre
            const cardThemeSlug = cardThemeText.replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

            const matchesSearch = title.includes(searchTerm) || description.includes(searchTerm);
            const matchesTheme = (selectedTheme === 'all' || cardThemeSlug === selectedTheme);

            if (matchesSearch && matchesTheme) {
                card.style.display = ''; // Affiche la carte
                visibleAppCount++;

                // Incrémenter le compteur du thème si la carte est visible
                if (cardThemeSlug) {
                    themeVisibilityCounts[cardThemeSlug] = (themeVisibilityCounts[cardThemeSlug] || 0) + 1;
                }
            } else {
                card.style.display = 'none'; // Cache la carte
            }
        });

        // Mettre à jour les compteurs dans la sidebar
        sidebarThemeLinks.forEach(link => {
            const themeSlug = link.dataset.theme;
            const countElement = link.querySelector('.theme-count');
            if (countElement) {
                if (themeSlug === 'all') {
                    countElement.textContent = visibleAppCount; // Compteur total pour "Toutes les applications"
                } else {
                    countElement.textContent = themeVisibilityCounts[themeSlug] || 0;
                }
            }
        });

        updateSidebarActiveState(selectedTheme); // Mettre à jour l'état actif de la sidebar
    }

    // Fonction pour mettre à jour l'état actif des liens de la sidebar
    function updateSidebarActiveState(activeThemeSlug) {
        sidebarThemeLinks.forEach(link => {
            link.closest('li').classList.remove('active'); // Retire la classe 'active' de tous les <li>
            if (link.dataset.theme === activeThemeSlug) {
                link.closest('li').classList.add('active'); // Ajoute la classe 'active' au <li> du thème sélectionné
            }
        });
    }

    // Écoute les événements de saisie et de changement pour la barre de recherche et le sélecteur
    searchInput.addEventListener('keyup', filterApps);
    themeFilterSelect.addEventListener('change', function() {
        // Quand le <select> change, mettez à jour la sidebar et filtrez
        filterApps();
    });

    // Écoute les clics sur les liens de la sidebar
    sidebarThemeLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Empêche le rechargement de la page
            const themeSlug = this.dataset.theme; // Récupère le slug du thème du lien
            
            // Mettre à jour le sélecteur de thème pour le synchroniser
            themeFilterSelect.value = themeSlug;

            filterApps(); // Applique le filtrage
        });
    });

    // Appel initial pour s'assurer que les filtres et l'état actif sont appliqués au chargement de la page
    // Vérifie si un thème est déjà spécifié dans l'URL (ex: .../?theme=productivite)
    const urlParams = new URLSearchParams(window.location.search);
    const initialTheme = urlParams.get('theme') || 'all';
    themeFilterSelect.value = initialTheme; // Synchronise le sélecteur avec l'URL ou 'all'
    
    filterApps(); // Applique le filtre initial
});
