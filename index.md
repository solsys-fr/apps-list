---
layout: default
title: Bienvenue sur Open-Source Apps Liste de Solsys
---

# Bienvenue sur Open-Source Apps List !

<div class="search-filter-bar">
    <input type="text" id="searchInput" placeholder="Rechercher des applications..." aria-label="Rechercher des applications">
    <select id="themeFilter" aria-label="Filtrer par thème">
    <option value="all">Tous les thèmes</option>
    {% assign sorted_themes = site.applications | map: "theme" | uniq | sort %}
    {% for theme in sorted_themes %}
        <option value="{{ theme | slugify }}">{{ theme }}</option> {# UTILISE slugify ici #}
    {% endfor %}
</select>
</div>

Découvrez notre collection d'applications open-source triées sur le volet par la communauté. Chaque application est accompagnée de notre propre description et est classée par thème pour faciliter la navigation.

## Nos Applications

<div class="app-grid">
    {% assign sorted_apps = site.applications | sort: "title" %}
    {% for app in sorted_apps %}
        {% include app_card.html application=app %}
    {% endfor %}
</div>

## Contribuer

Nous encourageons les contributions ! N'hésitez pas à faire des pull requests pour ajouter de nouvelles applications, mettre à jour des descriptions ou suggérer de nouveaux thèmes.

---

## Dernières Mises à Jour

*Date de la dernière mise à jour des applications : <span id="last-updated-date">{{ site.time | date: "%Y-%m-%d" }}</span>*
