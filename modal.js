// modal.js

const modal = document.getElementById('itemModal');
const closeBtn = document.querySelector('.close-btn');
const modalDetails = document.getElementById('modalDetails');

// Função para abrir o modal e preencher com os dados do item
export const openModal = (item) => {
    modalDetails.innerHTML = ''; // Limpa o conteúdo anterior

    // Adiciona a imagem, se houver
    if (item.Imagem) {
        const img = document.createElement('img');
        img.src = item.Imagem;
        img.alt = item.Nome || 'Imagem do item';
        modalDetails.appendChild(img);
    }
    
    // Adiciona os detalhes do item
    for (const key in item) {
        if (key === 'Imagem') continue; // Ignora a imagem
        
        const p = document.createElement('p');
        p.innerHTML = `<strong>${key}:</strong> ${item[key]}`;
        modalDetails.appendChild(p);
    }

    modal.style.display = 'block';
};

// Função para fechar o modal
const closeModal = () => {
    modal.style.display = 'none';
};

// Adiciona os listeners para fechar o modal
closeBtn.addEventListener('click', closeModal);
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        closeModal();
    }
});