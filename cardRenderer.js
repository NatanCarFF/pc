import { setupModal } from './modal.js';

export const renderCards = (data, container) => {
    container.innerHTML = '';
    const fragment = document.createDocumentFragment();

    data.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <div class="card-content">
                <h3 class="card-title">${item["Nome"] || 'N/A'}</h3>
                <p class="card-description">${item["Descrição"] || 'Sem descrição'}</p>
            </div>
        `;
        card.addEventListener('click', () => {
            setupModal(item);
        });
        fragment.appendChild(card);
    });

    container.appendChild(fragment);
};