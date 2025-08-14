import { setupPagination } from './pagination.js';
import { renderCards } from './cardRenderer.js';

export const setupFilter = (data, cardContainer) => {
    const filterInput = document.getElementById('filterInput');

    filterInput.addEventListener('keyup', () => {
        const searchTerm = filterInput.value.toLowerCase();
        const filteredData = data.filter(item =>
            item["Nome"].toLowerCase().includes(searchTerm) ||
            item["Descrição"].toLowerCase().includes(searchTerm)
        );
        
        setupPagination(filteredData, cardContainer, renderCards);
    });
};