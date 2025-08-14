// cardRenderer.js

export const renderCards = (data, container) => {
    container.innerHTML = ''; // Limpa o contêiner
    if (!data) return;

    data.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('card');
        
        // Adiciona a imagem, se houver um link na coluna 'Imagem'
        if (item.Imagem) {
            const img = document.createElement('img');
            img.src = item.Imagem;
            img.classList.add('card-image');
            img.alt = item.Nome || 'Imagem do item';
            card.appendChild(img);
        }
        
        // Adiciona os outros itens do card
        for (const key in item) {
            if (key === 'Imagem') continue; // Ignora a imagem para não duplicar
            
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