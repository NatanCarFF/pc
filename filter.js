// filter.js
import { setupPagination } from './pagination.js';

export const setupFilter = (allData, cardContainer, loadMoreBtn) => {
    const searchBar = document.getElementById('searchBar');

    searchBar.addEventListener('keyup', () => {
        const searchTerm = searchBar.value.toLowerCase();
        
        const filteredData = allData.filter(item => {
            // Verifica se a chave "Nome" ou "Descrição" existe antes de chamar toLowerCase()
            const nome = item["Nome"] ? item["Nome"].toLowerCase() : '';
            const descricao = item["Descrição"] ? item["Descrição"].toLowerCase() : '';

            return nome.includes(searchTerm) || descricao.includes(searchTerm);
        });

        setupPagination(filteredData, cardContainer, loadMoreBtn);
    });
};