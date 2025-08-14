// main.js

import { fetchData } from './dataFetcher.js';
import { renderCards } from './cardRenderer.js';
import { setupFilter } from './filter.js';

document.addEventListener('DOMContentLoaded', async () => {
    const containerCards = document.getElementById('containerCards');
    const searchBar = document.getElementById('searchBar');

    // 1. Busca os dados da planilha
    const data = await fetchData();
    
    // 2. Renderiza os cards com base nos dados
    renderCards(data, containerCards);
    
    // 3. Configura o filtro após os cards serem criados
    setupFilter(searchBar, containerCards);
});