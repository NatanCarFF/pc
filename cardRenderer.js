// cardRenderer.js
import { openModal } from './modal.js';

export const renderCards = (data, container, append = false) => {
    if (!data) return;

    if (!append) {
        container.innerHTML = '';
    }

    const fragment = document.createDocumentFragment();

    data.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('card');
        
        // Adiciona um listener para abrir o modal ao clicar no card
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
};