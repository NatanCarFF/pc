export const setupThemeSelector = () => {
    const themeSelector = document.getElementById('themeSelector');
    const storedTheme = localStorage.getItem('theme') || 'light';
    
    document.body.className = storedTheme;
    themeSelector.value = storedTheme;

    themeSelector.addEventListener('change', (event) => {
        const selectedTheme = event.target.value;
        document.body.className = selectedTheme;
        localStorage.setItem('theme', selectedTheme);
    });
};