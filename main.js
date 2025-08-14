// main.js
import { fetchData } from './dataFetcher.js';
import { setupFilter } from './filter.js';
import { setupPagination } from './pagination.js';
import { setupThemes } from './themeSelector.js';

const spreadsheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQildvGeXWbsGz9HLXCp0--6xwpoULr4GLWK17s3PWrDYgtINtAolAaN4gYN0hy9G_OLUHXeL9j34bo/pub?output=csv';

document.addEventListener('DOMContentLoaded', async () => {
    const containerCards = document.getElementById('containerCards');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    
    const allData = await fetchData(spreadsheetUrl);

    if (allData) {
        // Inicializa a paginação com os dados completos
        setupPagination(allData, containerCards, loadMoreBtn);
        
        // Configura o filtro para atuar sobre os dados completos
        setupFilter(allData, containerCards, loadMoreBtn);

        // Configura o seletor de temas
        setupThemes();
    }
});