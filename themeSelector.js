// themeSelector.js

export const setupThemes = (selectorContainer) => {
    const body = document.body;
    const themeButtons = selectorContainer.querySelectorAll('button');

    const savedTheme = localStorage.getItem('theme') || 'tema-claro';
    body.classList.add(savedTheme);
    updateActiveButton(savedTheme, themeButtons);

    selectorContainer.addEventListener('click', (event) => {
        const target = event.target;
        if (target.tagName === 'BUTTON') {
            const newTheme = target.dataset.theme;
            
            body.classList.remove(...body.classList);
            body.classList.add(newTheme);
            
            localStorage.setItem('theme', newTheme);
            updateActiveButton(newTheme, themeButtons);
        }
    });
};

const updateActiveButton = (activeTheme, buttons) => {
    buttons.forEach(button => {
        button.classList.remove('active');
        if (button.dataset.theme === activeTheme) {
            button.classList.add('active');
        }
    });
};