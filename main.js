// main.js

import { fetchData } from './dataFetcher.js';
import { setupFilter } from './filter.js';
import { setupPagination } from './pagination.js';

document.addEventListener('DOMContentLoaded', async () => {
    const containerCards = document.getElementById('containerCards');
    const searchBar = document.getElementById('searchBar');
    const loadMoreBtn = document.getElementById('loadMoreBtn');

    const data = await fetchData();
    if (data) {
        // Inicializa a paginação e a renderização dos cards
        setupPagination(data, containerCards, loadMoreBtn);
        
        // Configura o filtro
        setupFilter(searchBar, containerCards);
    }
});