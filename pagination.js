// pagination.js
import { renderCards } from './cardRenderer.js';
import { openModal } from './modal.js';

const ITEMS_PER_PAGE = 20;
let currentPage = 0;
let currentData = [];

const loadMoreItems = (container, loadMoreBtn) => {
    const startIndex = currentPage * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    
    const itemsToRender = currentData.slice(startIndex, endIndex);
    
    // Renderiza e anexa os novos cards
    const fragment = document.createDocumentFragment();
    itemsToRender.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.addEventListener('click', () => openModal(item));

        if (item.Imagem) {
            const img = document.createElement('img');
            img.src = item.Imagem;
            img.classList.add('card-image');
            img.alt = item.Nome || 'Imagem do item';
            card.appendChild(img);
        }
        
        const cardContent = document.createElement('div');
        cardContent.classList.add('card-content');
        cardContent.innerHTML = `
            <h3 class="card-title">${item["Nome"] || 'N/A'}</h3>
            <p class="card-description">${item["Descrição"] || 'Sem descrição'}</p>
        `;
        card.appendChild(cardContent);
        fragment.appendChild(card);
    });

    container.appendChild(fragment);
    
    currentPage++;

    if (endIndex >= currentData.length) {
        loadMoreBtn.classList.add('hidden');
    } else {
        loadMoreBtn.classList.remove('hidden');
    }
};

export const setupPagination = (data, container, loadMoreBtn) => {
    currentData = data;
    currentPage = 0;
    container.innerHTML = '';
    
    loadMoreBtn.onclick = () => loadMoreItems(container, loadMoreBtn);
    loadMoreItems(container, loadMoreBtn);
};