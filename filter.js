// filter.js

export const setupFilter = (searchBar, cardContainer) => {
    const cards = Array.from(cardContainer.children);

    const filterCards = () => {
        const searchTerm = searchBar.value.toLowerCase();
        cards.forEach(card => {
            const textContent = card.textContent.toLowerCase();
            if (textContent.includes(searchTerm)) {
                card.style.display = 'block'; // Ou outro display padrão
            } else {
                card.style.display = 'none';
            }
        });
    };

    searchBar.addEventListener('keyup', filterCards);
};