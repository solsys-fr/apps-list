document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const themeFilter = document.getElementById('themeFilter');
    const appCards = document.querySelectorAll('.app-grid .app-card'); // Sélectionne toutes les cartes d'applications

    function filterApps() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedTheme = themeFilter.value;

        appCards.forEach(card => {
            const title = card.querySelector('h2').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();
            const theme = card.querySelector('.app-theme').textContent.toLowerCase(); // Récupère le thème affiché

            const matchesSearch = title.includes(searchTerm) || description.includes(searchTerm);
            const matchesTheme = (selectedTheme === 'all' || theme.includes(selectedTheme)); // Utilise includes pour flexibilité

            if (matchesSearch && matchesTheme) {
                card.style.display = ''; // Affiche la carte
            } else {
                card.style.display = 'none'; // Cache la carte
            }
        });
    }

    // Écoute les événements de saisie et de changement
    searchInput.addEventListener('keyup', filterApps);
    themeFilter.addEventListener('change', filterApps);

    // Appel initial pour s'assurer que les filtres sont appliqués au chargement de la page
    filterApps();
});
