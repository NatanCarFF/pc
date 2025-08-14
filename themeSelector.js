// themeSelector.js
export const setupThemes = () => {
    const themeSelector = document.getElementById('themeSelector');
    const body = document.body;

    const savedTheme = localStorage.getItem('theme') || 'tema-claro';
    body.classList.add(savedTheme);
    themeSelector.value = savedTheme;

    themeSelector.addEventListener('change', (event) => {
        const newTheme = event.target.value;
        
        body.classList.remove(...body.classList);
        body.classList.add(newTheme);
        
        localStorage.setItem('theme', newTheme);
    });
};