const modal = document.getElementById('modal');
const modalBody = document.getElementById('modalBody');
const closeButton = document.querySelector('.close-button');

const ignoreKeys = ["Imagem"];

export const setupModal = (item) => {
    modalBody.innerHTML = '';
    
    for (const key in item) {
        if (item.hasOwnProperty(key) && !ignoreKeys.includes(key)) {
            const p = document.createElement('p');
            p.className = 'modal-body-item';
            p.innerHTML = `<h3>${key}:</h3> <p>${item[key] || 'N/A'}</p>`;
            modalBody.appendChild(p);
        }
    }
    
    modal.style.display = 'flex';
};

closeButton.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});