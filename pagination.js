let currentPage = 0;
const itemsPerPage = 20;

export const loadMoreItems = (data, container, loadMoreButton) => {
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const newItems = data.slice(startIndex, endIndex);

    renderCards(newItems, container, true);

    currentPage++;
    if (endIndex >= data.length) {
        loadMoreButton.style.display = 'none';
    } else {
        loadMoreButton.style.display = 'block';
    }
};

export const setupPagination = (data, container, renderCards) => {
    const loadMoreButton = document.getElementById('loadMoreButton');
    
    // Passa a função de renderização diretamente
    const renderNextPage = () => {
        const startIndex = currentPage * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const newItems = data.slice(startIndex, endIndex);

        const fragment = document.createDocumentFragment();
        newItems.forEach(item => {
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
        currentPage++;

        if ((currentPage * itemsPerPage) >= data.length) {
            loadMoreButton.style.display = 'none';
        } else {
            loadMoreButton.style.display = 'block';
        }
    };

    loadMoreButton.onclick = renderNextPage;
    
    // Renderiza a primeira página
    currentPage = 0;
    container.innerHTML = '';
    renderNextPage();
};