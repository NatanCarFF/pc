// modal.js
const modal = document.getElementById('itemModal');
const closeBtn = document.querySelector('.close-btn');
const modalDetails = document.getElementById('modalDetails');

// Keys a serem ignoradas na exibição dos detalhes
const ignoreKeys = ["Imagem"];

export const openModal = (item) => {
    modalDetails.innerHTML = '';
    
    // Adiciona a imagem, se houver
    if (item.Imagem) {
        const img = document.createElement('img');
        img.src = item.Imagem;
        img.alt = item.Nome || 'Imagem do item';
        modalDetails.appendChild(img);
    }
    
    // Adiciona os detalhes do item, ignorando as chaves indesejadas
    for (const key in item) {
        if (item.hasOwnProperty(key) && !ignoreKeys.includes(key)) {
            const p = document.createElement('p');
            p.innerHTML = `<strong>${key}:</strong> ${item[key]}`;
            modalDetails.appendChild(p);
        }
    }

    modal.style.display = 'flex'; // Use 'flex' para centralizar
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