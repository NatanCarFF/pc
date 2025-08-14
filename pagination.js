// pagination.js

import { renderCards } from './cardRenderer.js';

const ITEMS_PER_PAGE = 20;
let currentPage = 0;
let allData = [];

export const setupPagination = (data, container, loadMoreBtn) => {
    allData = data;
    loadMoreBtn.addEventListener('click', () => loadMoreItems(container, loadMoreBtn));
    
    // Carrega a primeira página automaticamente
    loadMoreItems(container, loadMoreBtn);
};

const loadMoreItems = (container, loadMoreBtn) => {
    const startIndex = currentPage * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    
    // Pega a fatia de dados para a página atual
    const itemsToRender = allData.slice(startIndex, endIndex);
    
    renderCards(itemsToRender, container);
    
    currentPage++;

    // Esconde o botão se todos os itens já foram carregados
    if (endIndex >= allData.length) {
        loadMoreBtn.classList.add('hidden');
    }
};