// cardRenderer.js

import { openModal } from './modal.js';

export const renderCards = (data, container) => {
    if (!data) return;

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
        
        for (const key in item) {
            if (key === 'Imagem') continue;
            
            const cardItem = document.createElement('div');
            cardItem.classList.add('card-item');

            const label = document.createElement('span');
            label.classList.add('card-label');
            label.textContent = `${key}: `;
            
            const value = document.createElement('span');
            value.classList.add('card-value');
            value.textContent = item[key];
            
            cardItem.appendChild(label);
            cardItem.appendChild(value);
            card.appendChild(cardItem);
        }
        
        container.appendChild(card);
    });
};